const mongoose = require( "mongoose")

const schemaDefinition = new mongoose.Schema({
  duedateinvoice: { type: String },
  
  monthlybilling : {type: String},
  printstatus : {type: String ,default:"รอการพิมพ์" },
  status : {type: String ,default:"รอชำระเงิน" },
  roomid: {type: String},
   lists: [
        {
        name:{type:String},
        number:{type:String},
        price:{type:String},
        vat:{type:Number , default: 7 },
        selectvat :{type:String},
        }
    ]
})
module.exports = {
    db : mongoose.model("invoice", schemaDefinition)
}
