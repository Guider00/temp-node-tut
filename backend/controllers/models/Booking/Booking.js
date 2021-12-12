const mongoose = require("mongoose")

const schemaDefinition = new mongoose.Schema({

  Room: {type:String},
  booking_number:{type:String},
  customer_name :{type:String},
  customer_lastname :{type:String},
  customer_tel :{type:String},
  deposit :{type:String},
  checkin_type : {type:String}, 
  checkin_date : {type:Date},  // YYYY-MM-DDTHH:MM:SS
  checkin_date_exp : {type:Date},  // YYYY-MM-DDTHH:MM:SS
  note: {type:String},
  status: {type:String},
  img_receipt : {type:String}, // image
  receipt_number : {type:String}
})
module.exports = {
    db: mongoose.model("booking", schemaDefinition)
}