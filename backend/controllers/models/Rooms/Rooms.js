const mongoose = require("mongoose")


const schemaDefinition = new mongoose.Schema({
    name: { type: String ,default: "" },
    floor: { type: String },
    status :{ type : String },
    meterid: {type :String },
    type: { type: String },
    checkout_date :{type: String , default: ""},
    checkin_date : {type:String, default: ""},
    member:{ type:String},
    members:{ type:[String] },
    meterroom:{ type:String},
    RoomType : {type:String},
    version:{ type: String ,default: "0.0.1"},
   

})
module.exports = {
    db: mongoose.model("room", schemaDefinition)
}
