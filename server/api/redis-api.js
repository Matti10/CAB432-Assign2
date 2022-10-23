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
(async function connectClient() {
    try {
        await redisClient.connect();
    } catch (exc) {
        console.log(exc);
        throw exc;
    }
})();

module.exports = {
    redisClient,
};