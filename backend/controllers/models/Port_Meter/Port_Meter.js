const mongoose = require("mongoose")

const schemaDefinition = new mongoose.Schema({
    name:{ type:String},
    protocol : { type: String },
    comport :{type: String},
    baudrate :  {type : String },
    readtimeout : {type :String },
    writetimeout : {type :String },
    stopbits : {type: String},
    databits :{type : String },
    autoreconnect : {type :String },
    // Modbus TCP
    ipaddress :{type: String},
    tcp_port:{type:String},
     // MQTT 
    topic :{type:String},

    version: {type:String}


})
schemaDefinition.pre('find', function() {
    this._startTime = Date.now();
  });
  
schemaDefinition.post('find', function() {
    if (this._startTime != null) {
      console.log('Runtime in MS: ', Date.now() - this._startTime);
    }
});
module.exports = {
    db: mongoose.model("portmeter", schemaDefinition)
}