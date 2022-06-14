const Users = require('../models/userModel');
const UserSkill = require('../models/skillModel')
const async = require('async');

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
    async.waterfall([
      // insert way single data 
      (cb) => {
        console.log("postData=======", postData);
        Users.insertMany([postData, postData, postData, postData], (userErr, useResp) => {
          console.log("userErr===000=====", userErr);
          console.log("useResp========", useResp);
          if (userErr) {
            cb(null, useResp)
          } else {
            cb(null, useResp)
          }
        })
      },

      // insert way single data 
      (cb) => {
        console.log("postData=======", postData);
        Users.create(postData, (userErr, useResp) => {
          console.log("userErr===1111=====", userErr);
          console.log("useResp========", useResp);
          if (userErr) {
            cb(null, useResp)
          } else {
            cb(null, useResp)
          }
        })
      },
      // insert way single data 
      (updateCb, cb) => {
        console.log("postData=======", postData);
        let userInfo = new Users(postData);
        userInfo.save((userErr, useResp) => {
          console.log("userErr====222====", userErr);
          console.log("useResp========", useResp);
          if (userErr) {
            cb(null, useResp)
          } else {
            cb(null, useResp)
          }
        })
      },
      // insert way single data 
      (updateCb, cb) => {
        let userInfo = new Users();
        Object.keys(postData).map((objKey) => {
          userInfo[objKey] = postData[objKey];
        })
        userInfo.save((err, useResp) => {
          if (err) {
            cb(null, useResp)
          } else {
            async.forEachSeries(postData.skills, (obj, skillCb) => {
              let userSkill = new UserSkill();
              userSkill.name = obj.name;
              userSkill.userId = useResp._id;
              userSkill.save((skillError, SkillResp) => {
                skillCb()
              })
            }, (skillErr, skillRes) => {
              cb(null, true)
            })
          }
        })
      },
      // insert way single data but here will use code mongo core query and  mongooes does not have option insert function.
      /*  (updateCb, cb) => {
         Users.insert(postData, (userErr, useResp) => {
           console.log("userErr===333=====", userErr);
           console.log("useResp=====333===", useResp);
           if (userErr) {
             cb(null, useResp)
           } else {
             cb(null, useResp)
           }
         })
       },
       (updateCb, cb) => {
         Users.insertOne(postData, (userErr, useResp) => {
           console.log("userErr===333=====", userErr);
           console.log("useResp=====333===", useResp);
           if (userErr) {
             cb(null, useResp)
           } else {
             cb(null, useResp)
           }
         })
       }, */
    ], (finalErr, finalRes) => {
      return res.json({
        status: 200,
        message: 'User has been added successfully.'
      })
    })
  }
}