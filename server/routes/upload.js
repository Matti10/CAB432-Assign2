/* CAB432 Assignment 2

    Author: Simon Di Florio
    Date: 23/10/2022

    References:

    This file contains router code for uploading images to the S3 bucket
*/

const express = require('express');
const router = express.Router();

const s3 = require('../api/s3-api');

router.get('/', function (req, res, next) {
    res.status(200).send('respond with a resource');
});

// Get signed URL for uploading file to S3
router.get('/signedUrl/:checksum', function (req, res) {
    const checksum = req.params.checksum;

    try {
        s3.getUploadUrl(checksum)
            .then(url => {
                res.status(200).send(url);
            });
    }
    catch (exc) {
        console.log("Upload:", exc);
        res.status(500).send('Error getting signed URL');
    }
});

module.exports = router;
