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
const REDIS_EXPIRATION = 300;

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

async function getKey(redisKey) {
    const result = await redisClient.get(redisKey);
    return result;
}

async function storeKey(redisKey, s3key) {
    redisClient.setEx(redisKey, REDIS_EXPIRATION, s3key);
}

module.exports = {
    redisClient,
    initClient,
    getKey,
    storeKey,
};