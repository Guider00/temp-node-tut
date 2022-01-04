const mongoose = require( "mongoose")

const schemaDefinition = new mongoose.Schema({
  duedateinvoice: { type: String },
  
  monthlybilling : {type: String},
  printstatus : {type: String },
  status : {type: String },
  roomid: {type: String},
})
module.exports = {
    db : mongoose.model("invoice", schemaDefinition)
}
