const { mqtt_publich } = require('./publish')
const {PORT_MQTT_AEDES ,PORT_MQTTT_MOSCA } =  require('./config')

const  Apollo =  require('./../../controllers/graphql/schema/Apollo')
let server = null 
let aedes_clients = []
let aedes_history_packets = []


const _aedes_clients = () => {
    let  _aedes_clients_id =  aedes_clients.map(client => ({id: client.id }) )
    return (JSON.parse(JSON.stringify(_aedes_clients_id)));
}
const _aedes_history_packets = () =>{
    return (JSON.parse(JSON.stringify(aedes_history_packets)));
}

const removeElement = (clients, id) => {
   
    const  index_remove =  clients.findIndex(client => client.id === id )
    if (index_remove > -1) {
        clients.splice(index_remove, 1);
    }
}
const clearallclient = () =>{
    try{
        aedes_clients.map((client)=>{
            client.close()   //force disconnect client 
            return true
        })
    }catch(e){
        console.error('mqtt aedes clear client error')
    }
    
}
const handler_stopcommand =  async () =>{
    return new Promise((resolve,reject )=>{
        try{
            clearallclient()
            server.close()
            resolve( true)
        }catch(e){
            console.error('close server Error')
        }
    }).catch(e=>{
            console.error('close server Error')
    })
   
}
const  handler_startcommand = () =>{
    try{
        _mqtt_server_aedes_initial()
    }catch(e){
         console.error('mqtt start server Error')
    }
    return true
}
const handler_reconnect = async () =>{
    try{
      let _close_event =   await  handler_stopcommand()
      let _start_event =  handler_startcommand()
      return ( _close_event &  _start_event  )
    }catch(e){
         console.error('reconnect server Error')
    }
}
       

const _mqtt_server_aedes_initial = () => {
    const aedes = require('aedes')()
    server = require('net').createServer(aedes.handle)
    const port = PORT_MQTT_AEDES  


    server.listen(port, function () {
        console.log('MQTT server aedes ready port', port)
    })
    aedes.on('ready', function () {
        console.log('ready server')
    });
    aedes.on('error', function (error) {
        console.log('mqtt server', error)
    })
    aedes.on('client', function (client) {
        if(client && client.id){
            aedes_clients = [client , ...aedes_clients ]
        }
        //console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
    })

    aedes.on('clientDisconnect', (client) => {
        if(client && client.id){
            removeElement(aedes_clients, client.id)
        }
    });


    aedes.on('disconnect', function (client) {
        removeElement(aedes_clients, client.id)
        Apollo.updatemqttclients();
        //  console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
    })

    aedes.on('publish', async function (packet, client) {
          console.log('some one puclic', packet.topic )
            aedes_history_packets = [ packet , ...aedes_history_packets]
            if(aedes_history_packets.length > MAX_HISTORY_PACKET){
                aedes_history_packets.pop()
            }
            Apollo.updatehistorymqtt()
          if(client && client.id){
            mqtt_publich(packet,client)
           // console.log('Client \x1b[31m' + (client ? client.id : 'BROKER_' + aedes.id) + '\x1b[0m has published', packet.payload.toString(), 'on', packet.topic, 'to broker', aedes.id)
          }
    })
}






const MAX_HISTORY_PACKET = 50
let mosca_clients = []
let mosca_history_packets =[]
let _mqtt_mosca_server 
/**
   * 
   * @param {*} client is client id
   * @param {*} username is user client
   * @param {*} password is password client 
   * @param {*} callback  is call back to anthor function 
   */
const _mosca_clients = () =>{
  return (JSON.parse(JSON.stringify(mosca_clients)));
}
const _mosca_history_packets = () =>{
    return (JSON.parse(JSON.stringify(mosca_history_packets)));
}
const my_Authenticate = (client, username, password, callback) => {

    if (username !== undefined && password !== undefined) {
        console.log(`MQTT  id:${client.id}  , user :${username} , password : ${password.toString('ascii')}`);
        if (username === _mqtt_mosca_server.opts.user && password.toString('ascii') === _mqtt_mosca_server.opts.password) {
            // To authenticate
            callback(null, true);
        } else {
            // To reject
            callback(null, false);
        }
    } else {
        // To back list

    }
}
const _mqtt_server_mosca_initial = (port, user, password) => {
    let _mosca = require('mosca');   ///<<< npm install mosca --save

    _mqtt_mosca_server = _mosca.Server({
        port: port || PORT_MQTTT_MOSCA,
        host: `0.0.0.0`,
        user: user || "",
        password: password || "",
        // http: {
        //     port:  3800,
        //     bundle: true,
        //     static: './'
        //     },
    });

    _mqtt_mosca_server.on('ready', () => {
        console.log(`MQTT server Mosca   ready port ${_mqtt_mosca_server.opts.port}  is up and running`)

        if (user === undefined || password === undefined || this.user === "" || this.password === "") {
            console.log(`MQTT with out authenticate user password`)
        } else {
            _mqtt_mosca_server.authenticate = my_Authenticate;
        }
    });

    _mqtt_mosca_server.on('clientConnected', (client) => {
        mosca_clients = [...mosca_clients, client.id]
    });
    // Event when a message is received
    _mqtt_mosca_server.on('published', async (packet, client) => {
        mqtt_publich(packet,client)
        if(client && client.id){
            mosca_history_packets = [packet,...mosca_history_packets]
            if(mosca_history_packets.length > MAX_HISTORY_PACKET){
                mosca_history_packets.pop() // << remove last element  
            }
       
           
        }
    });

    _mqtt_mosca_server.on('subscribed', (topic, client) => {
        //  console.log(`client subscribed : ', ${client.id} subscribed : , ${topic}`);
    });

    _mqtt_mosca_server.on('clientDisconnecting', (client) => {
        console.log(`clientDisconnecting : , ${client.id}`);
    });

    _mqtt_mosca_server.on('clientDisconnected', function (client) {
        console.log('Client Disconnected:', client.id);
        removeElement(mosca_clients, client.id)
    });

}


exports.aedes_clients = _aedes_clients
exports.aedes_history_packets = _aedes_history_packets

exports.mqtt_server_aedes_initial = _mqtt_server_aedes_initial

exports.mosca_clients = _mosca_clients
exports.mosca_history_packets = _mosca_history_packets
exports.mqtt_server_mosca_initial = _mqtt_server_mosca_initial
