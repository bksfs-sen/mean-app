const Users = require('../models/userModel');

exports.getUsers = async (req, res) => {
  try {
    var userRes = await Users.find();
    // console.log("userRes======", userRes);
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

exports.saveUser = (req, res) => {
  let postData = req.body
  if (postData._id) {
    Users.updateOne({
      _id: postData._id
    }, postData, (userErr, userRes) => {
      if (userErr) {
        return res.json({
          status: 500,
          message: 'There are some while updating user.',
          data: userErr
        })
      } else {
        return res.json({
          status: 200,
          message: 'User has been updated successfully.'
        })
      }
    })
  } else {
    let userInfo = new Users();
    Object.keys(postData).map((objKey) => {
      userInfo[objKey] = postData[objKey];
    })
    userInfo.save((err, res) => {
      if (err) {
        return res.json({
          status: 500,
          message: 'There are some while saving user.',
          data: err
        })
      } else {
        return res.json({
          status: 200,
          message: 'User has been added successfully.'
        })
      }
    })
  }
}