'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
    /*_id: {
        type: Schema.Types.ObjectId,
    },*/
    userName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: Number,
        required: true
    },
    emailAddress: {
        type: String,
    },
    identityNumber: {
        type: Number,
        required: true
    },
},{collection : 'rudyfridian'});

module.exports = mongoose.model('User', User);