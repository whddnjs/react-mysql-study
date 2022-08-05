const mysql = require('mysql');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'blog',
  port: 3306,
});

function queryBuilder(_query, params) {
  return new Promise((resolve, reject) => {
    db.query(_query, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

module.exports = queryBuilder;
