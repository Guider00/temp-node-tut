const mongoose = require("mongoose")

const schemaDefinition = new mongoose.Schema({

    monthlybilling:{type:Date,default:Date.now()},  // YYYY-MM-DDTHH:MM:SS
    printstatus:{type:String,default:"รอการพิมพ์"},
    status:{type:String,default:"รอดำเนินการ"},
    note:{type:String},
    lists: [
        {
        name:{type:String},
        number:{type:String},
        price:{type:String},
        vat:{type:Number ,  default: 7},
        type_price:{type:String , default:'ราคาไม่รวมvat'}, // <<  2 type    1.) ราคารวมvat 2.) ราคาไม่รวมvat
        selectvat :{type:String},
        }
    ],
    invoiceid:{type:String}
})
module.exports = {
    db: mongoose.model("receipt", schemaDefinition)
}