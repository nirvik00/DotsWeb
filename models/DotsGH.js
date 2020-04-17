const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const DotsGHSchema= new Schema({
    UserName:{
        type: String,
        required:true
    },
    ModelName:{
        type: String,
        required:true
    },
    PolyArrInStr:{
        type: String,
        required:true
    }
});

mongoose.model("DotsGH", DotsGHSchema);
