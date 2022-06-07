const  {  db  }  = require('../../../models/MeterRoom/MeterRoom')
const { queryPortmeterByid } = require('../PortMeter/Portmeter')
const _MeterRoomschema = `

input MeterRoomwaterInput {
    inmemory_water: String!,
    inmemory_water_date: String!,
    inmemory_finished_water: String!,
    inmemory_finished_water_date :String!,
 }

input MeterRoomkwhInput {
    inmemory_kwh: String!,
    inmemory_kwh_date: String!,
    inmemory_finished_kwh: String!,
    inmemory_finished_kwh_date :String!,
 }

input MeterRoomInput {
    name :String,
    portmeter: String,
    device_address: String,
    device_model : String,

    inmemory_kwh: String,
    inmemory_kwh_date: String,
    inmemory_finished_kwh: String,
    inmemory_finished_kwh_date :String,
    realtime_kwh: String,

    inmemory_water: String,
    inmemory_water_date: String,
    inmemory_finished_water: String,
    inmemory_finished_water_date :String,
    realtime_water:String,

    deveui:String,
    appeui:String,
    appkey:String,

    version: String
 }
 type MeterRoom {
    id: String,
    name :String,
    portmeter: Portmeter,
    device_model : String,
    device_address: String,

    inmemory_kwh: String,
    inmemory_kwh_date: String,
    inmemory_finished_kwh: String,
    inmemory_finished_kwh_date :String,
    realtime_kwh: String,

    inmemory_water: String,
    inmemory_water_date: String,
    inmemory_finished_water: String,
    inmemory_finished_water_date :String,
    realtime_water:String,
    
    deveui:String,
    appeui:String,
    appkey:String,

    index:String,

    version: String
 }
       `

const _MeterRoomschema_query =`
    MeterRooms :[MeterRoom],
    queryMeterRoomByid: MeterRoom
`

const _MeterRoomschema_mutation =`
    createMeterRoom(input:MeterRoomInput):MessageCreate!,
    updateMeterRoom(id:ID!,input:MeterRoomInput):MessageUpdate,
    deleteMeterRoom(id:ID!):MessageDelete
`

/*
const _MoveMeterRoom_query =`
    MeterRooms :[MeterRoom]
    queryMoveMeterRoom: MeterRoom
`
*/

const _queryMeterRoomByid = async (payload) =>{
    try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}
        let resulted = await db.findById({_id:payload.id})
        if(!resulted) { return null}
        
        let data  = resulted._doc
        data.id = payload.id
        data.portmeter  = await queryPortmeterByid({id:data.portmeter })

        return (data)
    } catch (error) {
        return error
    }
}
const _MeterRooms = async () => {
    try {
        let resulted = await db.find({})
        let data = await Promise.all( resulted.map(payload => payload._doc).map( async (payload) => {
            payload.id = payload._id.toString()
            payload.portmeter  = await queryPortmeterByid({id:payload.portmeter })
            return (payload)
        }) )
        return (
            [...data]
        )
    } catch (error) {
        return error
    }
}
const _createMeterRoom = async (payload) => {
    try {
        if (payload && payload.input) {
            let resulted = await db.create(payload.input)
            if (!resulted) { return null }
            return  resulted
        } else {
            return null
        }
    } catch (error) {
        return error
    }
}
const _deleteMeterRoom = async (payload) => {
    try {
        if (!payload) { return null }
        if (!payload.id) { return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}

        let resulted = await db.deleteOne({ _id: payload.id })
        return resulted
    } catch (error) {
        return error
    }
}
const _updateMeterRoom = async (payload) => {
    try {
        if (!payload) { return null }
        if (!payload.id) { return null }
        if (!payload.input) { return null }
        if (!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}
        let resulted = await db.updateOne({ _id: payload.id }, payload.input)
        return resulted
    } catch (error) {
        return error
    }
}
const _updateMeterRoomkwh = async (payload) => {
    try {
        if (!payload) { return null }
        if (!payload.id) { return null }
        if (!payload.input) { return null }
        if (!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}
        let resulted = await db.updateOne({ _id: payload.id }, payload.input)
        return resulted
    } catch (error) {
        return error
    }
}
const _updateMeterRoomwater = async (payload) => {
    try {
        if (!payload) { return null }
        if (!payload.id) { return null }
        if (!payload.input) { return null }
        if (!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}
        let resulted = await db.updateOne({ _id: payload.id }, payload.input)
        return resulted
    } catch (error) {
        return error
    }
}

/*
const _MoveMeterRoom = async (payload) => {
    try {
        if (!payload) { return null }
        if (!payload.id) { return null }
        if (!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}
        let resulted = await db.updateOne({ _id: payload.id }, payload.input)
        return resulted
    } catch (error) {
        return error
    }
}
*/




exports.queryMeterRoomByid      = _queryMeterRoomByid
exports.MeterRooms         = _MeterRooms




exports.updateMeterRoomkwh      = _updateMeterRoomkwh
exports.updateMeterRoomwater    = _updateMeterRoomwater

exports.updateMeterRoom         = _updateMeterRoom
exports.deleteMeterRoom         = _deleteMeterRoom
exports.createMeterRoom         = _createMeterRoom


exports.MeterRoomschema_query   = _MeterRoomschema_query
exports.MeterRoomschema_mutation = _MeterRoomschema_mutation

exports.MeterRoomschema         = _MeterRoomschema

//export.MoveMeterRoom     = _MoveMeterRoom


