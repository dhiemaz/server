const dbHandler = require('../database/mongo.database')
const commentService = require('../services/comment.service')

const commentData = {
    from: "6557c05402b3eb42e6c67755",
    to: "6557c05402b3eb42e6c68855",
    title: "test comment",
    comment: "This is a test comment!",
}

/**
 * connect to a new in-memory database before running any test cases
 */
beforeAll(async () => await dbHandler.connectDB());

/**
 * remove and close db and server
 */
afterAll(async () => {
    await dbHandler.clearDB();
    await dbHandler.disconnectDB()
});

describe('comment test suite', () => {
    let commentSend = null;
    /**
     * tests that valid profile can be created through profile services with success
     */
    it('comment send successfully', async () => {
        commentSend = await commentService.insertComment(commentData);
        expect(commentSend.to).toBe(commentData.to)
    })
});
