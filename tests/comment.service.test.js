const dbHandler = require('../database/mongo.database');
const commentService = require('../services/comment.service');
const userService = require('../services/user.service');

const commentData = {
    from: "evan",
    to: "luke",
    mbti: null,
    enneagram: "6w5",
    zodiac: "Aquarius",
    title: "test comment",
    comment: "This is a test comment!",
    likes: 0
};

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

describe('comment test suite', () => {
    let commentSend = null;
    let err = null;
    /**
     * tests that valid profile can be created through profile services with failed (no user exist)
     */
    // it('comment send with failed', async () => {
    //     await commentService.insertComment(commentData).then(function (result) {
    //     }).catch(function (e) {
    //         err = e;
    //     }).finally(function () {
    //         expect(err).toBe(`user ${commentData.to} not found.`);
    //     });
    // });


    /**
     * tests that valid profile can be created through profile services with success
     */
    it('comment send success', async () => {
        const firstUser = {
            name: "luke"
        }

        const secondUser = {
            name: "evan"
        }

        await userService.insertUser(firstUser);
        await userService.insertUser(secondUser);

        await commentService.insertComment(commentData).then(data => {
            commentSend = data;
        }).catch(function (e) {
            err = e;
            console.log(`catch err: ${e}`);
        }).finally(function () {
            expect(err).toBeNull();
        });
    });

    // it('get comment by id', async () => {
    //     let err = null;
    //     let comment = null;
    //
    //     await commentService.getCommentByCommentId(commentSend._id).then(function (result) {
    //         comment = result;
    //     }).catch(function (err) {
    //         console.log(`catch err: ${err}`);
    //     }).finally(function () {
    //         expect(err).toBeNull();
    //         expect(comment.comment).toBe('This is a test comment!');
    //     });
    // })

    it('get comment from user', async () => {
        let err = null;
        let comment = null;

        await commentService.getCommentFromUser(commentData.from).then(function (result) {
            comment = result;
            console.log(`result: ${comment}`)
        }).catch(function (err) {
            console.log(`catch err: ${err}`);
        }).finally(function () {
            expect(err).toBeNull();
        });
    })

    // it('like comment from user', async () => {
    //     let err = null;
    //     let comment = null;
    //
    //     await commentService.likesComment(commentSend._id, 'Like').then(function (result) {
    //         comment = result;
    //         console.log(`result: ${result}`)
    //     }).catch(function (err) {
    //         console.log(`catch err: ${err}`);
    //     }).finally(function () {
    //         expect(err).toBeNull();
    //         expect(comment.likes).toBe(1);
    //     });
    // })
    //
    // it('like comment from user again', async () => {
    //     let err = null;
    //     let comment = null;
    //
    //     await commentService.likesComment(commentSend._id, 'Like').then(function (result) {
    //         comment = result;
    //         console.log(`result: ${result}`)
    //     }).catch(function (err) {
    //         console.log(`catch err: ${err}`);
    //     }).finally(function () {
    //         expect(err).toBeNull();
    //         expect(comment.likes).toBe(2);
    //     });
    // })
    //
    // it('unlike comment from user', async () => {
    //     let err = null;
    //     let comment = null;
    //
    //     await commentService.likesComment(commentSend._id, 'UnLike').then(function (result) {
    //         comment = result;
    //         console.log(`result: ${result}`)
    //     }).catch(function (err) {
    //         console.log(`catch err: ${err}`);
    //     }).finally(function () {
    //         expect(err).toBeNull();
    //         expect(comment.likes).toBe(1);
    //     });
    // })
    //
    // it('unlike comment from user - failed cannot find comment', async () => {
    //     let err = null;
    //     let comment = null;
    //
    //     await commentService.likesComment(commentSend.to, 'UnLike').then(function (result) {
    //         comment = result;
    //         console.log(`result: ${result}`)
    //     }).catch(function (err) {
    //         console.log(`catch err: ${err}`);
    //     }).finally(function () {
    //         expect(err.toString()).toBe('Error: cannot find comment.');
    //     });
    // })
});
