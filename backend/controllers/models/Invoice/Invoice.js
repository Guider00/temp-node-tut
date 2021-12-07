const mongoose = require( "mongoose")

const schemaDefinition = new mongoose.Schema({
  duedateinvoice: { type: String },


})
module.exports = {
    db : mongoose.model("invoice", schemaDefinition)
}
