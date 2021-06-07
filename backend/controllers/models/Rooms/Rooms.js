const mongoose = require("mongoose")


const schemaDefinition = new mongoose.Schema({
    name: { type: String },
    floor: { type: String },
    status :{ type : String },
    meterid: {type :String },
    type: { type: String },
    version:{ type: String },
   

})
module.exports = {
    dbroom: mongoose.model("room", schemaDefinition)
}