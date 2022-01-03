const mongoose = require( "mongoose")

const schemaDefinition = new mongoose.Schema({
    Contractnumber: {type:String},
    RoomType: {type:String},
    RoomName: {type:String},
    RentType: {type:String},
    name: {type:String},
    surname: {type:String},
    Check_in: {type:String},
    status: {type:String},
    Check_out: {type:String},
    


})
module.exports = {
    db : mongoose.model("contract", schemaDefinition)
}
