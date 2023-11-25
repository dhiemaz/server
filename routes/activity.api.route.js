'use strict';

const express = require('express');
const router = express.Router();
const {
    sendLikes,
    sendComment,
    getCommentFrom,
    getCommentTo
} = require('../controllers/activity.controller')

router.use(express.json());
router.post('/user/activity/:act/:id', sendLikes);
router.post('/user/activity/comment', sendComment);
router.get('/user/activity/comment/to/:id', getCommentTo);
router.get('/user/activity/comment/from/:id', getCommentFrom);

module.exports = router;

