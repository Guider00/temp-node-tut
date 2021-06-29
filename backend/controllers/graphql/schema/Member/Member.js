const  {  db  }  = require('../../../models/Member/Member')

const _Memberschema = `
input MemberInput {
   name:  String ,
   lastname: String,
   personalid : String,
   tel: String
 }
 type Member {
   id: String,
   name: String,
   lastname: String,
   personalid : String,
   tel: String
 }
       `
const _queryMemberByid = async(payload) =>{
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
const _updateMember = async( payload ) =>{
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
const _deleteMember = async( payload ) =>{
    try{
        if(!payload){return null}
        if(!payload.id){return null}
        let resulted = await db.deleteOne({_id:payload.id})
         return resulted
     }catch(error){
         return error
     }
}
const _createMember = async( payload ) =>{
    try {
        if(payload && payload.input ) {
            let resulted = await  db.create(payload.input) 
            if(!resulted) { return null}
            let data  = resulted._doc
            return {
                id:data._id.toString() ,
                name:  data.name ,
                lastname : data.lastname,
                tel  : data.tel,
                personalid : data.personalid
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