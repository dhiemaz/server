const dbHandler = require('../database/mongo.database')
const commentService = require('../services/comment.service')

const commentData = {
    from: "6557c05402b3eb42e6c67755",
    to: "6557c05402b3eb42e6c68855",
    title: "test comment",
    comment: "This is a test comment!",
    likes: 0
};

/**
 * connect to a new in-memory database before running any test cases
 */
beforeAll(async () => await dbHandler.connectDB());

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
     * tests that valid profile can be created through profile services with success
     */
    it('comment send', async () => {
        await commentService.insertComment(commentData).then(function (result) {
            commentSend = result;
        }).catch(function (err) {
            console.log(`catch err: ${err}`);
        }).finally(function () {
            expect(err).toBeNull();
            expect(commentSend.to).toBe('6557c05402b3eb42e6c68855');
        });
    })

    it('get comment by id', async () => {
        let err = null;
        let comment = null;

        await commentService.getCommentByCommentId(commentSend._id).then(function (result) {
            comment = result;
        }).catch(function (err) {
            console.log(`catch err: ${err}`);
        }).finally(function () {
            expect(err).toBeNull();
            expect(comment.comment).toBe('This is a test comment!');
        });
    })

    it('get comment from user', async () => {
        let err = null;
        let comment = null;

        await commentService.getCommentFromUserId(commentSend.from).then(function (result) {
            comment = result;
            console.log(`result: ${comment}`)
        }).catch(function (err) {
            console.log(`catch err: ${err}`);
        }).finally(function () {
            expect(err).toBeNull();
        });
    })

    it('like comment from user', async () => {
        let err = null;
        let comment = null;

        await commentService.likesComment(commentSend._id, 'Like').then(function (result) {
            comment = result;
            console.log(`result: ${result}`)
        }).catch(function (err) {
            console.log(`catch err: ${err}`);
        }).finally(function () {
            expect(err).toBeNull();
            expect(comment.likes).toBe(1);
        });
    })

    it('like comment from user again', async () => {
        let err = null;
        let comment = null;

        await commentService.likesComment(commentSend._id, 'Like').then(function (result) {
            comment = result;
            console.log(`result: ${result}`)
        }).catch(function (err) {
            console.log(`catch err: ${err}`);
        }).finally(function () {
            expect(err).toBeNull();
            expect(comment.likes).toBe(2);
        });
    })

    it('unlike comment from user', async () => {
        let err = null;
        let comment = null;

        await commentService.likesComment(commentSend._id, 'UnLike').then(function (result) {
            comment = result;
            console.log(`result: ${result}`)
        }).catch(function (err) {
            console.log(`catch err: ${err}`);
        }).finally(function () {
            expect(err).toBeNull();
            expect(comment.likes).toBe(1);
        });
    })

    it('unlike comment from user - failed cannot find comment', async () => {
        let err = null;
        let comment = null;

        await commentService.likesComment(commentSend.to, 'UnLike').then(function (result) {
            comment = result;
            console.log(`result: ${result}`)
        }).catch(function (err) {
            console.log(`catch err: ${err}`);
        }).finally(function () {
            expect(comment.toString()).toBe('Error: cannot find comment.');
        });
    })
});
