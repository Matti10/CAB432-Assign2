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
} = require("@aws-sdk/client-s3");

const {
    getSignedUrl,
} = require("@aws-sdk/s3-request-presigner");

require('dotenv').config();

module.exports = {
    s3client,
    getObject,
};

const s3client = new S3Client({ region: process.env.AWS_REGION });

// create S3 bucket on module load
(async function initBucket() {
    const command = new CreateBucketCommand({
        Bucket: process.env.S3_BUCKET_NAME,
    });
    try {
        const data = await s3client.send(command);
        // console.log("Success", data.$metadata.requestId);
        console.log("S3: Bucket created");
        return data;
    } catch (exc) {
        // TODO add in existing bucket conditional
        console.log("S3 Error:", exc);
        throw exc;
    }
})();

// Get object from S3
async function getObject(key) {
    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
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

async function generatePresignedUrl(key, expiration) {
    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
    });
    return getSignedUrl(s3client, command, { expiresIn: expiration });
}