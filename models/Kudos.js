const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const kudosSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    message: {
        type:String,
        required:true
    },
    _toId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    _fromId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    } 
});
const Kudos = mongoose.model("Kudos", kudosSchema);
module.exports = Kudos;