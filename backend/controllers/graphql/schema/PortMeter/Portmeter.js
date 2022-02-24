const { db } = require('../../../models/Port_Meter/Port_Meter')

const _Portmeterschema = `
input PortmeterInput {
    name: String,
    protocol :  String ,
    comport : String,
    baudrate :  String ,
    readtimeout : String ,
    writetimeout : String ,
    stopbits : String,
    databits : String ,
    autoreconnect : String ,
    ipaddress : String,
    tcp_port: String,
    topic : String,
    version:  String
 }
 type Portmeter {
    id : String,
    name: String,
    protocol : String,
    comport :  String,
    baudrate : String,
    readtimeout : String,
    writetimeout : String ,
    stopbits :  String,
    databits : String ,
    autoreconnect :  String ,
    ipaddress :  String,
    tcp_port: String,
    topic : String ,
    version: String
 }
       `
const _Portmeter_query =`
    Portmeters :[Portmeter]
    queryPortmeterByid: Portmeter
`
const _Portmeter_mutation = `
    createPortmeter(input:PortmeterInput):MessageCreate!,
    updatePortmeter(id:ID!,input:PortmeterInput):MessageUpdate,
    deletePortmeter(id:ID!):MessageDelete
`

const _createPortmeter = async (payload) => {
    try {
        if (payload && payload.input) {
            let resulted = await db.create(payload.input)
            if (!resulted) { return null }
            console.log('Create port ',resulted)
            return resulted
        } else {
            return null
        }
    } catch (error) {
        return error
    }
}

const _Portmeters = async() =>{
    try {
        let estimatedDocumentCount = await db.estimatedDocumentCount();
        let resulted = await db.find({})
        let data = resulted.map(payload => payload._doc).map(payload => {
            payload.id = payload._id.toString()
            return (payload)
        })
        return (
            [...data]
        )
    } catch (error) {
        return error
    }
}
const _updatePortmeter = async( payload ) =>{
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
const _deletePortmeter = async( payload ) =>{
    try{
        if(!payload){return null}
        if(!payload.id){return null}
        let resulted = await db.deleteOne({_id:payload.id})
         return resulted
     }catch(error){
         return error
     }
}
const _queryPortmeterByid = async(payload) =>{
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


exports.queryPortmeterByid = _queryPortmeterByid
exports.Portmeters    = _Portmeters
exports.updatePortmeter    = _updatePortmeter
exports.deletePortmeter    = _deletePortmeter
exports.createPortmeter    = _createPortmeter

exports.Portmeterschema_query = _Portmeter_query
exports.Portmeterschema_mutation = _Portmeter_mutation

exports.Portmeterschema    = _Portmeterschema


