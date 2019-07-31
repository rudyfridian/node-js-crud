var mongoose = require('mongoose'),
    User = mongoose.model('User');
var client = require('redis').createClient(process.env.REDIS_URL);
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.list_all_users = function(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        User.find({}, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    });
};


exports.create_a_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, user) {
        if (err){
            console.log(JSON.stringify(err));
            res.send(err);
        }
        res.json(user);
    });
};


exports.read_a_user_by_account_number = function(req, res) {
    client.get(req.params.accountNumber,function (err,reply) {
        if(err) {
            res.send(err);
        }
        else if (reply){
            res.json(reply)
        }
        else {
            User.findOne({accountNumber: req.params.accountNumber}, function(err, user) {
                if (err)
                    res.send(err);
                res.json(user);
            });
        }

    })

};


exports.update_a_user_by_account_number = function(req, res) {
    User.findOneAndUpdate({accountNumber: req.params.accountNumber}, req.body, {new: true}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.delete_a_user_by_account_number = function(req, res) {

    User.findOneAndDelete({
        accountNumber: req.params.accountNumber
    }, function(err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    });
};

exports.read_a_user_by_identity_number = function(req, res) {
    User.findOne({identityNumber: req.params.identityNumber}, function(err, user) {
        console.log(req.params.identityNumber);
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.update_a_user_by_identity_number = function(req, res) {
    User.findOneAndUpdate({identityNumber: req.params.identityNumber}, req.body, {new: true}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

exports.delete_a_user_by_identity_number = function(req, res) {

    User.deleteOne({
        identityNumber: req.params.identityNumber
    }, function(err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'User successfully deleted' });
    });
};


