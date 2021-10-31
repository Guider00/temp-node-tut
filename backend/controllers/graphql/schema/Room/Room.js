const  {  db  }  = require('../../../models/Rooms/Rooms')
const { queryFloorByid }  = require('../Floor/Floor')
const { queryMemberByid } =require('../Member/Member')
const { queryMeterRoomByid } = require('../MeterRoom/MeterRoom')
const { queryRoomPriceByid } = require('../RoomPrice/RoomPrice')
const { queryRoomTypeByid } = require('../RoomType/RoomType')

 const _Roomschema = `
 input RoomInput {
    name:  String ,
    type: String,
    status: String,
    building: String,
    floor : String,
    member : String,
    meterroom : String,
    roomprice : String,
    RoomType : String,
    version: String 


  }
  type Room {
    id: String,
    name:  String ,
    type: String,
    status: String,
    floor : Floor,
    member : Member,
    meterroom : MeterRoom,
    roomprice : Roomprice,
    RoomType : RoomType,
    version:String 
  }
        `
const _Roomschema_query =`
    Rooms:[Room],
    RoomByid(id:ID!):Room,

`
const _Roomschema_mutation =`
    createRoom(input: RoomInput):MessageCreate,
    updateRoom(id: ID!, input: RoomInput): MessageUpdate,
    deleteRoom(id: ID!): MessageDelete,

`





 const _queryRoom = async ( filter ) =>{
    try{
        let resulted =  await db.find(filter ? filter:{})
        let data = resulted.map(payload => payload._doc).map(async (payload) => {
            payload.id = payload._id.toString()
            payload.floor =  await queryFloorByid( {id:payload.floor})
            payload.member =  await queryMemberByid ( {id:payload.member})
            payload.meterroom = await queryMeterRoomByid ( { id: payload.meterroom})
            payload.roomprice = await queryRoomPriceByid({id:payload.roomprice})
            payload.RoomType = await queryRoomTypeByid({id:payload.RoomType})

            return (payload)
        })
        return (
         [...data ]
        )
    }catch (error){
        return error
    }
 }
const _createRoom = async ( payload ,payload2) =>{
         if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 

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
                roomprice : await queryRoomPriceByid({id:data.roomprice}),
                RoomType : await queryRoomTypeByid({id:data.RoomType}),

                version :data.version 
            }
            
         }else{
            return null
         }
     } catch (error) {
       return error
     }
 }

const _deleteRoom = async (payload,payload2 ) =>{
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

 const _queryRoomByid = async (payload) =>{
    try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}

        let resulted = await db.findById({_id:payload.id})
        let data  = resulted._doc
        return ({
            id : data._id,
            name: data.name,
            status: data.status,
            floor: await queryFloorByid({id:data.floor}),
            member : await queryMemberByid ( {id:data.member}),
            meterroom : await queryMeterRoomByid ( { id: data.meterroom}),
            roomprice : await queryRoomPriceByid({id:data.roomprice}),
            RoomType : await queryRoomTypeByid({id:data.RoomType})
        })
    } catch (error) {
        return error
    }
}

const _updateRoom = async (payload ,payload2) =>{
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
 

exports.queryRoomByid = _queryRoomByid
exports.queryRooms = _queryRoom
exports.updateRoom  = _updateRoom
exports.deleteRoom  = _deleteRoom
exports.createRoom = _createRoom

exports.Roomschema = _Roomschema
exports.Roomschema_query = _Roomschema_query
exports.Roomschema_mutation = _Roomschema_mutation

