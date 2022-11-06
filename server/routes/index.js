/* CAB432 Assignment 2

    Author: Simon Di Florio
    Date: 23/10/2022

    References:

    This file contains router code for the server index
*/

const express = require('express');
const router = express.Router();

const sharp_api = require('../api/sharp-api');
const redis_api = require('../api/redis-api');
const s3_api = require('../api/s3-api');
const fn = require('../api/functions');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'CAB432 Express App' });
    // res.status(200).send('CAB432 Server Index');
});

router.post('/transform', async function (req, res) {

    // Verify that the request body contains an image checksum and transform params
    if (!req.body.key)
        return res.status(400).json({
            code: "NoKey",
            message: "No key provided with request"
        });
    if (!req.body.params)
        return res.status(400).json({
            code: "NoTransform",
            message: "No transform parameters provided with request"
        });

    // 1. Construct a transform key from the image checksum and transform params
    const tfKey = fn.constructKey(req.body.key, req.body.params);

    // 2. Check Redis for cached transform URL
    const redisURL = await redis_api.getKey(tfKey);
    if (redisURL) {
        console.log("TF-Redis: TF found in Redis");

        // Return cached transform URL
        try {
            return res.status(200).json({
                source: "redis",
                url: redisURL,
                key: tfKey
            });
        } catch (exc) {
            return res.status(500).json({
                code: "RedisError",
                message: "Error getting Redis-supplied key URL from S3"
            });
        }
    }
    // 3. Check S3 for transform
    try {
        const head = await s3_api.headObject(tfKey);

        // If in S3, get URL
        console.log("TF-S3: TF found in S3");
        const url = await s3_api.getDownloadUrl(tfKey);

        // Save transform to Redis and return URL
        redis_api.storeKey(tfKey, url);

        return res.status(200).json({
            source: "s3",
            url: url,
            key: tfKey
        });
    }
    catch (exc) {
        if (exc.$response.statusCode === 404) {
            console.log("TF-S3: TF not found in S3");
        }
        else {
            return res.status(500).json({
                code: "S3Error",
                message: "Error getting S3-supplied key from S3"
            });
        }
    }
    // 4. Get input image from S3, return error if key doesn't exist
    try {
        var imageStream = await s3_api.getObjectStream(req.body.key);
    }
    catch (exc) {
        return res.status(404).json({
            code: exc.Code,
            message: exc.message
        });
    }
    // 5. Transform and output image
    let tf = await sharp_api.readImage(imageStream);
    tf = await sharp_api.transformImage(tf, req.body.params);
    let buffer = await sharp_api.outputImage(tf, req.body.params);

    // 6. Upload transformed image to S3, return S3 URL and store in Redis
    try {
        await s3_api.putObject(tfKey, buffer);
        const url = await s3_api.getDownloadUrl(tfKey);
        redis_api.storeKey(tfKey, url);

        res.status(200).json({
            source: "server",
            url: url,
            key: tfKey
        });
    }
    catch (exc) {
        return res.status(500).json({
            code: "S3Error",
            message: "Error uploading transformed image to S3"
        });
    }
});

module.exports = router;
