const  {  db  }  = require('../../../models/Note/Note')
const { queryRoomByid } = require('../Room/Room')

const _Noteschema = `
input NoteInput {

   record_date :String,
   event_date:String,
   room:String,
   topic:String,
   message :String

 }
 type Note {
   id: String,
   record_date :String,
   event_date:String,
   room:Room,
   topic:String,
   message :String
 }
       `
const _queryNoteByid = async(payload) =>{
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
const _queryNotes = async() =>{
    try {
        let resulted = await db.find({})

        let data = resulted.map(payload => payload._doc).map( async (payload) => {
            payload.id = payload._id.toString()
            payload.room =  await queryRoomByid({id:payload.room})
            if(payload.room.message){
                payload.room = ""
            }
             
        
        

     
            return (payload)
        })
        return (
            [...data]
        )
    } catch (error) {
        return error
    }
}
const _updateNote = async( payload ) =>{
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
const _deleteNote = async( payload ) =>{
    try{
        if(!payload){return null}
        if(!payload.id){return null}
        let resulted = await db.deleteOne({_id:payload.id})
         return resulted
     }catch(error){
         return error
     }
}
const _createNote = async( payload ) =>{
    try {
        if(payload && payload.input ) {
            let resulted = await  db.create(payload.input) 
            if(!resulted) { return null}
            let data  = resulted._doc
            return {
                id:data._id.toString() ,
                record_date :data.record_date,
                event_date :data.event_date,
                room:data.room,
                message: data.message,
            }
         }else{
            return null
         }
     } catch (error) {
       return error
     }
}

exports.queryNoteByid = _queryNoteByid
exports.queryNotes    = _queryNotes
exports.updateNote    = _updateNote
exports.deleteNote    = _deleteNote
exports.createNote    = _createNote
exports.Noteschema    = _Noteschema