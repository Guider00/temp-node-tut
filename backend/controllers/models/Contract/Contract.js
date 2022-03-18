const mongoose = require( "mongoose")

const schemaDefinition = new mongoose.Schema({
    Contractnumber: {type:String},
    RoomType: {type:String},
    RoomName: {type:String},
    RentType: {type:String},
    name: {type:String},
    surname: {type:String},
    status: {type:String ,default:"สัญญารอการยืนยัน"},


    Check_in: {type:String},
    Check_out: {type:String},
    checkinid:{type:String},
    roomid:{type:String} , 
    

    typeroom:{type:String},
    typerent:{type:String,default:"รายเดือน"},
    rentprince:{type:String,default:"0"},



  
    mounthly_cost: {type:String , default:"3000"},
    insurance_cost: {type:String , default:"1000"},
    depositrent_cost:  {type:String , default:"9000"},

    mounthly_type_electrical_cost: {type:String , default:"type_perunit"},
    mounthly_rate_electrical: {type:String , default:"4"},
    mounthly_minimum_cost_electrical: {type:String , default:"0"},
    mounthly_buffet_cost_electrical: {type:String , default:"0"},

    mounthly_type_water_cost: {type:String , default:"type_perunit"},
    mounthly_rate_water:  {type:String , default:"21"},
    mounthly_minimum_cost_water: {type:String , default:"21"},
    mounthly_buffet_cost_water: {type:String , default:"0"},



 
    daily_cost: {type:String , default:"500"},
    daily_type_electrical_cost: {type:String , default:"type_buffet"},
    daily_rate_electrical: {type:String ,  default:"4"},
    daily_minimum_cost_electrical: {type:String , default:"0"},
    daily_buffet_cost_electrical: {type:String , default:"0" },
    daily_type_water_cost: {type:String , default:"type_buffet"},
    daily_rate_water: {type:String , default:"10" },
    daily_minimum_cost_water:  {type:String , default:"0"},
    daily_buffet_cost_water:  {type:String , default:"0" },


    filecontract:{type:String}

})
module.exports = {
    db : mongoose.model("contract", schemaDefinition)
}
