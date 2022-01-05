const mongoose = require( "mongoose")

const schemaDefinition = new mongoose.Schema({
    id_contact:{type: String},
    checkin_type:{type: String} ,
    rent_time:{type: String},
    number_day_rent:{type: String},
    branch:{type: String},
    Checkinoption:[
        {
        name:{type:String},
        price:{type:String},
        }
    ]
})
module.exports = {
    db : mongoose.model("checkin", schemaDefinition)
}
