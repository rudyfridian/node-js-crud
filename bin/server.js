var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    User = require('../models/users'), //created model loading here
    bodyParser = require('body-parser');
    var indexRouter = require('../routes/index');
    var path = require('path');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/rudyfridian',{ useNewUrlParser: true });
mongoose.connect('mongodb+srv://rudyfridian:rudyfridian@cluster0-djlih.mongodb.net/rudyfridian?retryWrites=true&w=majority',{ useNewUrlParser: true });


app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use('/', indexRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('../routes/users'); //importing route
routes(app); //register the route


app.listen(port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});


console.log('todo list RESTful API server started on: ' + port);
