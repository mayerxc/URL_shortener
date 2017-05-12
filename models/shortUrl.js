//Template/structure/model of document
//require mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    originalUrl: string,
    shortUrl: string
}, {timestamps:true});

const = ModelClass = mongoose.model('shortUrl', urlSchema);

module.exports = ModelClass;
