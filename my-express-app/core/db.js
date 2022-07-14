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