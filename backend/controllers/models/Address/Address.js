const mongoose = require( "mongoose")

const schemaDefinition = new mongoose.Schema({

    name: {type:String},
    tel: {type:String},
    no: {type:String},
    village: {type:String},
    road: {type:String},
    district: {type:String},
    alley: {type:String},
    boundary: {type:String},
    province: {type:String},
    code: {type:String},
    


})
module.exports = {
    db : mongoose.model("dataAddress", schemaDefinition)
}
