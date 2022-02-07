

const  { db }  =  require( "../../../models/Receipt/Receipt");

 const _Receiptschema = `
 input Receipt_listInput{
        name:String,
        price:String,
        number_item:String,
        vat:String,
        type_price:String,
        selectvat :String,
 }
type Receipt_list {
        id:ID
        name:String,
        price:String,
         number_item:String,
        vat:String,
        type_price:String,
        selectvat :String,
}
type Receipt {
    id:ID!
    docnumber:String,
    monthlybilling:Date,  
    duedate:Date,
    status:String,
    printstatus : String,
    note:String,
    lists:[Receipt_list]
    Invoice:Invoice
  }

input ReceiptInput {
    docnumber:String,
    monthlybilling:Date, 
    duedate:Date,
    status:String,
    printstatus : String,
    note:String,
    lists:[Receipt_listInput]
    invoiceid:String
  } 
`

const _Receiptschema_query =`
    Receipts :[Receipt]
    countReceipts : String 
    queryReceiptByid: Receipt
`
const _Receiptschema_mutation = `
    createReceipt(input:ReceiptInput):MessageCreate!,
    updateReceipt(id:ID!,input:ReceiptInput):MessageUpdate,
    updateReceiptlist(id:ID!,input:Receipt_listInput):MessageUpdate,
    deleteReceipt(id:ID!):MessageDelete
`

const _countReceipts = async (filter) =>{
     try{
            let resulted =  await db.find(filter).count()
            return resulted
     }catch(e){
         return null 
     }

}
const _queryReceiptByid = async(payload ,payload2) =>{
    if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 

    try {
        if(!payload){ return null }
        if(!payload.id){ return null }
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return "Error Format ID"}
        let resulted = await db.findById({_id:payload.id})
        if(!resulted) { return null}

        if(resulted.invoiceid){
            resulted.Invoice = await require (`../Invoice/Invoice`).queryInvoiceByid({id : resulted.invoiceid } )
        }

        return (
            resulted
        )
    } catch (error) {
        return error
    }
}

const _Receipts =async (filter) =>{
    try{
        let resulted =  await db.find(filter)
        let _datas =  await Promise.all( resulted.map(payload => payload._doc).map( async payload => {
            if(payload){
                payload.id = payload._id.toString()
                let _invoice = await require (`../Invoice/Invoice`).queryInvoiceByid({id:payload.invoiceid})
                payload.Invoice  = _invoice

                return payload
            }else{
                return null 
            }
          
        }) )
        return (
            [..._datas ]
           )
    }catch (error){
        return error
    }
}

const _createReceipt = async (payload , payload2)=> {
    console.log('Create Receipt ',payload2)
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
const _updateReceiptlist = async (payload ,payload2) =>{
        if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 
    try{
        if(!payload){return null}
        if(!payload.id){return null}
        if(!payload.input){return null}
        if(!payload.id.match(/^[0-9a-fA-F]{24}$/)) { return null }
        let  resulted  = await db.findOne({"lists._id": payload.id},function (err, item) {
           item.lists =  item.lists.map( list => {
               console.log('list.id',list.id)
                if(list.id === payload.id){
                    
                   list = payload.input
                   list._id = payload.id
                }
                return list
            })
            item.save()
        })

        return resulted
    }catch(error){
        return error
    }
}
const _updateReceipt = async (payload ,payload2) =>{
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
const _deleteReceipt = async (payload,payload2) =>{
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













exports.countReceipts = _countReceipts


exports.Receipts  =_Receipts 
exports.queryReceiptByid = _queryReceiptByid

exports.createReceipt = _createReceipt

exports.deleteReceipt = _deleteReceipt

exports.updateReceipt = _updateReceipt
exports.updateReceiptlist = _updateReceiptlist

exports.Receiptschema_query = _Receiptschema_query
exports.Receiptschema_mutation = _Receiptschema_mutation


exports.Receiptschema = _Receiptschema