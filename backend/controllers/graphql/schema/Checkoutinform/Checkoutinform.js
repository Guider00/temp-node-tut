const  { db }  =  require( "../../../models/Checkoutinform/Checkoutinform");


const _Checkoutinformschema = 
`
type Checkoutinform {
    id:String
    room: String
    building: String
    floor: String
    roomtype: String
    status: String
    name: String
    surname: String
    checkout: String
}

input CheckoutinforomInput{

    room: String
    building: String
    floor: String
    roomtype: String
    status: String
    name: String
    surname: String
    checkout: String

}
`

const _Checkoutinform_query = `
Checkoutinforms:[Checkoutinform]
`

const _Checkoutinform_mutation = `
createCheckoutinform(input:CheckoutinforomInput):MessageCreate,
updateCheckoutinform(id:ID!,input:CheckoutinforomInput):MessageUpdate,
deleteCheckoutinform(id:ID!):MessageDelete,

`
const _Checkoutinformquery = async (filter) => {

    try{

        let resulted = await db.find(filter)
        let data = resulted.map(payload => payload._doc).map(payload => {
            payload.id  = payload._id.toString()
            return (payload)
        })
        return(
            [...data]
        )
    }catch (error){
        return error
    }
}

const _createCheckoutinform = async (payload , payload2) =>{
    console.log("createcheckoutinform",payload2)

    if(payload === undefined && payload2){payload = payload2}
    try{
        if(!payload){return null}
        if(!payload2.input){return null}
        let resulted = await db.create(payload.input)
        return resulted


    }catch(error){
        return error
    }
}

const _updateCheckoutinform = async (payload , payload2) => {
    console.log('updateCheckoutinform',payload2)
    if(payload === undefined && payload2){payload = payload2}
    try{
        if(!payload){return null}
        if(!payload.id){return null}
        if(!payload.input){return null}
        let resulted = await db.updateOne({_id:payload.id},payload.input)

        return resulted

    }catch(error){
        return error
    }
}

const _deleteCheckoutinform = async (payload, payload2) =>{
    console.log('deleteCheckoutinform',payload2)
    if(payload === undefined && payload2){ payload = payload2}
    try{
        if(!payload.id){return null}
        let result = await db.deleteOne({_id:payload.id})
        return result

    }catch(error){
        return error
    }
}

exports.Checkoutinformschema = _Checkoutinformschema
exports.Checkoutinform_query = _Checkoutinform_query
exports.Checkoutinform_mutation = _Checkoutinform_mutation
exports.Checkoutinformquery = _Checkoutinformquery


exports.createCheckoutinform = _createCheckoutinform
exports.updateCheckoutinform = _updateCheckoutinform
exports.deleteCheckoutinform = _deleteCheckoutinform