const { ApolloServer, PubSub, gql, AuthenticationError, ApolloError } = require('apollo-server-express');


const http = require('http');
const pubsub = new PubSub();

const { tace } = require('./tace')


const { aedes_clients, aedes_history_packets } = require('../../../MQTT/server/index')
const { readyState } = require('../../../db')



var jwt = require('jsonwebtoken');
const { User } = require('../../models/User/User')


const { Buildingschema, Buildingschema_query , Buildingschema_mutation,queryBuilding, queryBuildingByid,createBuilding, deleteBuilding, updateBuilding } = require('./Building/Building')
const { Floorschema ,Floorschema_query,Floorschema_mutation, queryFloor, queryFloorByid, createFloor, deleteFloor, updateFloor } = require('./Floor/Floor')
const { Memberschema,Memberschema_query,Memberschema_mutation ,queryMembers , queryMemberByid ,createMember,deleteMember,updateMember} = require('./Member/Member')
const { Bookingschema,Bookingschema_query,Bookingschema_mutation ,queryBookings , queryBookingByid ,createBooking,deleteBooking,updateBooking} = require('./Booking/Booking')

const { RoomTypeschema,RoomTypeschema_query,RoomTypeschema_mutation ,queryRoomTypes , queryRoomTypeByid ,createRoomType,deleteRoomType,updateRoomType,
 addlistoptioninRoomType , deletelistoptioninRoomType
 } = require('./RoomType/RoomType')
const { RoomPriceschema} = require('./Roomprice/Roomprice')
const { Portmeterschema } = require('./PortMeter/PortMeter')
const { MeterRoomschema } = require('./MeterRoom/MeterRoom')
const {Roomschema,Roomschema_query,Roomschema_mutation ,
queryRooms ,queryRoomByid ,createRoom,deleteRoom,updateRoom,
addmemberinRoom, deletememberinRoom, querymembersinRoom,
addbookingsinRoom , deletebookingsinRoom , querybookingsinRoom,
Roomschema_subscription,
subRooms
 } = require('./Room/Room')

 const { Invoiceschema , Invoicesschema_query ,Invoiceschema_mutation,Invoices , addInvoice} = require('./Invoice/Invoice')


const { Fileschema ,  UploadFile_query  ,  UploadFileschema_mutation  , UploadFile , singleUpload }  = require('./UploadFile/UploadFile') 

const { getAllMeter , adddevicelist }  = require ('../../../MQTT/server/devicemeters')



 // system interval broadcast 
let test = ""
let dbstatus = ""
let AllMeter  = ""
let Rooms = ""
var count = 0
 // << Test interval event 
setInterval(() => {
  adddevicelist("myport","mydevice","mytag",count++)

}, 5000);

setInterval(() => {

  if (test !== JSON.stringify(aedes_history_packets()) || dbstatus !== readyState()) {
    test = JSON.stringify(aedes_history_packets())
    dbstatus = readyState()

    // sub_abes_history_packets.forEach((sub_id) => pubsub.publish(sub_id,  { mqtthistory_packets: resulte_history_packets   }   ) )
    onMessagesBroadcast(sub_abes_history_packets)
    onMessagesBroadcast(sub_databasestatus)


  } else {

  }

  // << On change  meter device  >> //
  if( AllMeter  !==  JSON.stringify(getAllMeter() ) ) {
    AllMeter = JSON.stringify(getAllMeter() )
    onMessagesBroadcast(sub_devicemeterrealtime)
  }


}, 1000);


// ---------------------------- // 

const messages = [];

const submqtt = [];
const sub_abes_history_packets = []
const sub_databasestatus = []
const sub_devicemeterrealtime = [] 
const sub_rooms = []

const resulte_history_packets = () => aedes_history_packets().map((item) => ({ payload: String.fromCharCode.apply(null, (JSON.parse(JSON.stringify(item.payload)).data)).replace(/(?:\r\n|\r|\n)/g, ''), topic: item.topic }))

const subscribers = [];
const onMqttUpdate = (fn) => submqtt.push(fn);  //  set new user 
const onMessagesUpdates = (fn) => subscribers.push(fn);   // save new user subscriber to  array
const registersub = (arr_subscribers, fn) => { arr_subscribers.push(fn) }
const onMessagesBroadcast = (subscribers) => { subscribers.forEach((fn) => fn()) } // broadcast to all user



const typeDefs = gql`
${Floorschema}
${Buildingschema}
${Memberschema}
${Bookingschema}
${Portmeterschema}
${MeterRoomschema}
${RoomPriceschema}
${RoomTypeschema}
${Roomschema}
${Fileschema}
${Invoiceschema}

type SubMQTTServerstatus{
  name:String!
}

type MQTTHistory_packets{
  topic:String!
  payload:String
}
type Tag{
  id:String!
  port :String!
  device : String!
  tag: String!
  value:String
}

type MessageCreate{
  id:String
  errors:String
}
type Signup{
  token:String
  error:String
}
type MessageUpdate {
  n:Int
  nModified:Int
  ok:Int
}
type MessageDelete{
  n:Int
  ok:Int
  deletedCount:Int
}
type Login{
  token:String!
  error:String
}

type User{
  _id          : String
  id           : String
  username     : String
  tel          : String
  level        : String
  email        : String
  lock_user    : String
  reset_password : String 
  error:String
}



type Message {
  id: ID!
  user: String!
  content: String!
}
  type Query {
    ${Buildingschema_query}
    ${Floorschema_query}
    ${Memberschema_query}
    ${Bookingschema_query}
    ${RoomTypeschema_query}
    ${Roomschema_query}
    ${Invoicesschema_query}
 

    submqttserverstatus:[SubMQTTServerstatus]
    mqtthistory_packets:[MQTTHistory_packets]
    login(email:String!,password:String!):String
    users:[User]
    getuser:User

 
  }

  type Mutation {
     ${Buildingschema_mutation}
     ${Floorschema_mutation}
     ${Memberschema_mutation}
     ${Bookingschema_mutation}
     ${RoomTypeschema_mutation}
     ${Roomschema_mutation}
     ${UploadFileschema_mutation}
    ${Invoiceschema_mutation}

    postMessage(user: String!, content: String!): ID!
    signup (email:String! , password:String! ,level:String!) : Signup
    login (email:String! , password:String!): Login!
    deleteUser (id:String!) : MessageDelete
    updateUser (id:String! ,
                email:String,
                password:String,
                level:String,
                lock_user:String,
                reset_password:String 
                ) : MessageUpdate
                



  }

  type Subscription {
       ${Roomschema_subscription}
    messages: [Message!]
    submqttserverstatus:[SubMQTTServerstatus!]
    mqtthistory_packets:[MQTTHistory_packets!]
    subdatabasestatus:String
    subdevicemeterrealtime:[Tag!]
 

    
  }
`;
const Invoicequery = {
  Invoices:Invoices
  }

const resolvers = {
  Query: {
    //   messages: () => messages,
    //   submqttserverstatus : () => messages,
    //   mqtthistory_packets : () => messages
    users: async (parent, args, { user }, info) => {
      if (user && (user.level).toLowerCase() === 'admin') {
        const users = await User.find({})
        return users
      } else {
        throw new AuthenticationError('permission denied');
      }
    },
    getuser: async (parent, args, { user }, info) => {
      if (user) {
        console.log('get user ', user)
        return user
      } else {
        throw new AuthenticationError('permission denied');
      }
    },
    // bookings: async (parent, args, { user }, info) => {

    //     const bookings = await Booking.find({})
    //     return bookings

    // },

    Buildings:queryBuilding,
    BuildingByid:queryBuildingByid,

 
    Floors: queryFloor,
    FloorByid: queryFloorByid,

    Members: queryMembers,
    MemberByid: queryMemberByid,

    Bookings : queryBookings,
    BookingByid : queryBookingByid,

    RoomTypes : queryRoomTypes,
    RoomTypeByid : queryRoomTypeByid,

    Rooms :queryRooms,
    RoomByid : queryRoomByid,
    querymembersinRoom: querymembersinRoom,
    querybookingsinRoom: querybookingsinRoom,

    ...Invoicequery
   


  },
  Mutation: {
    createBuilding:createBuilding,
    updateBuilding:updateBuilding,
    deleteBuilding:deleteBuilding,

    createFloor: createFloor,
    updateFloor: updateFloor,
    deleteFloor: deleteFloor,

    createMember : createMember,
    updateMember : updateMember,
    deleteMember : deleteMember,

    createBooking : createBooking,
    updateBooking : updateBooking,
    deleteBooking : deleteBooking,

    createRoomType : createRoomType,
    updateRoomType : updateRoomType,
    deleteRoomType : deleteRoomType,

    addlistoptioninRoomType: addlistoptioninRoomType,
    deletelistoptioninRoomType: deletelistoptioninRoomType,

    createRoom : createRoom,
    updateRoom : updateRoom,
    deleteRoom : deleteRoom,
    addmemberinRoom : addmemberinRoom,
    deletememberinRoom : deletememberinRoom,
    addbookingsinRoom : addbookingsinRoom,
    deletebookingsinRoom : deletebookingsinRoom,

    addInvoice: addInvoice,
    
 


    UploadFile : UploadFile , 
    singleUpload: singleUpload,

    //   postMessage: (parent, { user, content }) => {
    //     const id = messages.length;
    //     messages.push({
    //       id,
    //       user,
    //       content,
    //     });
    //     subscribers.forEach((fn) => fn()); // << update all to  user subscripttion
    //     return id;
    //   },






    updateUser: async (parent, payload, { user }) => {
      if (user && (user.level).toLowerCase() === 'admin') {
        if (payload.id) {
          const user = await User.updateOne({ "_id": payload.id }, payload)
          return user
        } else {
          throw new Error('payload Error ');
        }
      } else {
        throw new AuthenticationError('permission denied');
      }
    },
    deleteUser: async (parent, { id }, { user }, info) => {
      if (user && (user.level).toLowerCase() === 'admin') {
        const user = await User.deleteOne({ "_id": id })
        return user
      } else {
        throw new AuthenticationError('permission denied');
      }
    },
    login: async (parent, { email, password }, context, info) => {

      const user = await User.findOne({ "email": email })
      console.log(user.id, user.email)
      if (user.lock_user === "true") {
        return ({ token: "", error: " Username is Locked plase contact Admin " })
      }
      if (user.validPassword(password)) {
        let token = jwt.sign({ user: user }, 'secret', { expiresIn: 60 * 60 });

        return ({ token, error: null })
      } else {
        return ({ token: "", error: "  username or password is wrong " })
      }

    },
    signup: async (parent, { email, password, level }, context, info) => {
      try {
        const user = await User.findOne({ "email": email })
        if (user) {
          return ({ token: "", error: "  That user is already to used " })
        } else {
          const create_user = await User.create({ email, password, level })
          if (create_user.validPassword(password)) {
            let token = jwt.sign({ user: create_user }, 'secret', { expiresIn: 60 * 60 });
            return ({ token, error: null })
          } else {
            return ({ token: "", error: "  signup error " })
          }
        }


      } catch (e) {
        return { token: "", error: "  signup error " }
      }
    }
  },
  Subscription: {
    submqttserverstatus: {
      subscribe: (parent, args, { user }) => {
        const channel = Math.random().toString(36).slice(2, 15); // generate  subscription id
        onMqttUpdate(() => pubsub.publish(channel, { submqttserverstatus: aedes_clients().map((client) => ({ name: client })) })); // << update new user  subscription
        setTimeout(() => pubsub.publish(channel, { submqttserverstatus: aedes_clients().map((client) => ({ name: client })) }), 0); // <<  update ข้อมูล มายัง id ปัจจุบัน 
        return pubsub.asyncIterator(channel);  // << return data to  s
      },
    },
    mqtthistory_packets: {
      subscribe: (parent, args, { user }) => {

        const channel = Math.random().toString(36).slice(2, 16); // generate  subscription id
        registersub(sub_abes_history_packets, () => pubsub.publish(channel, { mqtthistory_packets: resulte_history_packets })); // << update new user  subscription
        setTimeout(() => pubsub.publish(channel, { mqtthistory_packets: resulte_history_packets }), 0); // <<  update ข้อมูล มายัง id ปัจจุบัน 
        return pubsub.asyncIterator(channel);  // << return data to  s
      }
    },
    subdatabasestatus: {
      subscribe: (parent, args, { user }) => {
        console.log('user', user)
        if (user === undefined || user === null) { throw Error("Permission denied") }
        const channel = Math.random().toString(36).slice(2, 15); // generate  subscription id
        registersub(sub_databasestatus, () => pubsub.publish(channel, { subdatabasestatus: readyState })); // << update new user  subscription
        setTimeout(() => pubsub.publish(channel, { subdatabasestatus: readyState }), 0); // <<  update ข้อมูล มายัง id ปัจจุบัน 

        return pubsub.asyncIterator(channel);  // << return data to  s
      }

    },
     // << ยังไม่ได้ ทำ 
    subdevicemeterrealtime:{
      subscribe: (parent, args, { user }) => {
        console.log('user', user)
        if (user === undefined || user === null) { throw Error("Permission denied") }
        const channel = Math.random().toString(36).slice(2, 15); // generate  subscription id
        registersub(sub_devicemeterrealtime, () => pubsub.publish(channel, { subdevicemeterrealtime: getAllMeter })); // << update new user  subscription
        setTimeout(() => pubsub.publish(channel, { subdevicemeterrealtime: getAllMeter }), 0); // <<  update ข้อมูล มายัง id ปัจจุบัน 

        return pubsub.asyncIterator(channel);  // << return data to  s
      }
    },
    subRooms:{
      // subscribe:(parent, args, { user }) =>{
      // //  if (user === undefined || user === null) { throw Error("Permission denied") }
      //   const channel = Math.random().toString(36).slice(2, 15); // generate  subscription id
      //   registersub(sub_rooms, () => pubsub.publish(channel, { subRooms: queryRooms })); // << update new user  subscription
      //   setTimeout(() => pubsub.publish(channel, { subRooms: queryRooms }), 0); // <<  update ข้อมูล มายัง id ปัจจุบัน 
      //   return pubsub.asyncIterator(channel);  // << return data to  s
      // }
      subscribe:subRooms
    }
  },

};

const startApolloServer = async (app) => {


  const server = new ApolloServer({
    typeDefs, resolvers,
    context: ({ req, res, connection }) => {

      let Authorization = null
      if (connection && connection.context && connection.context.headers && connection.context.headers.Authorization) {
        Authorization = connection.context.headers.Authorization
      } else {
        Authorization = req ? req.headers ? req.headers.authorization ? req.headers.authorization : null : null : null;

      }
      const token = Authorization ? Authorization.replace('Bearer ', "") : null
      let _user = null
      if (token) {
        try {

          const { user } = jwt.verify(token, 'secret');
          _user = user
        } catch (e) {
          console.log('Error', e)
          //  throw new Error('verify user Error');
        }
      }

      return { "user": _user, req, res };
    },
    subscriptions: {
      path: '/graphql',
      onConnect: (connectionParams, ws, context) => {
        console.log('Sub Connected!', ws)

        return ({ headers: connectionParams })
      },
      onDisconnect: (webSocket, context) => {
        console.log('Sub Disconnected!')
      },
      // ...other options...
    }, tracing: true
  });

  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  // await server.start();


  httpServer.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:${4000}${server.graphqlPath}`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${4000}${server.subscriptionsPath}`)
  })
}

exports.startApolloServer = startApolloServer

