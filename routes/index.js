var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rudy Fridian' });
});

router.get('/token', function(req, res) {
    var token = jwt.sign({ id: "rudyfridian" }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
});

module.exports = router;
