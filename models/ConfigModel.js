const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const ConfigSchema= new Schema({
    UserName:{
        type: String,
        required:true
    },
    PolyArrInStr:{
        type: String,
        required:true
    }
});

mongoose.model('ConfigModel', ConfigSchema);
