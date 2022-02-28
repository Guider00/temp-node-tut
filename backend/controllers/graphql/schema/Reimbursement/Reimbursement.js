

const  { db }  =  require( "../../../models/Reimbursement/Reimbursement");

 const _Reimbursementschema = `

type Reimbursement {
    id:ID,
    cashback_date:String,
    status:String,
    cashback:String,
    Invoice:Invoice,
    Contract:Contract
  }

input ReimbursementInput {
       id:ID,
       cashback_date:String,
       status:String,
       cashback:String,
       invoiceid:String
       contractid:String
  } 
`

const _Reimbursementschema_query =`
    Reimbursements :[Reimbursement]
    queryReimbursementByid: Reimbursement
`
const _Reimbursementschema_mutation = `
    createReimbursement(input:ReimbursementInput):MessageCreate!,
    updateReimbursement(id:ID!,input:ReimbursementInput):MessageUpdate,
    deleteReimbursement(id:ID!):MessageDelete
`

const _countReimbursements = async (filter) =>{
     try{
            let resulted =  await db.find(filter).count()
            return resulted
     }catch(e){
         return null 
     }

}
const _queryReimbursementByid = async(payload ,payload2) =>{
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
        if(resulted.contractid){
         //    resulted.Contract = await require (`../Contract/Contract`).queryContractdetailsByid({id : resulted.contractid } )
         resulted.Contract = await require (`../Contract/Contract`).queryContractByid({id : resulted.contractid } )
        }

        return (
            resulted
        )
    } catch (error) {
        return error
    }
}

const _Reimbursements =async (filter) =>{
    try{
        let resulted =  await db.find(filter)
        let _datas =  await Promise.all( resulted.map(payload => payload._doc).map( async payload => {
            if(payload){
                payload.id = payload._id.toString()
                payload.Invoice  = await require (`../Invoice/Invoice`).queryInvoiceByid({id:payload.invoiceid})
                payload.Contract = await require (`../Contract/Contract`).queryContractByid({id:payload.contractid})

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

const _createReimbursement = async (payload , payload2)=> {
    console.log('Create Reimbursement ',payload2)
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

const _updateReimbursement = async (payload ,payload2) =>{
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
const _deleteReimbursement = async (payload,payload2) =>{
    console.log('delete Reimbursement ',payload2)
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













exports.countReceipts = _countReimbursements


exports.Reimbursements  =_Reimbursements 
exports.queryReimbursementByid = _queryReimbursementByid

exports.createReimbursement = _createReimbursement

exports.deleteReimbursement = _deleteReimbursement

exports.updateReimbursement = _updateReimbursement


exports.Reimbursementschema_query = _Reimbursementschema_query
exports.Reimbursementschema_mutation = _Reimbursementschema_mutation


exports.Reimbursementschema = _Reimbursementschema