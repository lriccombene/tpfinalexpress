const mongoose = require("../bin/mongodb");

const categoriesSchema = new mongoose.Schema({
    name: {
        type:String,
        index: true,
        minlength:1,
        maxlength: 255,
        required:true,
        trim:true
    },

});

module.exports = mongoose.model("categories", categoriesSchema)