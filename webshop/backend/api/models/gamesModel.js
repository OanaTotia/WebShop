'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the name of the product'
  },
  description: {
    type: String,
    Required: 'Kindly enter the description of the product'
  },
  urlImage: {
    type: String,
    Required: 'Kindly enter the url of the image'
  },
  unitPrice: {
    type: Number,
    Required: 'Kindly enter the unit price'
  },
  stock: {
    type: Number,
    Required: 'Kindly enter the stock number for this product'
  },
  averageRating: {
    type: Number,
    Required: 'Kindly enter the average rating'
  }
});

module.exports = mongoose.model('Games', TaskSchema);