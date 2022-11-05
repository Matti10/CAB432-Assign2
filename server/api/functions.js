/* CAB432 Assignment 2

    Author: Simon Di Florio
    Date: 23/10/2022

    References:

    This file contains Generic helper functions
*/

const fs = require('fs');
const CryptoJS = require("crypto-js");

// Calculate Image checksum
function calculateMd5(buffer) {
    // var reader = new FileReader();
    // reader.readAsBinaryString(blob);
    // reader.onloadend = function () { };

    return CryptoJS.MD5(buffer).toString();
}

function constructKey(key, pm) {
    let persistKey = `${key};`;
    // chain transform operations to construct key
    if (pm.resize)
        persistKey += `resize:${pm.resize.width}-${pm.resize.height};`;
    if (pm.rotate)
        persistKey += `rotate:${pm.rotate};`;
    if (pm.flip)
        persistKey += `flip;`;
    if (pm.flop)
        persistKey += `flop;`;
    if (pm.sharpen)
        persistKey += `sharpen:${pm.sharpen};`;
    if (pm.median)
        persistKey += `median:${pm.median};`;
    if (pm.blur)
        persistKey += `blur:${pm.blur};`;
    if (pm.normalise)
        persistKey += `normalise;`;
    if (pm.threshold)
        persistKey += `threshold:${pm.threshold};`;
    if (pm.type)
        persistKey += `type:${pm.type}`;
    else
        persistKey += `type:.png`;

    return persistKey;
}

// Helper function to convert a ReadableStream to a string.
async function streamToString(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", (err) => reject(err));
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });
};

// Helper function to convert a ReadableStream to a string.
async function streamToBuffer(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", (err) => reject(err));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
    });
};


// Helper function to convert a ReadableStream to a string.
const streamToFile = (stream, downloadPath) => {
    const outputStream = fs.createWriteStream(downloadPath);
    stream.pipe(outputStream);
    outputStream.on('finish', () => {
        // console.log(`downloaded the file successfully`);
    });
};

module.exports = {
    calculateMd5,
    constructKey,
    streamToString,
    streamToBuffer,
    streamToFile
};