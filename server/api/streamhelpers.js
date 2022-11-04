/* CAB432 Assignment 2

    Author: Simon Di Florio
    Date: 23/10/2022

    References:
    https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html 
    https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-examples.html

    This file contains API code for AWS S3
*/

const fs = require('fs');


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
    streamToString,
    streamToBuffer,
    streamToFile
};