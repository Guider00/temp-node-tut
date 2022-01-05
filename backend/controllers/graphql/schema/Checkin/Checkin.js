const  { db }  =  require( "../../../models/Checkin/Checkin");

const _Checkinschema = 
`
input CheckinoptionInput{
   
    name:String,
    price:String,
}
type Checkinoption{
    id:String,
    name:String,
    price:String,
}
type Checkin{
    id:String
    id_contact:String
    checkin_type:String 
    rent_time:String
    number_day_rent:String
    branch:String
    Checkinoption:[Checkinoption]
}

input CheckinInput{
    id_contact:String
    checkin_type:String 
    rent_time:String
    number_day_rent:String
    branch:String
    Checkinoption:[CheckinoptionInput]
}
`
const _Checkinschema_query =`
    Checkins :[Checkin]
    CheckinByid:Checkin
    countCheckins : String 
`
const _Checkinschema_mutation = `
    createCheckin(input:CheckinInput):MessageCreate!,
    updateCheckin(id:ID!,input:CheckinInput):MessageUpdate,
    deleteCheckin(id:ID!):MessageDelete
`




const _countCheckins = async (filter) =>{
     try{
            let resulted =  await db.find(filter).count()
            return resulted
     }catch(e){
         return null 
     }

}
const _CheckinByid = async (payload , payload2) =>{
  try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}
        let resulted = await db.findById({_id:payload.id})
        if(!resulted) { return null}
        
        let data  = resulted._doc
        return (data)
    } catch (error) {
        return error
    }
}
const _Checkins=async (filter) =>{
    try{
        let resulted =  await db.find(filter)
       
        return (
            [...resulted ]
           )
    }catch (error){
        return error
    }
}

const _createCheckin = async (payload , payload2)=> {
    console.log('Create Checkin ',payload2)
     if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 
    try {
        if(!payload){ return null }
        if(!payload.input){ return null }
       let resulted = await  db.create(payload.input) // findOrCreate(dbroomprice, {}, data)
        return resulted
    } catch (error) {
        return error
    }
}
const _updateCheckin = async (payload ,payload2) =>{
    console.log('update Checkin ',payload2)
    if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 
    try{
        if(!payload){return null}
        if(!payload.id){return null}
        if(!payload.input){return null}
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return null }

        let  resulted = await db.updateOne({_id:payload.id},payload.input)
        return resulted
    }catch(error){
        return error
    }
}
const _deleteCheckin = async (payload,payload2) =>{
    console.log('delete Checkin ',payload2)
    if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 
    try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return {errors:"Error Format ID"} }

        let  resulted = await db.deleteOne({_id:payload.id})
  
        if(resulted && resulted.nModified === 0 ){
              return null // << system not found  id member modified 
        }else{
            return resulted
        }
    
    }catch (error){
        return null
    }
}



exports.countCheckins = _countCheckins

exports.CheckinByid = _CheckinByid
exports.Checkins  =_Checkins

exports.createCheckin = _createCheckin

exports.deleteCheckin = _deleteCheckin

exports.updateCheckin = _updateCheckin

exports.Checkinschema_query = _Checkinschema_query
exports.Checkinschema_mutation = _Checkinschema_mutation


exports.Checkinschema = _Checkinschema