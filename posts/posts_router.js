const express = require('express');

const Posts = require('./posts_model');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find();

    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'The posts information could not be retrieved.' });
  }
});

module.exports = router;
