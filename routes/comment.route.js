'use strict';

const express = require('express');
const router = express.Router();
const {
    likeUnlikeComment,
    sendComment,
    getCommentFrom,
    getCommentTo
} = require('../controllers/comment.controller')

router.use(express.json());
router.post('/user/comment/:act/:id', likeUnlikeComment);
router.post('/user/comment', sendComment);
router.get('/user/comment/to/:id', getCommentTo);
router.get('/user/comment/from/:id', getCommentFrom);

module.exports = router;

