

const _DBstatusschema = `
 type DBstatus {
  readyState:String,
  dbSize:String,
  errors:String
 }
    `
const get_dbSize =  async () =>{
  return new Promise ( async (resolve,rej) =>{
    let  resulted  =undefined 
    let  mongoose = require('mongoose')
    let  Products = mongoose.model('building')
       resulted =  await Products.collection.stats();
    if(resulted && resulted.storageSize){
      resolve(resulted.storageSize)
    }else{
      resolve(undefined)
    }
      
  }).catch(e=>{
    console.log('get_dbSizeError :',e)
    return undefined
  })
}
const get_DB_status =() =>{
  let mongoose = require('mongoose');
   return mongoose.connection.readyState
}
const _queryDBstatus = async () => {
  try {
    let _readyState  = get_DB_status()
    let _dbSize  =  await get_dbSize()

    return {readyState : _readyState , dbSize: _dbSize }
  } catch (error) {
    return {errors:error}
  }
}


exports.DBstatusschema = _DBstatusschema
exports.queryDBstatus = _queryDBstatus
