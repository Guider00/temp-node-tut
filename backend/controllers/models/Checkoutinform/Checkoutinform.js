const mongoose = require("mongoose")

const schemaDefinition = new mongoose.Schema({
    room: {type:String},
    building: {type:String},
    floor: {type:String},
    roomtype: {type:String},
    status: {type:String},
    name: {type:String},
    surname: {type:String},
    checkout: {type:String},
    
})
module.exports = {
    db: mongoose.model("checkoutinform", schemaDefinition)
}