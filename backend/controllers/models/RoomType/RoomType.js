const mongoose = require( "mongoose")

const schemaDefinition = new mongoose.Schema({
  name: { type: String },
  type:{ type: String},
  monthlyprice : {type : String},
  dailyprice:{type : String},
  deposit_rent : {type : String},
  insurance : {type : String},
  type_price_eletrice : { type : String} , 
  unit_electrical: {type:String},
  rate_electrical: {type:String},
  totalprice_electrical :{type:String},
  type_price_water : { type : String} , 
  unit_water: {type:String},
  rate_water: {type:String},
  totalprice_water :{type:String},
  version:{type:String},
  listoptionroom:[
      {
          name: {type:String},
          price: {type:Number},
          type: {type:String}
      }
  ]

})
module.exports = {
    db : mongoose.model("roomtype", schemaDefinition)
}
