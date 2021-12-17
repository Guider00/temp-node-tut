
const  { db }  =  require( "../../../models/RoomType/RoomType");


const _queryRoomTypes =async (filter) =>{
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

const _queryRoomTypeByid =async (payload , payload2) =>{
    if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 
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
const _createRoomType = async (payload , payload2)=> {
     if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 
    try {
        if(!payload){ return null }
        if(!payload.input){ return null }
       let resulted = await  db.create(payload.input) // findOrCreate(dbroomprice, {}, data)
       return resulted
    } catch (error) {
      return error
    }
}

const _updateRoomType = async (payload ,payload2) =>{
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
const _deleteRoomType = async (payload,payload2) =>{
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

const _addlistoptioninRoomType = async (payload , payload2) =>{

    if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 
     try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}

          let  resulted = await db.updateOne({_id:payload.id  },
          { $push: { "listoptionroom": payload.input } },
             
          )
  
          if(resulted && resulted.nModified === 0 ){
              return null // << system not found  id member modified 
          }else{
            return resulted
          }
       

     }catch (error){
         return null
     }
}
const _deletelistoptioninRoomType = async (payload,payload2) =>{
    if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 
     try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}

          let  resulted = await db.updateOne({_id:payload.id},
          { $pull: { "listoptionroom": {_id: payload.input.id } } }
          )
  
          if(resulted && resulted.nModified === 0 ){
              return null // << system not found  id member modified 
          }else{
            return resulted
          }
       

     }catch (error){
         return null
     }
}

const _RoomTypeschema = `
input OptionRoomInput{
    id:String,
    name: String,
    price: String,
    type : String
  }
  type OptionRoom {
    id : String
    name: String,
    price: String,
    type : String
  }

  input RoomTypeInput {
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
  type RoomType {
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
const _RoomTypeschema_query =`
    RoomTypes :[RoomType]
    RoomTypeByid(id:ID!): RoomType
`
const _RoomTypeschema_mutation = `
    createRoomType (input: RoomTypeInput):MessageCreate,
    updateRoomType(id: ID!, input: RoomTypeInput): MessageUpdate,
    deleteRoomType(id: ID!): MessageDelete,
    deletelistoptioninRoomType(id:ID!,input: OptionRoomInput) :MessageUpdate,
    addlistoptioninRoomType(id: ID!,input: OptionRoomInput):MessageUpdate,
`

exports.queryRoomTypes = _queryRoomTypes
exports.queryRoomTypeByid = _queryRoomTypeByid

exports.updateRoomType = _updateRoomType
exports.deleteRoomType= _deleteRoomType
exports.createRoomType = _createRoomType

exports.addlistoptioninRoomType = _addlistoptioninRoomType
exports.deletelistoptioninRoomType = _deletelistoptioninRoomType

exports.RoomTypeschema_query =_RoomTypeschema_query
exports.RoomTypeschema_mutation = _RoomTypeschema_mutation
exports.RoomTypeschema = _RoomTypeschema