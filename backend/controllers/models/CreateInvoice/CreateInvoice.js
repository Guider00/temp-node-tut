const mongoose = require( "mongoose")

const schemaDefinition = new mongoose.Schema({
    bill_exp: {type:String},
    date_exp: {type:String},
    rent_price: {type:String},
    building: {type:String},
    floor: {type:String},
    room_type: {type:String},
    name_room: {type:String},
    type_rent: {type:String},
    round_bill: {type:String},
    


})
module.exports = {
    db : mongoose.model("dataCreateInvoice", schemaDefinition)
}
