const  {  db  }  = require('../../../models/Rooms/Rooms')
const { queryFloorByid }  = require('../Floor/Floor')
const { queryMemberByid } =require('../Member/Member')
const { queryMeterRoomByid } = require('../MeterRoom/MeterRoom')
 const _updateRoom = async (payload) =>{
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
const _deleteRoom = async (payload ) =>{
    try{
        if(!payload){return null}
        if(!payload.id){return null}
        let resulted = await db.deleteOne({_id:payload.id})
         return resulted
     }catch(error){
         return error
     }
 }
const _createRoom = async ( payload ) =>{
    try {
        if(payload && payload.input ) {
            let resulted = await  db.create(payload.input) 
            if(!resulted) { return null}
            let data  = resulted._doc
            return {
                id:data._id.toString() ,
                name:  data.name ,
                type:  data.type,
                status: data.status,
                floor : await queryFloorByid( {id:data.floor}),
                member : await queryMemberByid( {id:data.member}),
                meterroom : await queryMeterRoomByid ( { id: data.meterroom}),
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
        let resulted =  await db.find(filter ? filter:{})
        let data = resulted.map(payload => payload._doc).map(async (payload) => {
            payload.id = payload._id.toString()
            payload.floor =  await queryFloorByid( {id:payload.floor})
            payload.member =  await queryMemberByid ( {id:payload.member})
            payload.meterroom = await queryMeterRoomByid ( { id: payload.meterroom})
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
        let resulted = await db.findById({_id:payload.id})
        let data  = resulted._doc
        return ({
            id : data._id,
            name: data.name,
            floor: await queryFloorByid({id:data.floor}),
            member : await queryMemberByid ( {id:payload.member}),
            meterroom : await queryMeterRoomByid ( { id: data.meterroom})
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
    building: String,
    floor : String,
    member : String,
    meterroom : String,
    version:String 


  }
  type Room {
    id: String,
    name:  String ,
    type: String,
    status: String,
    floor : Floor,
    member : Member,
    meterroom : MeterRoom,
    version:String 
  }
        `
exports.queryRoomByid = _queryRoomByid
exports.queryRoom = _queryRoom
exports.updateRoom  = _updateRoom
exports.deleteRoom  = _deleteRoom
exports.createRoom = _createRoom
exports.Roomschema = _Roomschema

