

const  { db }  =  require( "../../../models/Invoice/Invoice");

 const _Invoiceschema = `

type Invoice {
    id:ID!
    duedateinvoice : String
  }

input InvoicInput {
    duedateinvoice:String 
  } 
`

const _Invoicesschema_query =`
    Invoices :[Invoice]
`
const _Invoiceschema_mutation = `
    addInvoice(input:InvoicInput): MessageCreate!
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


exports.Invoices  =_Invoices 
exports.addInvoice = _addInvoice

exports.Invoicesschema_query = _Invoicesschema_query
exports.Invoiceschema_mutation = _Invoiceschema_mutation


exports.Invoiceschema = _Invoiceschema