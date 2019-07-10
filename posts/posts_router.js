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

router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await Posts.findPostComments(req.params.id);

    if (comments) {
      res.status(200).json(comments);
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: 'The comments information could not be retrieved.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const post = await Posts.insert(req.body);

    if (req.body.title && req.body.contents) {
      res.status(201).json(post);
    } else {
      res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.'
      });
    }
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while saving the post to the database'
    });
  }
});

module.exports = router;
