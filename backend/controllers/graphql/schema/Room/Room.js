const  {  db  }  = require('../../../models/Rooms/Rooms')
const { queryFloorByid }  = require('../Floor/Floor')
const { queryMemberByid } =require('../Member/Member')

let FuncBook = require('../Booking/Booking')
const { queryInvoiceByid , queryInvoicedetailsByid} = require('../Invoice/Invoice')
const { queryReceiptByid } = require('../Receipt/Receipt')
const { queryContractByid , queryContractdetailsByid } = require('../Contract/Contract')



const { queryMeterRoomByid } = require('../MeterRoom/MeterRoom')
const { queryRoomPriceByid } = require('../RoomPrice/RoomPrice')
const { queryRoomTypeByid } = require('../RoomType/RoomType')

const {queryCheckinByid ,Checkinschema} = require('../Checkin/Checkin')




 const _Roomschema = `
input RoomInput {
    name:  String ,
    type: String,
    status: String,
    building: String,
    floor : String,
    member : String,
    members : [String],
    bookings:[String],

    meterroom : String,
    roomprice : String,
    RoomType : String,

    checkin_date: String,
    checkout_date: String,

    checkinid:String,


    checkinInvoiceid:String,
    checkinReceiptid:String,

    monthlyInvoiceid:String,
    monthlyReceiptid:String,

    checkoutInvoiceid:String,
    checkoutReceiptid:String,

    contractid:String

    version: String 
  }

input MemberID{
    id: String
}
input BookingID{
    id: ID!
}
type ContractinRoom{
    id:String
    Contractnumber: String
    RoomType: String
    RoomName: String
    RentType: String
    name: String
    surname: String
    Check_in: String
    status: String
    Check_out: String
}
type BookinginRoom{
    id: String
    booking_number:String
    customer_name :String
    customer_lastname :String
    customer_tel :String
    customer_address :String
    payment_method :String
    deposit :String
    checkin_type : String
    checkin_date : String
    checkin_date_exp : String
    note: String
    status: String
    confirm_booking:String
    receipt_number :String
}



  type Room {
    id: String,
    name:  String ,
    type: String,
    status: String,
    floor : Floor,
    member : Member,
    members : [Member],
    bookings : [BookinginRoom],
    meterroom : MeterRoom,
    roomprice : Roomprice,
    RoomType : RoomType,
    checkin_date: String,
    checkout_date: String,

    checkin : Checkin,

    checkinInvoice:Invoice,
    checkinReceipt:Receipt,

    monthlyInvoice:Invoice,
    monthlyReceipt:Receipt,

    checkoutInvoice:Invoice,
    checkoutReceipt:Receipt,

    Contract:Contract


    version:String 
  }
        `
const _Roomschema_query =`
    Rooms:[Room],
    RoomByid(id:ID!):Room,
    querymembersinRoom(id:ID!):[Member],
    querybookingsinRoom (id:ID!):[Booking]


`
const _Roomschema_mutation =`
    createRoom(input: RoomInput):MessageCreate,
    updateRoom(id: ID!, input: RoomInput): MessageUpdate,
    deleteRoom(id: ID!): MessageDelete,

    addmemberinRoom (id:ID! , input:MemberID!): MessageUpdate,
    deletememberinRoom (id:ID! , input:MemberID!): MessageUpdate,
    addbookingsinRoom(id:ID! , input:BookingID!): MessageUpdate,
    deletebookingsinRoom(id:ID! , input:BookingID!): MessageUpdate,
`
const _Roomschema_subscription = `
    subRooms:[Room],
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
            let _resulte = await Promise.all( data.bookings.map( async bookingid => {
                 return await queryMemberByid ( {id:bookingid}) 
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

const _querybookingsinRoom = async (payload , payload2 ) =>{
    if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 

        try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}

        let resulted = await db.findById({_id:payload.id})
        let data  = resulted._doc
        if(data.members.length > 0 ){
            let _resulte = await Promise.all( data.members.map( async memberid => {
                 return await FuncBook.queryBookingByid ( {id:memberid}) 
                
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
const _addbookingsinRoom = async (payload , payload2) =>{
    if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 
     try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}

          let  resulted = await db.update({_id:payload.id  },
          { $push: { "bookings": `${payload.input.id}` } },
             
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
 
const _deletebookingsinRoom =  async (payload , payload2) =>{
    if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 
     try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}

          let  resulted = await db.update({_id:payload.id},
          { $pull: { "bookings": `${payload.input.id}` } }
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
        let data =  resulted.map(payload => payload._doc).map(async (payload) => {
            payload.id = payload._id.toString()
            payload.floor =  await queryFloorByid( {id:payload.floor})
            payload.member =  await queryMemberByid ( {id:payload.member})
            payload.members =  await Promise.all( payload.members.map( async memberid => {
                 return await queryMemberByid ( {id:memberid}) 
            } ) )
          

            payload.bookings = await Promise.all (payload.bookings.map ( async bookingid => {
                return await FuncBook.queryBookingByid_raw({id:bookingid})
            }))
            payload.meterroom = await queryMeterRoomByid ( { id: payload.meterroom})
            payload.roomprice = await queryRoomPriceByid({id:payload.roomprice})
            payload.RoomType = await queryRoomTypeByid({id:payload.RoomType})

        
            payload.checkin  = await queryCheckinByid({id:payload.checkinid})

            payload.checkinInvoice = await queryInvoicedetailsByid({id:payload.checkinInvoiceid})
            payload.checkinReceipt = await queryReceiptByid({id:payload.checkinReceiptid})

            payload.monthlyInvoice = await queryInvoicedetailsByid({id:payload.monthlyInvoiceid})
            payload.monthlyReceipt = await queryReceiptByid({id:payload.monthlyReceiptid})


            payload.checkoutInvoice = await queryInvoicedetailsByid({id:payload.checkoutInvoiceid})
            payload.checkoutReceipt = await queryReceiptByid({id:payload.checkoutReceiptid})

            payload.Contract = await queryContractdetailsByid({id:payload.contractid})


            
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
            onMessagesBroadcast(sub_rooms)
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
        onMessagesBroadcast(sub_rooms)
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
        if(resulted && resulted._doc ) {
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
                RoomType : await queryRoomTypeByid({id:data.RoomType}),
                checkin  : await queryCheckinByid({id:data.checkinid}),

                checkinInvoice : await queryInvoicedetailsByid({id:data.checkinInvoiceid}),
                checkinReceipt : await queryReceiptByid({id:data.checkoutReceiptid}),

                monthlyInvoice : await queryInvoicedetailsByid({id:data.monthlyInvoiceid}),
                monthlyReceipt : await queryReceiptByid({id:data.monthlyReceiptid}),


                checkoutInvoice : await queryInvoicedetailsByid({id:data.checkoutInvoiceid}),
                checkoutReceipt : await queryReceiptByid({id:data.checkoutReceiptid}),

                Contract : await queryContractdetailsByid({id:data.contractid}),
            })
        }else{
            return null // not found  Room 
        }
       
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
         onMessagesBroadcast(sub_rooms)
        return resulted
    }catch(error){
        return error
    }
 }


const {  PubSub } = require('apollo-server-express');
const sub_rooms = []
const pubsub = new PubSub();
const registersub = (arr_subscribers, fn) => { arr_subscribers.push(fn) }
const onMessagesBroadcast = (subscribers) => { subscribers.forEach((fn) => fn()) } // broadcast to all user
const _subRooms  = (parent, args, { user }) =>{
      //  if (user === undefined || user === null) { throw Error("Permission denied") }
        const channel = Math.random().toString(36).slice(2, 15); // generate  subscription id
        registersub(sub_rooms, () => pubsub.publish(channel, { subRooms: _queryRooms })); // << update new user  subscription
        setTimeout(() => pubsub.publish(channel, { subRooms: _queryRooms }), 0); // <<  update ข้อมูล มายัง id ปัจจุบัน 
        return pubsub.asyncIterator(channel);  // << return data to  s
    }



/** API Booking in Room  */
exports.addbookingsinRoom =_addbookingsinRoom
exports.deletebookingsinRoom = _deletebookingsinRoom
exports.querybookingsinRoom = _querybookingsinRoom


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
/** API SubScript */
exports.subRooms = _subRooms

/** API  Schema  */
exports.Roomschema = _Roomschema
exports.Roomschema_query = _Roomschema_query
exports.Roomschema_mutation = _Roomschema_mutation
exports.Roomschema_subscription = _Roomschema_subscription

