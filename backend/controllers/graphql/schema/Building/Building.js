const { db } = require('../../../models/Building/Building')

const _Buildingschema = `
input BuildingInput {
   name:  String ,
 }
 type Building {
   id: String,
   name:  String ,
 }
       `


const _queryBuildingByid = async(payload) =>{
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
const _queryBuilding = async () => {
    try {
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
const _createBuilding = async ( payload ) =>{
    try {
        if(payload && payload.input ) {
            let resulted = await  db.create(payload.input) 
            if(!resulted) { return null}
            let data  = resulted._doc
            return {
                id:data._id.toString() ,
                name:  data.name ,
            }
            
         }else{
            return null
         }
     } catch (error) {
       return error
     }
}
const _deleteBuilding = async (payload ) =>{
    try{
        if(!payload){return null}
        if(!payload.id){return null}
        let resulted = await db.deleteOne({_id:payload.id})
         return resulted
     }catch(error){
         return error
     }
}
const _updateBuilding = async (payload ) =>{
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

exports.queryBuildingByid = _queryBuildingByid
exports.queryBuilding = _queryBuilding
exports.updateBuilding  = _updateBuilding
exports.deleteBuilding  = _deleteBuilding
exports.createBuilding = _createBuilding
exports.Buildingschema = _Buildingschema
