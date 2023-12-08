const app = require("../app")
const dbHandler = require('../database/mongo.database');
const request = require("supertest")


let firstUserId = null;
let secondUserId = null;

/**
 * connect to a new in-memory database before running any test cases
 */
beforeAll(async () => {
    await dbHandler.connectDB();
});

/**
 * remove and close db and server
 */
afterAll(async () => {
    await dbHandler.clearDB();
    await dbHandler.disconnectDB();
});

describe('comment test suite - positive case', () => {
    let commentId = null;

    it('create user (first user)', async () => {
        const firstUser = {
            name: "A Martinez",
        };

        // force to create user (1st)
        return request(app)
            .post("/user")
            .send(firstUser)
            .expect(201)
            .then(({ body })=>{
                firstUserId = body.data._id;
            })
    })

    it('create user (second user)', async () => {
        const secondUser = {
            name: "Alex",
        };

        // force to create user (1st)
        return request(app)
            .post("/user")
            .send(secondUser)
            .expect(201)
            .then(({ body })=>{
                secondUserId = body.data._id;
            });
    })

    it('send comment - positive flow', async () => {
        let comment = {
            from: firstUserId,
            to: secondUserId,
            mbti: null,
            enneagram: "6w5",
            zodiac: "Aquarius",
            title: "test comment",
            comment: "This is a test comment!",
            likes: 0
        };

        return request(app)
            .post("/user/comment")
            .send(comment)
            .expect(function(res) {
                console.log(JSON.stringify(res.body, null, 2));
                commentId = res.body.data._id;
            })
            .expect(200);
    })

    it('like comment process - positive flow', async () => {
        return request(app)
            .post(`/user/comment/like/${commentId}`)
            .expect(function(res) {
                console.log(JSON.stringify(res.body, null, 2));
                commentId = res.body.data._id;
            })
            .expect(200);
    })

    it('unlike comment process - positive flow', async () => {
        return request(app)
            .post(`/user/comment/unlike/${commentId}`)
            .expect(function(res) {
                console.log(JSON.stringify(res.body, null, 2));
                commentId = res.body.data._id;
            })
            .expect(200);
    })
});

describe('comment test suite - negative case', () => {

    it('send comment, failed user not found - negative flow', async () => {
        let comment = {
            from: '6573587d6816459757c75370',
            to: '6573587d6816459757c75370',
            mbti: null,
            enneagram: "6w5",
            zodiac: "Aquarius",
            title: "test comment",
            comment: "This is a test comment!",
            likes: 0
        };

        return request(app)
            .post("/user/comment")
            .send(comment)
            .expect(function(res) {
                console.log(JSON.stringify(res.body, null, 2));
            })
            .expect(422);
    })

    it('like comment process, failed comment not found - negative flow', async () => {
        return request(app)
            .post(`/user/comment/like/656e195847b9ce124eb5cfc6`)
            .expect(function(res) {
                console.log(JSON.stringify(res.body, null, 2));
            })
            .expect(422);
    })

    it('like comment process, failed unknown action - negative flow', async () => {
        return request(app)
            .post(`/user/comment/halo/656e195847b9ce124eb5cfc6`)
            .expect(function(res) {
                console.log(JSON.stringify(res.body, null, 2));
            })
            .expect(422);
    })

});