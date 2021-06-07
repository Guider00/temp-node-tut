const mongoose = require("mongoose")

const schemaDefinition = new mongoose.Schema({
    name: { type: String },
})
module.exports = {
    db: mongoose.model("building", schemaDefinition)
}