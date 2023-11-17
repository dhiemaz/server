
const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const pino = require('pino');
const logger = pino({level: 'info'});

let mongod = null;

const connectDB = async () => {
    try {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();

        const mongooseOpts = {
            useUnifiedTopology: true,
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000,
        };

        await mongoose.connect(uri, mongooseOpts);
        logger.info('successfully connect to mongodb.')
    } catch (err) {
        logger.error('failed connect to mongodb, error: ', err)
    }

};

const disconnectDB = async () => {
    try {
        if (mongod) {
            await mongoose.connection.close();
            await mongod.stop();
        }
        logger.info('successfully disconnect mongodb.')
    } catch (err) {
        logger.error('failed disconnect mongodb, error: ', err)
    }

};

const clearDB = async () => {
    try {
        if (mongod) {
            const collections = mongoose.connection.collections;
            for (const key in collections) {
                const collection = collections[key];
                await collection.deleteMany();
            }
        }
        logger.info('successfully clear data.')
    } catch (err) {
        logger.error('failed clear data, error: ', err)
    }
};

module.exports = {connectDB, disconnectDB, clearDB}