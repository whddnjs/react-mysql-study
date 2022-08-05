const express = require('express');
const app = express();
const cors = require('cors');
const postRouter = require('./src/router/post');
require('dotenv').config();
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/posts', postRouter);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT} on`);
});
