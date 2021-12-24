const  { db }  =  require( "../../../models/Address/Address");



const _Addressschema = 
`
type Address {
    id:String
    name:String
    tel:String
    no:String
    village:String
    road:String
    district:String
    alley:String
    boundary:String
    province:String
    code:String

}

input AddressInput{
    name:String
    tel:String
    no:String
    village:String
    road:String
    district:String
    alley:String
    boundary:String
    province:String
    code:String
}
`
const _Address_query =`
Addresss:[Address]
`
const _Address_mutation =`
addAddress(input:AddressInput):MessageCreate,
deleteAddress(id:ID):MessageDelete,
updateAddress(id:ID!,input:AddressInput):MessageUpdate,
`


const _Addressquery =async (filter) =>{
    
    try{
        
        let resulted =  await db.find(filter)
        let data = resulted.map(payload => payload._doc).map(payload => {
            payload.id = payload._id.toString()
            return (payload)
        })
        return (
            [...data ]
        )
    }catch (error){
        return error
    }
}
const _addAddress = async (payload , payload2)=> {
    console.log('add',payload2)
    
    if(payload === undefined && payload2){ payload = payload2 } 
    try {
        if(!payload){ return null }
        if(!payload.input){ return null}
        if( await db.count() == 0){
            let resulted = await  db.create(payload.input) 
            return resulted
        }
        if( await db.count() > 0){
            let id = await db.find()
            let  resulted = await db.updateOne({_id:id[0]._id},payload.input)
            return resulted
            
            
        }

    } catch (error) {
        return error
    }
}

const _updateAddress = async (payload , payload2) =>{
    console.log("2555555555555555558",await db.count())
    
    console.log('update' ,payload2)
    if(payload === undefined && payload2){ payload = payload2 } 
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

const _deleteAddress = async (payload,payload2) =>{
    
    
    if(payload === undefined && payload2){ payload = payload2 } 
    let id = await db.find()
    if(id === undefined){return null}

    try{
        
        let resulted = await db.deleteOne({_id:id[0]._id})
        return resulted
    }catch(error){
        return error
    }
}


exports.Address_query = _Address_query
exports.Address_mutation = _Address_mutation
exports.Addressschema = _Addressschema
exports.Addressquery = _Addressquery


exports.addAddress = _addAddress
exports.deleteAddress = _deleteAddress
exports.updateAddress = _updateAddress