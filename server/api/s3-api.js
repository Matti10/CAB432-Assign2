/* CAB432 Assignment 2

    Author: Simon Di Florio
    Date: 23/10/2022

    References:
    https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html 
    https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-examples.html

    This file contains API code for AWS S3
*/

const {
    S3Client,
    CreateBucketCommand,
    PutObjectCommand,
    GetObjectCommand,
    ListObjectsCommand,
} = require("@aws-sdk/client-s3");

const {
    getSignedUrl,
} = require("@aws-sdk/s3-request-presigner");

require('dotenv').config();

const fs = require('fs');


const s3client = new S3Client({ region: process.env.AWS_REGION });
const EXPIRATION = 300;

// Helper function to convert a ReadableStream to a string.
const streamToString = (stream) =>
    new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });

// create S3 bucket on module load
async function initBucket() {
    const command = new CreateBucketCommand({
        Bucket: process.env.S3_BUCKET_NAME,
    });
    try {
        console.log("S3: Creating bucket...");
        const data = await s3client.send(command);
        console.log("S3: Bucket created");
        return data;
    } catch (exc) {
        // if bucket already exists, ignore error
        if (exc.Code === "BucketAlreadyOwnedByYou") {
            console.log("S3: Bucket already owned by server");
        }
        else if (exc.Code === "BucketAlreadyExists") {
            console.log("S3: Bucket already exists");
        }
        // otherwise, throw error and stop server
        else {
            console.log("S3 Error:", exc);
            throw exc;
        }
    }
}

// Get object directly from S3
async function listObjects() {
    const command = new ListObjectsCommand({
        Bucket: process.env.S3_BUCKET_NAME,
    });
    try {
        const data = await s3client.send(command);
        return data;
    }
    catch (exc) {
        console.log("S3 Error:", exc);
        throw exc;
    }
}

// Get object directly from S3
async function getObject(key) {
    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
    });
    try {
        const data = await s3client.send(command);

        // return data.body;

        // const inputStream = data.Body;
        // const downloadPath = 'example.png';
        // const outputStream = fs.createWriteStream(downloadPath);
        // inputStream.pipe(outputStream);
        // outputStream.on('finish', () => {
        //     console.log(`downloaded the file successfully`);
        // });

        let body = await streamToString(data.Body);
        return body;
    }
    catch (exc) {
        console.log("S3 Error:", exc);
        throw exc;
    }
}

// Put object directly in S3
async function putObject(key) {
    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
    });
    try {
        const signedUrl = await s3client.send(command);
        return signedUrl;
    }
    catch (exc) {
        console.log("S3 Error:", exc);
        throw exc;
    }
}

// Create signed url for downloading key from S3
async function getDownloadUrl(key) {
    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
    });
    try {
        const signedUrl = await getSignedUrl(s3client, command, { expiresIn: EXPIRATION });
        return signedUrl;
    }
    catch (exc) {
        console.log("S3 Error:", exc);
        throw exc;
    };
}

// Create signed url for uploading key to S3
async function getUploadUrl(key) {
    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
    });
    try {
        const signedUrl = await getSignedUrl(s3client, command, { expiresIn: EXPIRATION });
        return signedUrl;
    }
    catch (exc) {
        console.log("S3 Error:", exc);
        throw exc;
    };
}

module.exports = {
    s3client,
    initBucket,

    listObjects,
    getObject,
    putObject,

    getDownloadUrl,
    getUploadUrl
};