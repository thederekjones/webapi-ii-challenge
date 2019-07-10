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

router.get('/:id', async (req, res) => {
  try {
    const postsById = await Posts.findById(req.params.id);

    if (postsById) {
      res.status(200).json(postsById);
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: 'The post information could not be retrieved.' });
  }
});

module.exports = router;
