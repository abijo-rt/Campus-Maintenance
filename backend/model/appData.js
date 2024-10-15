const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,  // Ensure the type is `String`
        required: true
    }
  
});

const LocationData = mongoose.model('LocationData', locationSchema);

module.exports = LocationData;
