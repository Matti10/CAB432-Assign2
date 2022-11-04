/* CAB432 Assignment 2

    Author: Simon Di Florio
    Date: 23/10/2022

    References:

    This file contains router code for the server index
*/

const express = require('express');
const router = express.Router();

const sharp_api = require('../api/sharp-api');

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

module.exports = router;
