const dbHandler = require('../database/mongo.database');
const commentService = require('../services/comment.service');
const userService = require('../services/user.service');
const {inspect} = require('util')

/**
 * connect to a new in-memory database before running any test cases
 */
beforeAll(async () =>{
    await dbHandler.connectDB();
});

/**
 * remove and close db and server
 */
afterAll(async () => {
    //await dbHandler.clearDB();
    await dbHandler.disconnectDB();
});

describe('comment test suite - positive case', () => {
    let firstUserId = null;
    let secondUserId = null;
    let result = null;
    let err = null;

    let comment = {
        from: null,
        to: null,
        mbti: null,
        enneagram: "6w5",
        zodiac: "Aquarius",
        title: "test comment",
        comment: "This is a test comment!",
        likes: 0
    };

    /**
     * tests that valid profile can be created through profile services with success
     */
    it('comment send success', async () => {
        const firstUser = {
            name: "luke"
        };

        const secondUser = {
            name: "evan"
        };

        // create user
        firstUserId = await userService.insertUser(firstUser);
        secondUserId = await userService.insertUser(secondUser);

        comment.to = firstUserId._id;
        comment.from = secondUserId._id;

        await commentService.insertComment(comment).then(data => {
            result = data;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBeNull();
        });
    });

    it('can get comment by id', async () => {
        let err = null;

        await commentService.getByCommentId(result._id).then(data => {
            result = data;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBeNull();
            expect(result.comment).toBe('This is a test comment!');
        });
    })

    it('can get comment from', async () => {
        let err = null;
        let res = {};

        //console.log(`from: ${result.from}`);
        try {
           res = await commentService.getCommentFrom(result.from);
        }catch (e) {
            err = e;
        }

        expect(err).toBeNull();
        expect(res.length).toBe(1);
    })

    it('can like comment', async () => {
        let err = null;
        let comment = null;

        await commentService.likesComment(result._id, 'like').then(data => {
            result = data;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBeNull();
            expect(result.likes).toBe(1);
        });
    })

    it('can like comment and increase like counter', async () => {
        let err = null;
        let comment = null;

        await commentService.likesComment(result._id, 'like').then(data => {
            result = data;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBeNull();
            expect(result.likes).toBe(2);
        });
    })

    it('unlike comment and decrease like counter', async () => {
        let err = null;
        let comment = null;

        await commentService.likesComment(result._id, 'unlike').then(data => {
            result = data;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBeNull();
            expect(result.likes).toBe(1);
        });
    })

    it('can get comment to', async () => {
        let err = null;
        let page = 1;
        let limit = 5;

        const filter = {
            mbti: false,
            enneagram: false,
            zodiac: false
        }

        await commentService.getCommentTo(result.to, 'recent', filter, page, limit).then(data => {
            result = data;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBeNull();
            expect(result.total_count).toBe(1);
        });
    })
});

describe('comment test suite - negative case', () => {
    let result = null;
    let err = null;

    it('comment send failed, user (to) not found', async () => {
        let comment = {
            from: '6571edbfd6e8bd609a6a5018',
            to: '6571edbfd6e8bd609a6a501c',
            mbti: null,
            enneagram: "6w5",
            zodiac: "Aquarius",
            title: "test comment",
            comment: "This is a test comment!",
            likes: 0
        };

        const firstUser = {
            name: "luke"
        };

        // create user
        let firstUserId = await userService.insertUser(firstUser);
        comment.from = firstUserId._id;

        await commentService.insertComment(comment).then(data => {
            result = data;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBe('user 6571edbfd6e8bd609a6a501c is not found.')
        });
    });

    it('comment send failed, user (from) not found', async () => {
        let comment = {
            from: '6571edbfd6e8bd609a6a5018',
            to: '6571edbfd6e8bd609a6a501c',
            mbti: null,
            enneagram: "6w5",
            zodiac: "Aquarius",
            title: "test comment",
            comment: "This is a test comment!",
            likes: 0
        };

        const firstUser = {
            name: "luke"
        };

        // create user
        let firstUserId = await userService.insertUser(firstUser);
        comment.to = firstUserId._id;

        await commentService.insertComment(comment).then(data => {
            result = data;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBe('user 6571edbfd6e8bd609a6a5018 is not found.')
        });
    });

    it('comment send failed, mandatory field is empty', async () => {
        let comment = {
            from: '6571edbfd6e8bd609a6a5018',
            to: '6571edbfd6e8bd609a6a501c',
            mbti: null,
            enneagram: "6w5",
            zodiac: "Aquarius",
            title: "test comment",
            comment: null,
            likes: 0
        };

        const firstUser = {
            name: "luke"
        };

        const secondUser = {
            name: "evan"
        };

        // create user
        const firstId = await userService.insertUser(firstUser);
        const secondId = await userService.insertUser(secondUser);

        comment.to = firstId._id;
        comment.from = secondId._id;

        await commentService.insertComment(comment).then(data => {
            result = data;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err.toString()).toBe('ValidationError: comment: Path `comment` is required.')
        });
    });

    it('cannot get comment by id because comment not found', async () => {
        let err = null;

        await commentService.getByCommentId('656e195847b9ce124eb5cfc6').then(data => {
            result = data;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBeNull();
            expect(result).toBe(null);
        });
    })

    it('cannot like comment because comment not found', async () => {
        let err = null;
        let comment = null;

        await commentService.likesComment('656e195847b9ce124eb5cfc6', 'like').then(data => {
            result = data;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err.toString()).toBe('comment not found');
        });
    })

    it('cannot like comment and increase like counter because comment not found', async () => {
        let err = null;
        let comment = null;

        await commentService.likesComment('656e195847b9ce124eb5cfc6', 'like').then(data => {
            result = data;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err.toString()).toBe('comment not found');
        });
    })

    it('cannot unlike comment and decrease like counter because comment not found', async () => {
        let err = null;
        let comment = null;

        await commentService.likesComment('656e195847b9ce124eb5cfc6', 'unlike').then(data => {
            result = data;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err.toString()).toBe('comment not found');
        });
    })

    it('cannot get comment to because comment not found', async () => {
        let err = null;
        let page = 1;
        let limit = 5;

        const filter = {
            mbti: false,
            enneagram: false,
            zodiac: false
        }

        await commentService.getCommentTo('656e195847b9ce124eb5cfc6', 'recent', filter, page, limit).then(data => {
            result = data;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBeNull();
            expect(result.total_count).toBe(0);
        });
    })


    it('unlike comment - failed cannot find comment', async () => {
        let err = null;
        let comment = null;

        await commentService.likesComment('656e195847b9ce124eb5cfc6', 'unlike').then(function (result) {
            comment = result;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err.toString()).toBe('comment not found');
        });
    })

    it('unlike comment from user - failed cannot find comment', async () => {
        let err = null;
        let comment = null;

        await commentService.likesComment(result.to, 'unlike').then(function (result) {
            comment = result;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err.toString()).toBe('comment not found');
        });
    })
});
