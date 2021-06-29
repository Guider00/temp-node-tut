const mongoose = require("mongoose")

const schemaDefinition = new mongoose.Schema({
    name:{ type:String},
    port :{type:String},
    device_address: {type:String},

    inmemory_kwh: {type:String},
    inmemory_kwh_date: {type:Date},
    realtime_kwh:{type:String},

    inmemory_water: {type:String},
    inmemory_water_date: {type:Date},
    realtime_water:{type:String},

    device_model : {type:String},
    version: {type:String}
})
module.exports = {
    db: mongoose.model("meterroom", schemaDefinition)
}