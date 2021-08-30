const mongoose = require("mongoose")

const schemaDefinition = new mongoose.Schema({
 

    name:{type:String},
    address:{type:String},
    logocompany:{type:Buffer},
    road:{type:String},
    taxnumber:{type:String},
    postnumber:{type:String},
    tel:{type:String},
    email:{type:String}
})
module.exports = {
    db: mongoose.model("companyprofile", schemaDefinition)
}