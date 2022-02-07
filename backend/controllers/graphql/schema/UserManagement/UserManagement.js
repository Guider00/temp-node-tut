const  { db }  =  require( "../../../models/UserManegement/UserManegement");

const _UserManagementchema = 
`
type UserManagement {
    id:String
    passWord:String
    name:String
    level:String

    

}

input UserManagementInput{
    passWord:String
    name:String
    level:String

}
`

const _UserManagementschema_query =`
UserManagements :[UserManagement]
`
const _UserManagement_mutation =`
addUserManagement(input:UserManagementInput):MessageCreate,
deleteUserManagement(id:ID!):MessageDelete,
updateUserManagement(id:ID!,input:UserManagementInput):MessageUpdate,
`

const _UserManagementquery =async (filter) =>{
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


const _addUserManagement = async (payload , payload2)=> {
    console.log('add',payload2)
     if(payload === undefined && payload2){ payload = payload2 } 
    try {
        if(!payload){ return null }
        if(!payload.input){ return null }
       let resulted = await  db.create(payload.input) 
        return resulted
    } catch (error) {
        return error
    }
}

const _updateUserManagement = async (payload , payload2) =>{
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




const _deleteUserManagement = async (payload,payload2) =>{
    if(payload === undefined && payload2){ payload = payload2 } 

    try{
        if(!payload){return null}
        if(!payload.id){return null}
        let resulted = await db.deleteOne({_id:payload.id})
        return resulted
    }catch(error){
        return error
    }
}


exports.addUserManagement = _addUserManagement
exports.deleteUserManagement = _deleteUserManagement
exports.updateUserManagement = _updateUserManagement


exports.UserManagementschema_query = _UserManagementschema_query
exports.UserManagement_mutation = _UserManagement_mutation
exports.UserManagementchema = _UserManagementchema
exports.UserManagementquery = _UserManagementquery
