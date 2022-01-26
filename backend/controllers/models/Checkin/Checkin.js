const mongoose = require( "mongoose")

const schemaDefinition = new mongoose.Schema({
    id_contact:{type: String,default:""},
    checkin_type:{type: String} ,
    checkin_date:{type: String},
    checkin_date_exp:{type: String},
    rental_deposit:{type: String},
    number_day_rent:{type: String},
    branch:{type: String,default:""},
    Checkinoption:[
        {
            name:{type:String ,default:""},
            price:{type:String ,default:0},
            number_item:{type:String ,default:1},
            calculate_mode:{type:String ,default:"ครั้งเดียว"},
            type_price:{type:String ,default:"ราคาไม่รวมvat"},
            selectvat:{type:String ,default:"คิดvat"},
        }
    ]
})
module.exports = {
    db : mongoose.model("checkin", schemaDefinition)
}
