const mongoose = require("mongoose")

const schemaDefinition = new mongoose.Schema({

    monthlybilling:{type:Date},  // YYYY-MM-DDTHH:MM:SS
    status:{type:String},
    note:{type:String},
    lists: [
        {
        name:{type:String},
        number:{type:String},
        price:{type:String},
        vat:{type:Number ,  default: 7},
        selectvat :{type:String},
        }
    ]
})
module.exports = {
    db: mongoose.model("receipt", schemaDefinition)
}