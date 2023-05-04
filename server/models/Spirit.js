const { Schema, model } = require('mongoose');

const spiritSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  spiritType: {
    type: String,
    required: true,
  },
});

const Spirit = model('Spirit', spiritSchema);
module.exports = Spirit;
