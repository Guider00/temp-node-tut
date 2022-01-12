const  {  db  }  = require('../../../models/Member/Member')

const _Memberschema = `
input MemberInput {
   name:  String ,
   lastname: String,
   personalid : String,
   taxnumber:String,
   address : String,
   email :String
   tel: String,
   carid : String,
   note : String
 }
 type Member {
   id: String,
   name: String,
   lastname: String,
   personalid : String,
   taxnumber:String,
   address : String,
   tel: String,
   email :  String,
   carid : String,
   note : String
 }
       `

const _Memberschema_query =`
    MemberByid(id:ID!):Member,
    Members:[Member],
`
const _Memberschema_mutation =`
    createMember(input: MemberInput):MessageCreate,
    updateMember(id: ID!,input :MemberInput):MessageUpdate,
    deleteMember(id: ID!): MessageDelete
`
const _queryMemberByid = async(payload ,payload2) =>{
    if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 

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
const _queryMembers = async() =>{
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
const _updateMember = async( payload ,payload2) =>{
    if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 

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
const _deleteMember = async( payload ,payload2 ) =>{
    if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 

    try{
        if(!payload){return null}
        if(!payload.id){return null}
        let resulted = await db.deleteOne({_id:payload.id})
         return resulted
     }catch(error){
         return error
     }
}
const _createMember = async( payload , payload2 ) =>{
    if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 

    try {
        if(payload && payload.input ) {
            let resulted = await  db.create(payload.input) 
            if(!resulted) { return null}
            let data  = resulted._doc
            return {
                id:data._id.toString() ,
                name:  data.name ,
                lastname : data.lastname,
                personalid : data.personalid,
                taxnumber:data.taxnumber,
                address : data.address,
                tel  : data.tel,
                email: data.email,
                carid: data.carid,
                note : data.note
            }
            
         }else{
            return null
         }
     } catch (error) {
       return error
     }
}

exports.queryMemberByid = _queryMemberByid
exports.queryMembers    = _queryMembers
exports.updateMember    = _updateMember
exports.deleteMember    = _deleteMember
exports.createMember    = _createMember
exports.Memberschema    = _Memberschema
exports.Memberschema_query = _Memberschema_query
exports.Memberschema_mutation = _Memberschema_mutation