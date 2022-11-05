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

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'CAB432 Express App' });
    res.status(200).send('CAB432 Server Index');
});

router.get('/readImage', function (req, res) {

    sharp_api.readImage()
        .then(result => {


            res.status(200).send(result);
        });
});

router.post('/transform', async function (req, res) {

    // Verify that the request body contains an image checksum key
    if (!req.body.key)
        return res.status(400).json({
            code: "NoKey",
            message: "No key provided with request"
        });
    // TODO check if request has transform params
    if (!req.body.params)
        return res.status(400).json({
            code: "NoTransform",
            message: "No transform parameters provided with request"
        });
    // Check Redis for cached transform
    const redisKey = redis_api.constructKey(req.body.key, req.body.params);
    const redisResult = redis_api.getTransform(redisKey);
    if (redisResult) {
        console.log("Transform found in Redis");
    }

    try {
        const transformer = await sharp_api.readImage(req.body.key);
    }
    catch (exc) {
        return res.status(404).json({
            code: exc.Code,
            message: exc.message
        });
    }
    result = await sharp_api.transformImage(transformer, req.body.params);



    res.status(200).send("in transform");
});

module.exports = router;
