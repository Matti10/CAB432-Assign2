/* CAB432 Assignment 2

    Author: Simon Di Florio
    Date: 23/10/2022

    References:

    This file contains router code for downloading images from the S3 bucket
*/

const express = require('express');
const router = express.Router();

const s3 = require('../api/s3-api');


router.get('/', function (req, res, next) {
    res.status(200).send('respond with a resource');
});

// Get signed URL for downloading file from S3
router.get('/signedUrl/:checksum', function (req, res) {
    const checksum = req.params.checksum;

    s3.getDownloadUrl(checksum)
        .then(url => {
            res.status(200).send(url);
        })
        .catch(exc => {
            console.log("Download Error:", exc);
            res.status(500).send('Error getting signed URL');
        });

});

// DEBUG route that gets server to download and send object to client
// use /signedURl/:checksum in production
router.get('/object/:checksum', function (req, res) {
    const checksum = req.params.checksum;

    // res.type(`image/${format || 'png'}`); // set content-type - modify to match file type


    s3.getObject(checksum)
        .then(object => {
            res.status(200).json(object);
        })
        .catch(exc => {
            console.log("Download Error:", exc);
            res.status(500).send('Error getting object');
        });
});

// DEBUG route that gets list of all objects in S3 bucket
router.get('/list', function (req, res) {

    s3.listObjects()
        .then(objects => {
            res.status(200).send(objects);
        })
        .catch(exc => {
            console.log("Download Error:", exc);
            res.status(500).send('Error getting object list');
        });
});

module.exports = router;
