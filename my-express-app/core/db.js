const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
exports.mongoDbConnect = () => {
  mongoose.Promise = global.Promise
  const connect = mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // userFindAndModify: false
  });
  return connect
}