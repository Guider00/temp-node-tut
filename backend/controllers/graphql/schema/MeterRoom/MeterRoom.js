const  {  db  }  = require('../../../models/MeterRoom/MeterRoom')
const queryPortByid = require('../PortMeter/Portmeter')
const _MeterRoomschema = `
input MeterRoomInput {
    name :String,
    port : String ,
    device_address: String,
    inmemory_kwh: String,
    inmemory_kwh_date: String,
    realtime_kwh: String,
    inmemory_water: String,
    inmemory_water_date: String,
    realtime_water:String,
    device_model : String,
    version: String
 }
 type MeterRoom {
    id: String,
    name :String,
    port : String ,
    device_address: String,
    inmemory_kwh: String,
    inmemory_kwh_date: String,
    realtime_kwh: String,
    inmemory_water: String,
    inmemory_water_date: String,
    realtime_water:String,
    device_model : String,
    version: String
 }
       `

const _queryMeterRoomByid = async (payload) =>{
    try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}
        let resulted = await db.findById({_id:payload.id})
        if(!resulted) { return null}
        
        let data  = resulted._doc
        data.id = data._id
        data.port = await queryPortByid({id:data.building})
        return (data)
    } catch (error) {
        return error
    }
}
const _queryMeterRooms = async () => {
    try {
        let resulted = await db.find({})
        let data = resulted.map(payload => payload._doc).map( async (payload) => {
            payload.id = payload._id.toString()
            payload.port =  await queryPortByid({id:data.building})
            return (payload)
        })
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


exports.queryMeterRoomByid = _queryMeterRoomByid
exports.queryMeterRooms    = _queryMeterRooms
exports.updateMeterRoom    = _updateMeterRoom
exports.deleteMeterRoom    = _deleteMeterRoom
exports.createMeterRoom    = _createMeterRoom
exports.MeterRoomschema    = _MeterRoomschema

