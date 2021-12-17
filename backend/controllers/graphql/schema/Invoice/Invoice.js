

const  { db }  =  require( "../../../models/Invoice/Invoice");

 const _Invoiceschema = `

type Invoice {
    id:ID!
    duedateinvoice : String
  }

input InvoicInput {
    id:ID
    duedateinvoice:String 
  } 
  input InvoicUpdate {
    
    duedateinvoice:String
  } 

`

const _Invoicesschema_query =`
    Invoices :[Invoice]
`
const _Invoiceschema_mutation = `
    addInvoice(input:InvoicInput):MessageCreate!,
    updateInvoice(id:ID!,input:InvoicUpdate):MessageUpdate,
    deleteInvoice(id:ID!):MessageDelete
`
const _Invoices =async (filter) =>{
    try{
        let resulted =  await db.find(filter)
        let _Invoices = resulted.map(payload => payload._doc).map(payload => {
            payload.id = payload._id.toString()
            return (payload)
        })
        return (
            [..._Invoices ]
           )
    }catch (error){
        return error
    }
}

const _addInvoice = async (payload , payload2)=> {
    console.log('Create invoice ',payload2)
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
const _updateInvoice = async (payload ,payload2) =>{
    console.log('update invoice ',payload2)
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
const _deleteInvoice = async (payload,payload2) =>{
    console.log('delete invoice ',payload2)
    if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 
    try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}

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
















exports.Invoices  =_Invoices 

exports.addInvoice = _addInvoice

exports.deleteInvoice = _deleteInvoice

exports.updateInvoice = _updateInvoice

exports.Invoicesschema_query = _Invoicesschema_query
exports.Invoiceschema_mutation = _Invoiceschema_mutation


exports.Invoiceschema = _Invoiceschema