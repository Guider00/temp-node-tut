const mongoose = require("mongoose")

const schemaDefinition = new mongoose.Schema({
    name:{ type:String},
    portmeter: {type:String},
    device_model : {type:String},
    device_address: {type:String},
    inmemory_kwh: {type:String},
    inmemory_kwh_date: {type:String},
    realtime_kwh:{type:String},
    inmemory_water: {type:String},
    inmemory_water_date: {type:String},
    realtime_water:{type:String},
    deveui:{type:String},
    appeui:{type:String},
    appkey:{type:String},
    version: {type:String}

})
module.exports = {
    db: mongoose.model("meterroom", schemaDefinition)
}