const dbHandler = require('../database/mongo.database')
const commentService = require('../services/comment.service')

const commentData = {
    from: "6557c05402b3eb42e6c67755",
    to: "6557c05402b3eb42e6c68855",
    title: "test comment",
    comment: "This is a test comment!",
};

/**
 * connect to a new in-memory database before running any test cases
 */
beforeAll(async () => await dbHandler.connectDB());

/**
 * remove and close db and server
 */
afterAll(async () => {
    await dbHandler.clearDB();
    await dbHandler.disconnectDB();
});

describe('comment test suite', () => {
    let commentSend = null;
    let err = null;
    /**
     * tests that valid profile can be created through profile services with success
     */
    it('comment send successfully', async () => {
        await commentService.insertComment(commentData).then(function (result) {
            commentSend = result;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBeNull();
            expect(commentSend.to).toBe('6557c05402b3eb42e6c68855');
        });
    })

    it('get comment by id successfully', async () => {
        let err = null;
        let comment = null;

        await commentService.getCommentByCommentId(commentSend._id).then(function (result) {
            comment = result;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBeNull();
            expect(comment.comment).toBe('This is a test comment!');
        });
    })

    it('get comment send by user successfully', async () => {
        let err = null;
        let comment = null;

        await commentService.getCommentFromUserId(commentData.from).then(function (result) {
            comment = result;
        }).catch(function (e) {
            err = e;
        }).finally(function () {
            expect(err).toBeNull();
            expect(comment.comment).toBe('This is a test comment!');
        });
    })
});
