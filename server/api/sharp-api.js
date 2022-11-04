/* CAB432 Assignment 2

    Author: Simon Di Florio
    Date: 23/10/2022

    References:
    https://sharp.pixelplumbing.com/

    This file contains API code for SharpJS
*/

const sharp = require('sharp');
const s3 = require('./s3-api');
const { streamToBuffer } = require('./streamhelpers');


async function readImage(objectStream) {
    stream = await s3.getObjectStream('Pigeon_Square');
    buffer = await streamToBuffer(stream);

    const transform = sharp();

    await image.toFile('fileOutput.png');
    return image;
}


module.exports = {
    readImage
};