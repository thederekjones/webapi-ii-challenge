const express = require('express');

const server = express();
const port = 5000;

server.get('/', (req, res) => {
  res.send('<h2>Welcome to Express Router!</h2>');
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
