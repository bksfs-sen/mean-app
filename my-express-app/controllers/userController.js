const Users = require('../models/userModel');

exports.getUsers = async (req, res) => {
  try {
    var userRes = await Users.find();
    console.log("userRes======", userRes);
    if (userRes && userRes.length) {
      return res.json({
        status: 200,
        message: 'Users fetched Successfully.',
        data: userRes
      });
    } else {
      return res.json({
        status: 500,
        message: 'No Users Found!',
        data: []
      });
    }
  } catch (error) {
    return res.json({
      status: 500,
      message: 'There are some error while getting users.',
      data: error
    })
  }
}