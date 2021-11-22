const mongoose = require("mongoose")

const schemaDefinition = new mongoose.Schema({
    name: { type: String , default: ""},
    lastname:{type: String ,  default: ""},
    personalid :{type: String ,  default: ""},
    tel: {type:String ,  default: ""},
    email: {type:String ,  default: ""},
    carid: {type:String, default: ""},
    note: {type:String, default: ""}
})
module.exports = {
    db: mongoose.model("member", schemaDefinition)
}