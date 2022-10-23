/* CAB432 Assignment 2

    Author: Simon Di Florio
    Date: 23/10/2022

    References:


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

module.exports = {
    redisClient,
    initClient
};