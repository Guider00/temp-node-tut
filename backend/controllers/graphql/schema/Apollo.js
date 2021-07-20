const { ApolloServer, PubSub ,gql , AuthenticationError , ApolloError } = require('apollo-server-express');
const  http = require('http');
const pubsub = new PubSub();


const {  aedes_clients ,aedes_history_packets  } = require('../../../MQTT/server/index')
const { readyState } = require('../../../db')



var jwt = require('jsonwebtoken');
const {  User } = require('../../models/User/User')



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

type MessageCreate{
  id:String
  errors:String
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


type User{
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
    submqttserverstatus:[SubMQTTServerstatus]
    mqtthistory_packets:[MQTTHistory_packets]
    login(email:String!,password:String!):String
    users:[User]
  }

  type Mutation {
    postMessage(user: String!, content: String!): ID!
    signup (email:String! , password:String! ,level:String!) : MessageCreate
    login (email:String! , password:String!): String!
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
     users : async( parent , args  , {user} ,info) =>{
       if(user &&  user.level  === 'admin' ){
          const  users = await User.find( {  })
          return users
       }else{
            throw new AuthenticationError('permission denied');
       }  
     }
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
        updateUser: async (parent , payload ,{user}) =>{
          if(user && user.level === 'admin')
          {
            if(payload.id){
              const  user = await User.updateOne( { "_id":payload.id } , payload )
              return user
            }else{
              throw new Error('payload Error ');
            }
          }else{
            throw new AuthenticationError('permission denied');
          }
        },
        deleteUser: async (parent , {id } , {user } , info ) =>{
          if(user && user.level === 'admin')
          {
            const  user = await User.deleteOne( { "_id":id })
            return user
          }else{
            throw new AuthenticationError('permission denied');
          }
        },
       login : async  (parent , { email , password } ,context ,info  )  =>{
     
        const  user = await User.findOne( { "email":email })
        console.log(user.id , user.email)
        if( user.lock_user === "true"){
          return(" account has been lock ")
        }
        if( user.validPassword(password) ) {
         let token =  jwt.sign( { user : user } , 'secret',{ expiresIn: 60 * 60 });
          
        // 
          return(token)
        }else{
          return(" wrong username or password ")
        }

       },
       signup :  async (parent , { email , password ,level } ,context ,info  )  =>{
         try{
          const docs  =   await User.create({email , password , level  })
          return docs
         }catch( e ){
          return  { id:"",errors: e }
         }
       }
    },
    Subscription: {
      submqttserverstatus :{
        subscribe: (parent, args ,{user} ) =>{
          const channel = Math.random().toString(36).slice(2, 15); // generate  subscription id
          onMqttUpdate(() => pubsub.publish(channel, {submqttserverstatus: aedes_clients().map ( (client)=>({name:client})  )  } )); // << update new user  subscription
          setTimeout(() => pubsub.publish(channel,  { submqttserverstatus:aedes_clients().map ( (client)=>({name:client})  )  } ), 0); // <<  update ข้อมูล มายัง id ปัจจุบัน 
          return pubsub.asyncIterator(channel);  // << return data to  s
        },
      },
      mqtthistory_packets:{
        subscribe:(parent, args , {user} ) =>{

          const channel = Math.random().toString(36).slice(2, 16); // generate  subscription id
          registersub(sub_abes_history_packets ,() => pubsub.publish(channel, { mqtthistory_packets: resulte_history_packets   } )); // << update new user  subscription
          setTimeout(() => pubsub.publish(channel,  { mqtthistory_packets: resulte_history_packets   } ), 0); // <<  update ข้อมูล มายัง id ปัจจุบัน 
          return pubsub.asyncIterator(channel);  // << return data to  s
        }
      },
      subdatabasestatus:{
        subscribe : (parent,args , {user}) =>{
          console.log('sub user',user )
          const channel = Math.random().toString(36).slice(2, 15); // generate  subscription id
          
          registersub(sub_databasestatus ,() => pubsub.publish(channel, {subdatabasestatus: readyState}  )); // << update new user  subscription
          setTimeout(() => pubsub.publish(channel,  {subdatabasestatus: readyState}  ), 0); // <<  update ข้อมูล มายัง id ปัจจุบัน 

          return pubsub.asyncIterator(channel);  // << return data to  s
        }

      }
    },

  };

 const startApolloServer = async ( app ) => {


    const server = new ApolloServer({ typeDefs, resolvers , 
      context:({req,res}) =>{
        
        const authorization = req ? req.headers ? req.headers.authorization ?  req.headers.authorization : null : null :null ;
        const token  =   authorization ? authorization.replace('Bearer ',"") : null
        let _user = null 
        if(token){
          try{

           const { user }  =  jwt.verify(token, 'secret')  ;
           _user = user

          }catch(e){
           // throw new AuthenticationError('you must be logged in');
          }
        }

        return { "user":_user ,req , res };
      },
      subscriptions: { 
        path: '/graphqlsub',
        onConnect: (connectionParams, webSocket, context) => {
          console.log('Sub Connected!')
        },
        onDisconnect: (webSocket, context) => {
          console.log('Sub Disconnected!')
        },
        // ...other options...
      },tracing: true 
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

