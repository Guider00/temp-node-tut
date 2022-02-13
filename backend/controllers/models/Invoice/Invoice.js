const mongoose = require( "mongoose")

const schemaDefinition = new mongoose.Schema({
  docnumber:{type:String,default:"000001"},
  duedateinvoice: { type: Date ,default:Date.now() },
  monthlybilling : {type: Date ,default:Date.now() }, // YYYY-MM-DDTHH:MM:SS
  printstatus : {type: String ,default:"รอการพิมพ์" },
  status : {type: String ,default:"รอชำระเงิน" },
  roomid: {type: String},
   lists: [
        {
        name:{type:String},
        price:{type:String,default:0},
        number_item:{type:String,default:1},
        vat:{type:Number , default: 7 },
        type_price:{type:String , default:'ราคาไม่รวมvat'}, // <<  2 type    1.) ราคารวมvat 2.) ราคาไม่รวมvat
        selectvat :{type:String,default:'คิดvat'},   
        }
    ],
    customer:{
        name: { type: String , default: ""},
        lastname:{type: String ,  default: ""},
        personalid :{type: String ,  default: ""},
        taxnumber:{type: String ,  default: ""},
        address :{type: String ,  default: ""},
        tel: {type:String ,  default: ""},
        email: {type:String ,  default: ""}, 
    }
})
module.exports = {
    db : mongoose.model("invoice", schemaDefinition)
}
