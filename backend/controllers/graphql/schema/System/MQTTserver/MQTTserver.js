

 const {aedes_clients , aedes_history_packets , mosca_clients,mosca_history_packets }   = require('../../../../../MQTT/server/index')


const _MQTTServerschema = `

type MQTTServerstatus {
 clients:[String],
 numberclient: String

 errors:String
}
   `
const  getClients = () =>{
    return  ( [...aedes_clients() , ...mosca_clients() ] )
}



const _queryMQTTServerstatus = async () => {
    try {
      let clients  = getClients()
  
      return {clients : clients  ,numberclient:clients.length }
    } catch (error) {
      return {errors:error}
    }
  }
  exports.MQTTServerschema = _MQTTServerschema
  exports.queryMQTTServerstatus  = _queryMQTTServerstatus