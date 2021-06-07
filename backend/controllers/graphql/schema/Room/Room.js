const  { dbroom: db  }  = require('../../../models/Rooms/Rooms')
const { queryFloorByid }  = require('../Floor/Floor')
 const _updateRoom = async (payload) =>{
    try{
        if(!payload){return null}
        if(!payload.id){return null}
        if(!payload.input){return null}
        let  resulte = await db.updateOne({_id:payload.id},payload.input)
        return resulte
    }catch(error){
        return error
    }
 }
const _deleteRoom = async (payload ) =>{
    try{
        if(!payload){return null}
        if(!payload.id){return null}
        let resulte = await db.deleteOne({_id:payload.id})
         return resulte
     }catch(error){
         return error
     }
 }
const _createRoom = async ( payload ) =>{
    try {
        if(payload && payload.input ) {
            let resulte = await  db.create(payload.input) 
            if(!resulte) { return null}
            let data  = resulte._doc
            return {
                id:data._id.toString() ,
                name:  data.name ,
                type:  data.type,
                status: data.status,
                floor : await queryFloorByid( {id:data.floor}),
                version :data.version 
            }
            
         }else{
            return null
         }
     } catch (error) {
       return error
     }
 }
 const _queryRoom = async ( filter ) =>{
    try{
        let resulte =  await db.find(filter ? filter:{})

        let data = resulte.map(payload => payload._doc).map(async (payload) => {
            payload.id = payload._id.toString()
            payload.floor =  await queryFloorByid( {id:payload.floor})
            return (payload)
        })
        return (
         [...data ]
        )
    }catch (error){
        return error
    }
 }

 const _queryRoomByid = async (payload) =>{
    try {
        let resulte = await db.findById({_id:payload.id})
        let data  = resulte._doc
        return ({
            id : data._id,
            name: data.name,
            floor: await queryFloorByid({id:data.floor})
        })
    } catch (error) {
        return error
    }
}


 
 const _Roomschema = `
 input RoomInput {
    name:  String ,
    type: String,
    status: String,
    floor : String,
    version:String 

  }
  type Room {
    id: String,
    name:  String ,
    type: String,
    status: String,
    floor : Floor,
    version:String 
  }
        `
exports.queryRoomByid = _queryRoomByid
exports.queryRoom = _queryRoom
exports.updateRoom  = _updateRoom
exports.deleteRoom  = _deleteRoom
exports.createRoom = _createRoom
exports.Roomschema = _Roomschema

