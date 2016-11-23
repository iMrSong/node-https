/**
 * Created by Song on 2016/11/21.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    User = new Schema({
        name: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now()
        }
    });

module.exports = mongoose.model('User', User);