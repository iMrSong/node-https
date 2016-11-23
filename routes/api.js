/**
 * Created by Song on 2016/11/21.
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

// GET Request
router.route('/getUsers').get(function(req, res, next) {
    User.find(function(err, docs){
        if(err) {
            res.send({status:"0", type:"GET", uri:"/getUsers", message:err})
        } else {
            User.count({}, function(err, cnt){
                
                if (cnt > 0) {
                    console.log(docs);
                    res.send({status:"1", type:"GET", uri:"/getUsers", count:cnt, results:docs})
                } else {
                    res.send({status:"0", type:"GET", uri:"/getUsers", message:"no records"});
                }
            });
        }
    });
});

router.route('/login/:name/:password').get(function(req, res, next) {
    var username = req.params.name;
    var password = req.params.password;
    User.count({name:username, password: password}, function(err, cnt){
        if (cnt > 0) {
            User.findOne({name:username}, function(err, doc){
                if(err) {
                    res.send({status:"0", type:"GET", uri:"/login", message:err})
                } else {
                    if (doc != null){
                        res.send({status:"1", type:"GET", uri:"/login", result:doc})
                    }
                }
            });
        } else {
            res.send({status:"0", type:"GET", uri:"/login", message:"no records"})
        }
    });
});


//get请求添加数据
router.route('/addUser/:name/:password/:email/:address').get(function(req, res, next) {
    var username = req.params.name;
    var password = req.params.password;
    var email = req.params.email;
    var address = req.params.address;

    User.count({name:username, password: password}, function(err, cnt){
        if (cnt == 0) {
            var user = new User({name: username, password: password, email: email, address:address});
            user.save(function(err) {
              if (err) {
                res.send({status:"0", type:"GET", uri:"/addUser", message:"insert failed!"});
              } else {
                res.send({status:"1", type:"GET", uri:"/addUser", message:"1 record inserted."});
              }
            });
        } else {
            res.send({status:"0", type:"GET", uri:"/addUser", message:"record existed"})
        }
    });
    


    // var item = {name: username, password: password, email: email, address:address};
    // User.update({name: username}, item, {upsert: true}, function(err) {
    //     if (err) {
    //         res.send({status:"0", type:"GET", uri:"/addUser", message:"insert failed!"});
    //     } else {
    //         res.send({status:"1", type:"GET", uri:"/addUser", message:"1 record inserted."});
    //     }
    // });
});







// POST Request
router.route('/getUsers').post(function(req, res, next) {
    User.find(function(err, docs){
        if(err) {
            res.send({status:"0", type:"POST", uri:"/getUsers", message:err})
        } else {
            setTimeout(function () {
                User.count({}, function(err, cnt){
                    if (cnt > 0) {
                        res.send({status:"1", type:"POST", uri:"/getUsers", count:cnt, results:docs})
                    } else {
                        res.send({status:"0", type:"POST", uri:"/getUsers", message:"no records"});
                    }
                });
            }, 2000);
        }
    });
});

router.route('/login').post(function(req, res, next) {
    var username = req.body.name;
    var password = req.body.password;
    User.count({name:username, password: password}, function(err, cnt){
        if (cnt > 0) {
            setTimeout(function () {
                User.findOne({name:username}, function(err, doc){
                    if(err) {
                        res.send({status:"0", type:"POST", uri:"/login", message:err})
                    } else {
                        if (doc != null){
                            res.send({status:"1", type:"POST", uri:"/login", result:doc})
                        }
                    }
                });
            }, 2000);
        } else {
            res.send({status:"0", type:"POST", uri:"/login", message:"no records"})
        }
    });
});

module.exports = router;