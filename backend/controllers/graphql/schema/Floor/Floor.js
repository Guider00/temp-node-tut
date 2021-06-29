const { db } = require('../../../models/Floor/Floor')
const { queryBuildingByid } = require('../Building/Building')
const _Floorschema = `
input FloorInput {
   name:  String ,
   building : String,
 }
 type Floor {
   id: String,
   name:  String ,
   building : Building
 }
       `

const _queryFloorByid = async (payload) =>{
    try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}
        let resulted = await db.findById({_id:payload.id})
        if(!resulted) { return null}
        
        let data  = resulted._doc
        return ({
            id : data._id,
            name: data.name,
            building: await queryBuildingByid({id:data.building})
        })
    } catch (error) {
        return error
    }
}
const _queryFloor = async () => {
    try {
        let resulted = await db.find({})

        let data = resulted.map(payload => payload._doc).map( async (payload) => {
            payload.id = payload._id.toString()
            payload.building =  await queryBuildingByid({id:payload.building})
            return (payload)
        })
        return (
            [...data]
        )
    } catch (error) {
        return error
    }
}
const _createFloor = async (payload) => {
    try {
        if (payload && payload.input) {
            let resulted = await db.create(payload.input)
            if (!resulted) { return null }
            let data = resulted._doc
            return {
                id: data._id.toString(),
                name: data.name,
                building : await queryBuildingByid({id:data.building})
            }

        } else {
            return null
        }
    } catch (error) {
        return error
    }
}
const _deleteFloor = async (payload) => {
    try {
        if (!payload) { return null }
        if (!payload.id) { return null }
        let resulted = await db.deleteOne({ _id: payload.id })
        return resulted
    } catch (error) {
        return error
    }
}
const _updateFloor = async (payload) => {
    try {
        if (!payload) { return null }
        if (!payload.id) { return null }
        if (!payload.input) { return null }
        let resulted = await db.updateOne({ _id: payload.id }, payload.input)
        return resulted
    } catch (error) {
        return error
    }
}

exports.queryFloorByid = _queryFloorByid
exports.queryFloor = _queryFloor
exports.updateFloor = _updateFloor
exports.deleteFloor= _deleteFloor
exports.createFloor = _createFloor
exports.Floorschema = _Floorschema