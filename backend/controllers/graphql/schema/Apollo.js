const { ApolloServer, PubSub ,gql } = require('apollo-server-express');
const  http = require('http');
const pubsub = new PubSub();


const {  aedes_clients ,aedes_history_packets  } = require('../../../MQTT/server/index')
const { readyState } = require('../../../db')


let test = ""
let dbstatus = ""
setInterval(() => {

  if(test !== JSON.stringify( aedes_history_packets())  ||  dbstatus !== readyState())
  {
    test = JSON.stringify( aedes_history_packets())
    dbstatus = readyState()

   // sub_abes_history_packets.forEach((sub_id) => pubsub.publish(sub_id,  { mqtthistory_packets: resulte_history_packets   }   ) )
   onMessagesBroadcast( sub_abes_history_packets )
   onMessagesBroadcast( sub_databasestatus )


  }else{

  }

}, 1000);


const messages = [];

const submqtt =[];
const sub_abes_history_packets = []
const sub_databasestatus  = [] 
const resulte_history_packets = () => aedes_history_packets().map ( (item)=>({payload:   String.fromCharCode.apply(null, (JSON.parse(JSON.stringify(item.payload)).data) ).replace(/(?:\r\n|\r|\n)/g, '')  ,topic:item.topic}) ) 
const subscribers = [];
 
const onMqttUpdate = (fn) => submqtt.push(fn);  //  set new user 
const onMessagesUpdates = (fn) => subscribers.push(fn);   // save new user subscriber to  array


const registersub  = ( arr_subscribers, fn ) => { arr_subscribers.push(fn)}
const onMessagesBroadcast  = ( subscribers ) => { subscribers.forEach((fn) => fn()) } // broadcast to all user



const typeDefs = gql`

type SubMQTTServerstatus{
  name:String!
}

type MQTTHistory_packets{
  topic:String!
  payload:String
}


type Message {
  id: ID!
  user: String!
  content: String!
}
  type Query {
    submqttserverstatus:[SubMQTTServerstatus]
    mqtthistory_packets:[MQTTHistory_packets]
  }

  type Mutation {
    postMessage(user: String!, content: String!): ID!
  }

  type Subscription {
    messages: [Message!]
    submqttserverstatus:[SubMQTTServerstatus!]
    mqtthistory_packets:[MQTTHistory_packets!]
    subdatabasestatus:String
  }
`;
const resolvers = {
    Query: {
    //   messages: () => messages,
    //   submqttserverstatus : () => messages,
    //   mqtthistory_packets : () => messages
    },
    Mutation: {
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
    },
    Subscription: {
      submqttserverstatus :{
        subscribe: (parent, args) =>{
          const channel = Math.random().toString(36).slice(2, 15); // generate  subscription id
          onMqttUpdate(() => pubsub.publish(channel, {submqttserverstatus: aedes_clients().map ( (client)=>({name:client})  )  } )); // << update new user  subscription
          setTimeout(() => pubsub.publish(channel,  { submqttserverstatus:aedes_clients().map ( (client)=>({name:client})  )  } ), 0); // <<  update ข้อมูล มายัง id ปัจจุบัน 
          return pubsub.asyncIterator(channel);  // << return data to  s
        },
      },
      mqtthistory_packets:{
        subscribe:(parent, args) =>{
          const channel = Math.random().toString(36).slice(2, 16); // generate  subscription id
          registersub(sub_abes_history_packets ,() => pubsub.publish(channel, { mqtthistory_packets: resulte_history_packets   } )); // << update new user  subscription
          setTimeout(() => pubsub.publish(channel,  { mqtthistory_packets: resulte_history_packets   } ), 0); // <<  update ข้อมูล มายัง id ปัจจุบัน 
          return pubsub.asyncIterator(channel);  // << return data to  s
        }
      },
      subdatabasestatus:{
        subscribe : (parent,args) =>{
          const channel = Math.random().toString(36).slice(2, 15); // generate  subscription id
          
          registersub(sub_databasestatus ,() => pubsub.publish(channel, {subdatabasestatus: readyState}  )); // << update new user  subscription
          setTimeout(() => pubsub.publish(channel,  {subdatabasestatus: readyState}  ), 0); // <<  update ข้อมูล มายัง id ปัจจุบัน 

          return pubsub.asyncIterator(channel);  // << return data to  s
        }

      }
    },

  };

 const startApolloServer = async ( app ) => {


    const server = new ApolloServer({ typeDefs, resolvers , subscriptions: {
        path: '/graphqlsub',
        onConnect: (connectionParams, webSocket, context) => {
          console.log('Sub Connected!')
        },
        onDisconnect: (webSocket, context) => {
          console.log('Sub Disconnected!')
        },
        // ...other options...
      },tracing: true });
    
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

