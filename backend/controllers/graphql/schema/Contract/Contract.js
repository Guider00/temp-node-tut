const  { db }  =  require( "../../../models/Contract/Contract");

const _Contractschema = 
`
type Contract{

    id:String
    Contractnumber: String
    RoomType: String
    RoomName: String
    RentType: String
    name: String
    surname: String
    Check_in: String
    status: String
    Check_out: String
    Checkin:Checkin
    Room:Room
    
}

input ContractInput{

    Contractnumber: String
    RoomType: String
    RoomName: String
    RentType: String
    name: String
    surname: String
    Check_in: String
    status: String
    Check_out: String
    checkinid:String
    roomid:String

}
`
const _Contract_query = `
Contracts:[Contract]
queryContractByid :Contract
`

const _Contract_mutation = `
createContract(input:ContractInput):MessageCreate,
updateContract(id:ID!,input:ContractInput):MessageUpdate,
deleteContract(id:ID!):MessageDelete,

`

const _queryContractByid = async(payload ,payload2) =>{

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

const _Contracts = async (filter) => {

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

const _createContract = async (payload , payload2) =>{
    console.log("createContract",payload2)

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

const _updateContract = async (payload , payload2) => {
    console.log('updateContract',payload2)
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

const _deleteContract = async (payload, payload2) =>{
    console.log('deleteContract',payload2)
    if(payload === undefined && payload2){ payload = payload2}
    try{
        if(!payload.id){return null}
        let result = await db.deleteOne({_id:payload.id})
        return result

    }catch(error){
        return error
    }
}

exports.Contractschema = _Contractschema

exports.queryContractByid = _queryContractByid 
exports.Contract_query = _Contract_query
exports.Contract_mutation = _Contract_mutation
exports.Contracts = _Contracts


exports.createContract = _createContract
exports.updateContract = _updateContract
exports.deleteContract = _deleteContract