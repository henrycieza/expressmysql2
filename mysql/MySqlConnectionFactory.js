import mysql from 'mysql';

const mySqlConnectionFactory = configuration => new Promise((resolve, reject) => {
  try {
    const mySqlConnection = mysql.createConnection({...{
      host: 'localhost',
      port: 13306,
      user: 'fastcheckin',
      password : 'fastcheckin',
      database: 'fastcheckin'
    }, ...configuration });

    mySqlConnection.connect(function(err) {
      err ? reject(err) : resolve(mySqlConnection);
    });
  } catch (error) {
    reject(error);
  }
});

export default mySqlConnectionFactory;