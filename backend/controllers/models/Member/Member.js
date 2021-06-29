const mongoose = require("mongoose")

const schemaDefinition = new mongoose.Schema({
    name: { type: String },
    lastname:{type: String},
    personalid :{type: String},
    tel: {type:String}
})
module.exports = {
    db: mongoose.model("member", schemaDefinition)
}