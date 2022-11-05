/* CAB432 Assignment 2

    Author: Simon Di Florio
    Date: 23/10/2022

    References:
    https://www.npmjs.com/package/redis

    This file contains API code for Redis
*/

const redis = require('redis');
require('dotenv').config();

// Redis setup
const redisClient = redis.createClient();
async function initClient() {
    try {
        console.log("Redis: Connecting to client...");
        await redisClient.connect();
        console.log("Redis: Connected");
    } catch (exc) {
        console.log("Redis Error:", exc);
        throw exc;
    }
}

function constructKey(key, params) {
    let redisKey = `${key};`;
    // chain transform operations to construct key
    if (params.resize && params.resize.width && params.resize.height)
        redisKey += `resize:${params.resize.width}-${params.resize.height};`;
    if (params.type)
        redisKey += `type:${params.type}`;

    return redisKey;
}

async function getTransform(redisKey) {
    const result = await redisClient.get(redisKey);
    return result;
}

async function storeTransform(redisKey, transformKey) {
    redisClient.setEx(redisKey, 3600, transformKey);
}

module.exports = {
    redisClient,
    initClient,
    constructKey,
    getTransform,
    storeTransform,
};