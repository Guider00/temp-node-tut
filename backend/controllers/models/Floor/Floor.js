const mongoose = require("mongoose")

const schemaDefinition = new mongoose.Schema({
    name: { type: String },
    building : {type : String}
})
module.exports = {
    db: mongoose.model("floor", schemaDefinition)
}