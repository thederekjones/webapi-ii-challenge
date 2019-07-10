const express = require('express');

const PostsRouter = require('./posts/posts_router');

const server = express();

server.use(express.json());
server.use('/api/posts', PostsRouter);

server.get('/', (req, res) => {
  res.send('<h2>Welcome to Express Router!</h2>');
});

module.exports = server;
