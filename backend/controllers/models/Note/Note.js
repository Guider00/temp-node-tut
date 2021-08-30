const mongoose = require("mongoose")

const schemaDefinition = new mongoose.Schema({
    record_date:{type:Date},  // YYYY-MM-DDTHH:MM:SS
    event_date:{type:Date}, // YYYY-MM-DDTHH:MM:SS
    room: {type:String},
    topic:{type:String},
    message: {type:String}
})
module.exports = {
    db: mongoose.model("note", schemaDefinition)
}