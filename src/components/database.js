// SQL starters here
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'database-1.cmkrry719kkl.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'XQJYs10aUBLqQm5R2Skq',
  database: 'TRINIWA'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = connection;

