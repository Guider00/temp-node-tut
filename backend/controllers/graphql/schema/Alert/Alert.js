

const  db_Rooms  = require('../../../models/Rooms/Rooms')
const  db_Booking = require('../../../models/Booking/Booking')
const { queryBookingByid } = require('../Booking/Booking')

const _Alertschema = `
type Alert {
   alertbooking:String
}
`
const _Alertschema_subscription = `
    subAlerts:[Booking]
`
const filter_Room_Alart_booking  = async () =>{
         try{
        let bookings = await db_Booking.db.find({})

        bookings = bookings.map(booking => booking.toObject() )
        bookings.filter( booking =>{
            const now = new Date()
           if(now.getTime() >  booking.checkin_date.getTime())
           {
              return true
           }else{
              return false
           }
        })
        bookings = bookings.map(booking =>{
           let _booking = booking
           _booking.id = booking._id
           return _booking
        })
         return bookings
         }catch(e)
         {
            return []
         }

}

const {  PubSub } = require('apollo-server-express');
const sub_alerts = []
const pubsub = new PubSub();
const registersub = (arr_subscribers, fn) => { arr_subscribers.push(fn) }
const onMessagesBroadcast = (subscribers) => { subscribers.forEach((fn) => fn()) } // broadcast to all user

const _subAlerts  = async (parent, args, { user }) =>{
      //  if (user === undefined || user === null) { throw Error("Permission denied") }
       let  bookingalart =   await  filter_Room_Alart_booking()
      
        const channel = Math.random().toString(36).slice(2, 15); // generate  subscription id
        registersub(sub_alerts, () => pubsub.publish(channel, { subAlerts: bookingalart })); // << update new user  subscription
        setTimeout(() => pubsub.publish(channel, { subAlerts: bookingalart }), 0); // <<  update ข้อมูล มายัง id ปัจจุบัน 
        return pubsub.asyncIterator(channel);  // << return data to  s
}

/** API SubScript */
exports.subAlerts = _subAlerts
exports.Alertschema_subscription = _Alertschema_subscription
exports.Alertschema = _Alertschema