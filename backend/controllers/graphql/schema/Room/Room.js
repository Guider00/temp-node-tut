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
    members : [String],
    meterroom : String,
    roomprice : String,
    RoomType : String,

    checkin_date: String,
    checkout_date: String,

    version: String 
  }
input MemberID{
    id: String
}

  type Room {
    id: String,
    name:  String ,
    type: String,
    status: String,
    floor : Floor,
    member : Member,
    members : [Member],
    meterroom : MeterRoom,
    roomprice : Roomprice,
    RoomType : RoomType,

    checkin_date: String,
    checkout_date: String,

    version:String 
  }
        `
const _Roomschema_query =`
    Rooms:[Room],
    RoomByid(id:ID!):Room,
    querymembersinRoom(id:ID!):[Member],

`
const _Roomschema_mutation =`
    createRoom(input: RoomInput):MessageCreate,
    updateRoom(id: ID!, input: RoomInput): MessageUpdate,
    deleteRoom(id: ID!): MessageDelete,

    addmemberinRoom (id:ID! , input:MemberID!): MessageUpdate,
    deletememberinRoom (id:ID! , input:MemberID!): MessageUpdate,
`
const _Roomschema_subscription = `
    subRooms:[Room]
    
`

const _querymembersinRoom = async (payload , payload2) =>{
     if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 

        try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}

        let resulted = await db.findById({_id:payload.id})
        let data  = resulted._doc
        if(data.members.length > 0 ){
            let _resulte = await Promise.all( data.members.map( async memberid => {
                 return await queryMemberByid ( {id:memberid}) 
            } ) )
            return (_resulte)
        }
        else{
            return []  // << Room with Out member
        }
  
    } catch (error) {
        console.error(error)
        return null
    }

}
const _addmemberinRoom = async (payload , payload2) =>{
 if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 
    try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}

         let  resulted = await db.update({_id:payload.id},
          { $push: { "members": `${payload.input.id}` } }
         )
          return resulted
    } catch (error) {
        console.error(error)
        return null
    }

}
const _deletememberinRoom = async (payload , payload2) =>{
     if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 
     try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}

          let  resulted = await db.update({_id:payload.id},
          { $pull: { "members": `${payload.input.id}` } }
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


 const _queryRooms = async ( filter ) =>{
    try{
        let resulted =  await db.find(filter ? filter:{})
        let data = resulted.map(payload => payload._doc).map(async (payload) => {
            payload.id = payload._id.toString()
            payload.floor =  await queryFloorByid( {id:payload.floor})
            payload.member =  await queryMemberByid ( {id:payload.member})
            payload.members =  await Promise.all( payload.members.map( async memberid => {
                 return await queryMemberByid ( {id:memberid}) 
            } ) )
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
                members : [],
                checkin_date: data.checkin_date ? data.checkin_date :"",
                checkout_date: data.checkout_date ? data.checkout_date :"",
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

 const _queryRoomByid = async (payload , payload2) =>{
         if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 
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
            checkin_date: data.checkin_date,
            checkout_date: data.checkout_date,
            floor: await queryFloorByid({id:data.floor}),
            member : await queryMemberByid ( {id:data.member}),
            members :  await Promise.all( data.members.map( async memberid => {
                 return await queryMemberByid ( {id:memberid}) 
            } ) ),
            meterroom : await queryMeterRoomByid ( { id: data.meterroom}),
            roomprice : await queryRoomPriceByid({id:data.roomprice}),
            RoomType : await queryRoomTypeByid({id:data.RoomType})
        })
    } catch (error) {
        console.error(error)
        return null
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
  /** API Member in Room  */
exports.addmemberinRoom = _addmemberinRoom
exports.deletememberinRoom = _deletememberinRoom
exports.querymembersinRoom = _querymembersinRoom

  /** API  Room  */
exports.queryRoomByid = _queryRoomByid
exports.queryRooms = _queryRooms
exports.updateRoom  = _updateRoom
exports.deleteRoom  = _deleteRoom
exports.createRoom = _createRoom
/** API  Schema  */
exports.Roomschema = _Roomschema
exports.Roomschema_query = _Roomschema_query
exports.Roomschema_mutation = _Roomschema_mutation
exports.Roomschema_subscription = _Roomschema_subscription


