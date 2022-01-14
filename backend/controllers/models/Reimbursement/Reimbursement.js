const mongoose = require("mongoose")

const schemaDefinition = new mongoose.Schema({

  
    cashback_date:{type:String},
    status:{type:String , default:"ยังไม่คืน"},
    cashback:{type:String , default: "0"},
    invoiceid:{type:String},
    contractid:{type:String}
})
module.exports = {
    db: mongoose.model("reimbursement", schemaDefinition)
}