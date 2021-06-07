const  { db }  =  require( "../../../models/RoomPrice/RoomPrice");

const _createRoomPrice = async (payload)=> {
    try {
        if(!payload){ return null }
        if(!payload.data){ return null }
       let resulte = await  db.create(payload.data) // findOrCreate(dbroomprice, {}, data)
       return resulte
    } catch (error) {
      return error
    }
}
const _queryRoomPrice =async (filter) =>{
    try{
        let resulte =  await db.find(filter)
        let _rooms = resulte.map(payload => payload._doc).map(payload => {
            payload.id = payload._id.toString()
            return (payload)
        })
        return (
            [..._rooms ]
           )
    }catch (error){
        return error
    }
}
const _updateRoomPrice = async (payload) =>{
    
    try{
        if(!payload){return null}
        if(!payload.id){return null}
        if(!payload.input){return null}
        let  resulte = await db.updateOne({_id:payload.id},payload.data)
        return resulte
    }catch(error){
        return error
    }
}
const _deleteRoomPrice = async (payload) =>{
   
    try{
        if(!payload){return null}
        if(!payload.id){return null}
       let resulte = await db.deleteOne({_id:payload.id})
        return resulte
    }catch(error){
        return error
    }
}

const _RoomPriceschema = `
input OptionRoomInput{
    topic: String,
    price: Float,
    type : String
  }
  type OptionRoom {
    id : String
    topic: String,
    price: Float,
    type : String
  }
  input RoompriceInput {
    name:  String ,
    type: String,
    monthlyprice :  String,
    forehandrent : String,
    insurance :  String,
    type_price_electrical : String , 
    unit_electrical: String,
    rate_electrical: String,
    totalprice_electrical :String,
    type_price_water :  String , 
    unit_water: String,
    rate_water: String,
    totalprice_water :String,
    listoptionroom:[OptionRoomInput],
    version:String 
  }
  type Roomprice {
    id: String,
    name:  String ,
    type: String,
    monthlyprice :  String,
    forehandrent : String,
    insurance :  String,
    type_price_electrical : String , 
    unit_electrical: String,
    rate_electrical: String,
    totalprice_electrical :String,
    type_price_water :  String , 
    unit_water: String,
    rate_water: String,
    totalprice_water :String,
    listoptionroom:[OptionRoom]
    version:String 
  }
`

exports.queryRoomPrice = _queryRoomPrice
exports.updateRoomPrice = _updateRoomPrice
exports.deletRoomPrice= _deleteRoomPrice
exports.createRoomPrice = _createRoomPrice
exports.RoomPriceschema = _RoomPriceschema
