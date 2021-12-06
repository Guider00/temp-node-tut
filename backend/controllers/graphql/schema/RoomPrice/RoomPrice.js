const  { db }  =  require( "../../../models/RoomPrice/RoomPrice");

const _createRoomPrice = async (payload)=> {
    try {
        if(!payload){ return null }
        if(!payload.input){ return null }
       let resulted = await  db.create(payload.input) // findOrCreate(dbroomprice, {}, data)
       return resulted
    } catch (error) {
      return error
    }
}
const _queryRoomPrice =async (filter) =>{
    try{
        let resulted =  await db.find(filter)
        let _rooms = resulted.map(payload => payload._doc).map(payload => {
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

const _queryRoomPriceByid =async (payload) =>{
    try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}
        let resulted = await db.findById({_id:payload.id})
        if(!resulted) { return null}

        return (
            resulted
        )
    } catch (error) {
        return error
    }
}
const _updateRoomPrice = async (payload ,payload2) =>{
      if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 
    try{
        if(!payload){return null}
        if(!payload.id){return null}
        if(!payload.input){return null}
        let  resulted = await db.updateOne({_id:payload.id},payload.input)
        return resulted
    }catch(error){
        return error
    }
}
const _deleteRoomPrice = async (payload,payload2) =>{
     if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 
    try{
        if(!payload){return null}
        if(!payload.id){return null}
       let resulted = await db.deleteOne({_id:payload.id})
        return resulted
    }catch(error){
        return error
    }
}


const _RoomPriceschema = `

  input RoompriceInput {
    name:  String ,
    type: String,
    monthlyprice :  String,
    dailyprice :String,
    deposit_rent : String,
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
    dailyprice :String,
    deposit_rent : String,
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
exports.queryRoomPriceByid = _queryRoomPriceByid

exports.updateRoomPrice = _updateRoomPrice
exports.deletRoomPrice= _deleteRoomPrice
exports.createRoomPrice = _createRoomPrice
exports.RoomPriceschema = _RoomPriceschema
