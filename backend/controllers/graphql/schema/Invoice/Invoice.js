

const  { db }  =  require( "../../../models/Invoice/Invoice");


 const _Invoiceschema = `
 scalar Date
input Invoice_listInput{
        name:String,
        price:String,
        vat:String,
        number_item:String,
        type_price:String,
        selectvat :String,
}
type Invoice_list {
        id:ID
        name:String,
        price:String,
        number_item:String,
        vat:String,
        type_price:String,
        selectvat :String,
}

type Invoice {
    id:ID!
    docnumber:String
    duedateinvoice : Date
    monthlybilling : Date,
    printstatus : String ,
    status : String,
    lists:[Invoice_list]
    Room:Room
    customer:Customer
  
  }
type Customer{
        name:  String
        lastname: String 
        personalid: String
        taxnumber : String 
        address : String
        tel:  String
        email: String
}
input CustomerInput{
        name:  String
        lastname: String 
        personalid: String
        taxnumber : String 
        address : String
        tel:  String
        email: String
}

input InvoicInput {
    id:ID
    docnumber:String,
    duedateinvoice:Date, 
    monthlybilling : Date,
    printstatus : String ,
    status : String,
    roomid: String,
    lists:[Invoice_listInput],
    customer:CustomerInput

  } 
`

const _Invoicesschema_query =`
    Invoices :[Invoice]
    countInvoices : String 
    queryInvoiceByid :Invoice
`
const _Invoiceschema_mutation = `
    addInvoice(input:InvoicInput):MessageCreate!,
    updateInvoice(id:ID!,input:InvoicInput):MessageUpdate,
    deleteInvoice(id:ID!):MessageDelete
`

const _countInvoices = async (filter) =>{
     try{
            let resulted =  await db.find(filter).count()
            return resulted
     }catch(e){
         return null 
     }

}

const _queryInvoiceByid_raw = async (payload) =>{
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

const _queryInvoicedetailsByid = async(payload ,payload2) =>{
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


const _queryInvoiceByid = async(payload ,payload2) =>{
    if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 

    try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}
        let resulted = await db.findById({_id:payload.id})
        if(!resulted) { return null}
        if(resulted.roomid ){
            resulted.Room = await require (`../Room/Room`).queryRoomByid ({id : resulted.roomid } )
        }
        return (
            resulted
        )
    } catch (error) {
        return error
    }
}
const _Invoices =async (filter) =>{
    try{
        let resulted =  await db.find(filter)
        let _Invoices =  await Promise.all( resulted.map(payload => payload._doc).map( async payload => {
            if(payload){
                payload.id = payload._id.toString()
                if(payload.roomid){
                    try{
                        payload.Room = await require("../Room/Room").queryRoomByid( {id : payload.roomid })
                        return (payload)
                    }catch(e){
                        return null 
                    }
                }
                return payload
            }else{
                return null 
            }
          
        }) )
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
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return null }

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












exports.queryInvoiceByid_raw = _queryInvoiceByid_raw
exports.countInvoices = _countInvoices


exports.Invoices  =_Invoices 
exports.queryInvoiceByid = _queryInvoiceByid
exports.queryInvoicedetailsByid = _queryInvoicedetailsByid


exports.addInvoice = _addInvoice

exports.deleteInvoice = _deleteInvoice

exports.updateInvoice = _updateInvoice

exports.Invoicesschema_query = _Invoicesschema_query
exports.Invoiceschema_mutation = _Invoiceschema_mutation


exports.Invoiceschema = _Invoiceschema