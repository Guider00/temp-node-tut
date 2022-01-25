const mongoose = require( "mongoose")

const schemaDefinition = new mongoose.Schema({
  duedateinvoice: { type: String },
  
  monthlybilling : {type: Date ,default:Date.now() }, // YYYY-MM-DDTHH:MM:SS
  printstatus : {type: String ,default:"รอการพิมพ์" },
  status : {type: String ,default:"รอชำระเงิน" },
  roomid: {type: String},
   lists: [
        {
        name:{type:String},
        number:{type:String},
        price:{type:String},
        vat:{type:Number , default: 7 },
        type_price:{type:String , default:'ราคาไม่รวมvat'}, // <<  2 type    1.) ราคารวมvat 2.) ราคาไม่รวมvat
        selectvat :{type:String},   
        }
    ]
})
module.exports = {
    db : mongoose.model("invoice", schemaDefinition)
}
