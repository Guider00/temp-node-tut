const mongoose = require( "mongoose")

const schemaDefinition = new mongoose.Schema({
    receipt_number: {type:String},
    invoice_number: {type:String},
    reimbursement_number: {type:String},
    booking_number: {type:String},
    bill_number: {type:String},
    account_number: {type:String},
    bill_date: {type:String},
    bill_end: {type:String},
    


})
module.exports = {
    db : mongoose.model("Receiptnumber", schemaDefinition)
}
