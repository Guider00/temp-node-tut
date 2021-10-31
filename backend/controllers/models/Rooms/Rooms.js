const mongoose = require("mongoose")


const schemaDefinition = new mongoose.Schema({
    name: { type: String },
    floor: { type: String },
    status :{ type : String },
    meterid: {type :String },
    type: { type: String },
    member:{ type:String},
    meterroom:{ type:String},
    RoomType : {type:String},
    version:{ type: String },
   

})
module.exports = {
    db: mongoose.model("room", schemaDefinition)
}
