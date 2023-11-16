const supertest = require('supertest');
const {app, server} = require('../app');
const request = supertest(app);

const {connectDB, disconnectDB} = require('../database/mongo.database');

describe('API test', () => {
    beforeAll(() => {
        connectDB();
    });

    afterAll(() => {
        disconnectDB();
        server.close();
    });

    describe('POST /profile', () => {
        it('example request using mocked database instance', async () => {
            const res = await request.post('/profile', {
                name: 'Test'
            });

            expect(res.status.toBe(201))
        });
    });
});


