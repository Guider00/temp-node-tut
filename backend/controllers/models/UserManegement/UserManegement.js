const mongoose = require( "mongoose")

const schemaDefinition = new mongoose.Schema({
    passWord: {type:String},
    name: {type:String},
    level: {type:String},

})
module.exports = {
    db : mongoose.model("UserManagement", schemaDefinition)
}
