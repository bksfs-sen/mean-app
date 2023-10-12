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
      // we can insert many document in same query.
      (cb) => {
        // console.log("postData=======", postData);
        Users.insertMany([postData, postData, postData, postData], (userErr, useResp) => {
          // console.log("userErr===000=====", userErr);
          // console.log("useResp========", useResp);
          if (userErr) {
            cb(null, useResp)
          } else {
            cb(null, useResp)
          }
        })
      },

      // insert way single data 
      (updateCb, cb) => {
        // console.log("postData=======", postData);
        Users.create(postData, (userErr, useResp) => {
          // console.log("userErr===1111=====", userErr);
          // console.log("useResp========", useResp);
          if (userErr) {
            cb(null, useResp)
          } else {
            cb(null, useResp)
          }
        })
      },
      // insert way single data 
      (updateCb, cb) => {
        // console.log("postData=======", postData);
        let userInfo = new Users(postData);
        userInfo.save((userErr, useResp) => {
          // console.log("userErr====222====", userErr);
          // console.log("useResp========", useResp);
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
              cb(null, useResp)
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
      console.log("finalErr========", finalErr);
      console.log("finalRes========", finalRes);
      return res.json({
        status: 200,
        message: 'User has been added successfully.'
      })
    })
  }
}



/* 
var dbConnection = require('../core/db');
var ClientsDb;
exports.saveApis = (req, cb) => {
  ClientsDb = req.session.current_user && req.session.current_user.database == 'awsDb' ? awsDb.ocClients : dbConnection.ocClients;
  var postData = req.body;
  if (postData.id) {
    delete postData.created_date;
    postData.updated_date = new Date();
    ClientsDb('oc_apis').where({
        id: postData.id
      })
      .update(postData)
      .then((result) => {
        if (postData) {
          cb(null, postData)
        } else {
          cb(true, null);
        }
      }).catch((err) => {
        cb(err, null);
      });
  } else {
    ClientsDb('oc_apis').insert(postData)
      .then((result) => {
        if (result.length) {
          postData.id = result[0];
          // HERE WE ARE GENERATING TOKEN
          postData.token = MD5(postData.id);
          var updateData = {
            body: {
              id: postData.id,
              token: postData.token
            },
            session: {
              current_user: req.session.current_user
            }
          }
          exports.saveApis(updateData, (newerr, resp) => {
            if (newerr) {
              cb(true, null);
            } else {
              cb(null, postData);
            }
          });
        } else {
          cb(true, null);
        }
      }).catch((err) => {
        cb(err, null);
      });
  }
} */


// Promise

let myPromise = new Promise( async (myResolve, myReject) => {
// "Producing Code" (May take some time)   
    var userRes = await Users.find();   
    // console.log("userRes======", userRes);
    if(userRes.length){
      myResolve(userRes); // when successful
    } else {
      myReject(userRes);  // when error
    }
});

// "Consuming Code" (Must wait for a fulfilled Promise)
myPromise.then(
   (value) => { 
    // console.log("value=========", value);    /* code if successful */ 
  },
  (error) => { 
    //  console.log("error=========", error);    /* code if some error */ 
    }
);
