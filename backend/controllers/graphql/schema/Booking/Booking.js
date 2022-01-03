
const { db } = require('../../../models/Booking/Booking')

const { queryRoomByid  ,addbookingsinRoom ,deletebookingsinRoom }  = require ('../Room/Room')


const _Bookingschema = 
`
type Booking {
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
  confirm_booking :String
  receipt_number :String
  Room : Room
}

input BookingInput {
  booking_number :String
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
  confirm_booking :String
  receipt_number :String
  Room:String
 }

`



const _Bookingschema_query =`
    Bookings :[Booking]
    BookingByid(id:ID!): Booking
`
const _Bookingschema_mutation =`
    createBooking (input: BookingInput):MessageCreate,
    updateBooking(id: ID!, input: BookingInput): MessageUpdate,
    deleteBooking(id: ID! ,id_room:ID! ): MessageDelete,
`
const _queryBookingByid_raw = async (payload) =>{
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

const _queryBookingByid = async (payload) =>{
        try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}
        let resulted = await db.findById({_id:payload.id})
        if(!resulted) { return null}

        if(resulted.Room){
            resulted.Room = await queryRoomByid ({id : resulted.Room } )
        }

        return (
            resulted
        )
    } catch (error) {
        return error
    }
}

const _queryBookings = async () =>{
    try {
        let resulted = await db.find({})

        let data = resulted.map(payload => payload._doc).map(async payload => {
            payload.id = payload._id.toString()
            let _room = await queryRoomByid ({id:payload.Room})
            payload.Room  = _room
            return (payload)
        })

        return (
            [...data]
        )
    } catch (error) {
        return error
    }
}
const _createBooking = async (payload , payload2) =>{
         if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 

    try {
        if(payload && payload.input ) {
           
            try{
                let resulted = await  db.create(payload.input) 
                if(!resulted) { return null}
                let data  = resulted._doc
                if(payload && payload.input && payload.input.Room)
                {
                   let _res =  await addbookingsinRoom({id:payload.input.Room,input:{id:data._id.toString()}})
                   if(_res){
                        return {
                            id: data._id.toString(),
                            booking_number : data.booking_number,
                            customer_name :data.customer_name,
                            customer_lastname :data.customer_lastname,
                            customer_tel :data.customer_tel,
                            customer_address :data.customer_address,
                            payment_method :data.payment_method,
                            deposit :data.deposit,
                            checkin_date : data.checkin_date,
                            note: data.note,
                            status: data.status,
                            confirm_booking : data.confirm_booking,
                            receipt_number :data.status
                        }
                   }else{
                       return null 
                   }
                }

            }catch(e){
                 return null
            }

            
            
         }else{
            return null
         }
     } catch (error) {
       return error
     }
}

const _deleteBooking = async (payload , payload2) =>{

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

const _updateBooking = async (payload , payload2) =>{
    if(payload === undefined && payload2){ payload =payload2 } //<< function for graphqlexpress , Apollo 
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



exports.queryBookingByid_raw = _queryBookingByid_raw
exports.queryBookingByid = _queryBookingByid
exports.queryBookings = _queryBookings
exports.updateBooking  = _updateBooking
exports.deleteBooking  = _deleteBooking
exports.createBooking = _createBooking

exports.Bookingschema = _Bookingschema
exports.Bookingschema_query = _Bookingschema_query
exports.Bookingschema_mutation = _Bookingschema_mutation
