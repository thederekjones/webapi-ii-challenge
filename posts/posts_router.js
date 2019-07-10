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

    if (postsById.length) {
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

    if (comments.length) {
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

router.post('/:id/comments', async (req, res) => {
  const newMessage = { ...req.body, post_id: req.params.id };

  try {
    const comment = await Posts.insertComment(newMessage);

    if (comment) {
      if (newMessage.text) {
        res.status(201).json(comment);
      } else {
        res
          .status(400)
          .json({ errorMessage: 'Please provide text for the comment.' });
      }
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while saving the comment to the database'
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await Posts.update(req.params.id, req.body);

    if (updatedPost) {
      if (req.body.title && req.body.contents) {
        res.status(200).json(updatedPost);
      } else {
        res.status(400).json({
          errorMessage: 'Please provide title and contents for the post.'
        });
      }
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: 'The post information could not be modified.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletePost = await Posts.remove(req.params.id);

    if (deletePost) {
      res.status(200).json(deletePost);
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' });
    }
  } catch (err) {
    res.status(500).json({ error: 'The post could not be removed' });
  }
});

module.exports = router;
