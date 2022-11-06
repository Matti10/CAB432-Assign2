/* CAB432 Assignment 2

    Author: Simon Di Florio
    Date: 23/10/2022

    References:
    https://sharp.pixelplumbing.com/

    This file contains API code for SharpJS
*/

const sharp = require('sharp');
const { streamToBuffer } = require('./functions');

async function readImage(stream) {

    buffer = await streamToBuffer(stream);
    const transformer = sharp(buffer);

    return transformer;
}

async function transformImage(tf, pm) {
    if (pm.resize)
        tf = await tf.resize(pm.resize.width, pm.resize.height);
    if (pm.rotate)
        tf = await tf.rotate(pm.rotate);
    if (pm.flip)
        tf = await tf.flip();
    if (pm.flop)
        tf = await tf.flop();
    if (pm.sharpen)
        tf = await tf.sharpen(pm.sharpen);
    if (pm.median)
        tf = await tf.median(pm.median);
    if (pm.blur)
        tf = await tf.blur(pm.blur);
    if (pm.normalise)
        tf = await tf.normalise();
    if (pm.threshold)
        tf = await tf.threshold(pm.threshold);

    return tf;
}

async function outputImage(tf, pm) {
    if (pm.type) {
        if (pm.type == ".png")
            tf = await tf.png();
        else if (pm.type == ".jpeg")
            tf = await tf.jpeg();
        else if (pm.type == ".webp")
            tf = await tf.webp();
    }
    else
        tf = await tf.png();

    return await tf.toBuffer();
}

module.exports = {
    readImage,
    transformImage,
    outputImage
};