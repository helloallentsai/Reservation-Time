const { Pool } = require('pg');

const pool = new Pool({
  // user: 'dbuser',
  host: 'localhost',
  database: 'opentable',
  // password: 'secretpassword',
  port: 5432,
});

(async () => {
  try {
    const client = await pool.connect();
    console.log('Postgres connected');
  }
  catch(err) {
    console.log(err);
  }
  // client.release()
})();

module.exports = pool;