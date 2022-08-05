const { Router } = require('express');
const router = Router();
const queryBuilder = require('../config/database');

router.get('/', async (req, res) => {
  const sqlQuery =
    "SELECT POST_ID, POST_TITLE, POST_CONTENT, POST_WRITER, DATE_FORMAT(POST_DATE, '%Y-%m-%d') AS POST_DATE FROM POST";

  const result = await queryBuilder(sqlQuery);
  return res.send(result);
});

router.post('/', async (req, res) => {
  const { title, content, writer } = req.body;

  const sqlQuery =
    'INSERT INTO POST (POST_TITLE, POST_CONTENT, POST_WRITER) VALUES (?, ?, ?)';

  const result = await queryBuilder(sqlQuery, [title, content, writer]);
  res.send(result);
});

router.put('/:id', async (req, res) => {
  const { title, content, writer } = req.body;
  const id = req.params.id;

  const sqlQuery =
    'UPDATE POST SET POST_TITLE = ?, POST_CONTENT = ?, POST_WRITER = ? WHERE POST_ID = ?';

  const result = await queryBuilder(sqlQuery, [title, content, writer, id]);
  res.send(result);
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const sqlQuery = 'DELETE FROM POST WHERE POST_ID = ?';
  const result = await queryBuilder(sqlQuery, [id]);
  res.send(result);
});

module.exports = router;
