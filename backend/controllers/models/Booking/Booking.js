const mongoose = require("mongoose")

const schemaDefinition = new mongoose.Schema({

  Room: {type:String},
  booking_number:{type:String},
  customer_name :{type:String},
  customer_lastname :{type:String},
  customer_tel :{type:String},
  customer_address :{type:String , default:""}, // ที่อยู่ ผู้จอง
  taxnumber:{type:String,default:""}, // หมายเลขประจำตัวผู้เสียภาษี
  payment_method :{type:String}, // วิธีการชำระเงิน 
  deposit :{type:String},  // จำนวนเงินจอง
  checkin_type : {type:String}, 
  checkin_date : {type:Date   },  // YYYY-MM-DDTHH:MM:SS
  checkin_date_exp : {type:Date },  // YYYY-MM-DDTHH:MM:SS
  note: {type:String},
  status: {type:String , default :"รอการชำระเงิน"},
  confirm_booking : {type:String , default:"รอการยืนยัน"}, // << ยืนยันการเข้าพัก
  img_receipt : {type:String}, // image
  receipt_number : {type:String}
})
module.exports = {
    db: mongoose.model("booking", schemaDefinition)
}