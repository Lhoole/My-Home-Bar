const { Schema, model } = require('mongoose');
const Spirit = require('./Spirit');

const cocktailSchema = new Schema({
  cocktail: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  description: {
    type: String,

  },
  recipe: {
    type: String,
    required: true,
    trim: true,
  },
  ingredients: [String
  ],  
  imgLink: {
    type: String
  },
});

const Cocktails = model('Cocktails', cocktailSchema);

module.exports = Cocktails;
