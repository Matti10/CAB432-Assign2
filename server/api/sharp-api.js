/* CAB432 Assignment 2

    Author: Simon Di Florio
    Date: 23/10/2022

    References:
    https://sharp.pixelplumbing.com/

    This file contains API code for SharpJS
*/

const CryptoJS = require("crypto-js");
const sharp = require('sharp');
const s3 = require('./s3-api');
const { streamToBuffer } = require('./streamhelpers');

// Calculate Image checksum
function calculateMd5(blob) {
    var reader = new FileReader();
    reader.readAsBinaryString(blob);
    reader.onloadend = function () { };

    return CryptoJS.MD5(reader.result).toString();
}

async function readImage(key) {
    try {
        stream = await s3.getObjectStream(key);
    }
    catch (exc) {
        throw exc;
    }
    buffer = await streamToBuffer(stream);
    const transformer = sharp(buffer);

    return transformer;
}

async function transformImage(transformer, params) {
    if (params.resize) {
        transformer.resize(params.resize.width, params.resize.height);
    }
    else
        console.log("no resize");

    return transformer;
}


module.exports = {
    calculateMd5,
    readImage,
    transformImage
};