const  { db }  =  require( "../../../models/CreateInvoice/CreateInvoice");

const _CreateInvoiceschema = 
`
type CreateInvoice {
    id:String
    bill_exp:String
    date_exp:String
    rent_price:String
    building:String
    floor:String
    room_type:String
    name_room:String
    type_rent:String
    round_bill:String

}

input CreateInvoiceInput{
    building:String
    floor:String
    room_type:String
    name_room:String
    type_rent:String
    bill_exp:String
    date_exp:String
    rent_price:String
    round_bill:String
}
`

const _CreateInvoicesschema_query =`
CreateInvoices :[CreateInvoice]
`
const _CreateInvoice_mutation =`
addCreateInvoice(input:CreateInvoiceInput):MessageCreate,
deleteCreateInvoice(id:ID!):MessageDelete,
updateCreateInvoice(id:ID!,input:CreateInvoiceInput):MessageUpdate,
`

const _CreateInvoicequery =async (filter) =>{
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


const _addCreateInvoice = async (payload , payload2)=> {
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

const _updateCreateInvoice = async (payload , payload2) =>{
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




const _deleteCreateInvoice = async (payload,payload2) =>{
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


exports.addCreateInvoice = _addCreateInvoice
exports.CreateInvoicesschema_query = _CreateInvoicesschema_query
exports.CreateInvoice_mutation = _CreateInvoice_mutation
exports.CreateInvoiceschema = _CreateInvoiceschema
exports.CreateInvoicequery = _CreateInvoicequery
exports.deleteCreateInvoice = _deleteCreateInvoice
exports.updateCreateInvoice = _updateCreateInvoice