const mongoose = require('mongoose');

const food_items = new mongoose.Schema({
    CategoryName: {
        type: String,
    },
    description:{
        type:String,
    },
    img:{
        type:String,
    },
    name:{
        type:String,
    },
    options:{
        type:Array,
    },

});
module.exports = mongoose.model('food_items',food_items);