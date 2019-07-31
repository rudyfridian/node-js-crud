var mongoose = require('mongoose'),
    User = mongoose.model('User');
var client = require('redis').createClient(process.env.REDIS_URL);

exports.list_all_users = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
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
    client.get(req.query.accountNumber,function (err,reply) {
        if(err) {
            res.send(err);
        }
        else if (reply){
            res.json(reply)
        }
        else {
            User.findOne({accountNumber: req.query.accountNumber}, function(err, user) {
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


