/* CAB432 Assignment 2

    Author: Simon Di Florio
    Date: 23/10/2022

    References:

    This file contains router code for downloading images from the S3 bucket
*/

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.status(200).send('respond with a resource');
});

module.exports = router;
