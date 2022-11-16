const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
exports.mongoDbConnect = () => {
  mongoose.Promise = global.Promise
  const connect = mongoose.connect('mongodb+srv://aleyka:XM1gueD9pphpEikk@cluster0.t66iaok.mongodb.net/shoppingMart', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true,
    // userFindAndModify: false
  });
  return connect
}


// HERE IS START CONNECTION FOR Mslq DATABASE
/* const Knex = require('knex');
const Mslq = () => {
  const config = {
    user: 'root',
    password: 'oc-production!@#',
    database: 'oc_cron_jobs',
    charset: 'utf8mb4',
  };

  if (
    process.env.INSTANCE_LIVE_CONNECTION_NAME &&
    process.env.NODE_ENV === 'production'
  ) {
    config.socketPath = `/cloudsql/${process.env.INSTANCE_LIVE_CONNECTION_NAME}`;
  } else {
    config.host = '34.89.137.121'
  }

  // Connect to the database
  const knex = Knex({
    client: 'mysql',
    connection: config,
  });
  // [END gae_flex_mysql_connect]

  return knex;
};


const ocMsql = Mslq();
// HERE IS END CONNECTION FOR ocMsql DATABASE

module.exports = {
  ocMsql: ocMsql
}; */



// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host:'localhost',
//   user:'root',
//   password:'Bharat@123',
//   database:'transworld'
// })
// connection.connect(function(err){
//   if(err)
//     console.log('Error in connection---',err)
//   else
//     console.log('Connection done....')
// })
// module.exports = connection;