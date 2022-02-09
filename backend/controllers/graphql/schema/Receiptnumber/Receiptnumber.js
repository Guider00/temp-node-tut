const  { db }  =  require( "../../../models/Receiptnumber/Receiptnumber");

const _Receiptnumberschema = `

type Receiptnumber{
    id:String
    receipt_number: String
    invoice_number: String
    reimbursement_number: String
    booking_number: String
    bill_number:String
    account_number:String
    bill_date:String
    bill_end:String


}
input ReceiptnumberInput{
    receipt_number: String
    invoice_number: String
    reimbursement_number: String
    booking_number: String
    bill_number:String
    account_number:String
    bill_date:String
    bill_end:String


}

`

const _Receiptnumber_query = `
Receiptnumbers:[Receiptnumber]

`
const _Receiptnumber_mutation =`
addReceiptnumber(input:ReceiptnumberInput):MessageCreate,
deleteReceiptnumber(id:ID):MessageDelete,
updateReceiptnumber(id:ID!,input:AddressInput):MessageUpdate,
`

const _Receiptnumberquery =async (filter) =>{
    
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

const _addReceiptnumber = async (payload , payload2)=> {
    console.log('add',payload2)
    
    if(payload === undefined && payload2){ payload = payload2 } 
    try {
        if(!payload){ return null }
        if(!payload.input){ return null}
        if( await db.count() == 0){
            let resulted = await  db.create(payload.input) 
            return resulted
        }
        if( await db.count() > 0){
            let id = await db.find()
            let  resulted = await db.updateOne({_id:id[0]._id},payload.input)
            return resulted
            
            
        }

    } catch (error) {
        return error
    }
}

const _updateReceiptnumber = async (payload , payload2) =>{
    console.log("2555555555555555558",await db.count())
    
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

const _deleteReceiptnumber = async (payload,payload2) =>{
    
    
    if(payload === undefined && payload2){ payload = payload2 } 
    let id = await db.find()
    if(id === undefined){return null}

    try{
        
        let resulted = await db.deleteOne({_id:id[0]._id})
        return resulted
    }catch(error){
        return error
    }
}

exports.Receiptnumber_query = _Receiptnumber_query
exports.Receiptnumber_mutation = _Receiptnumber_mutation
exports.Receiptnumberschema = _Receiptnumberschema
exports.Receiptnumberquery = _Receiptnumberquery


exports.addReceiptnumber = _addReceiptnumber
exports.deleteReceiptnumber = _deleteReceiptnumber
exports.updateReceiptnumber = _updateReceiptnumber