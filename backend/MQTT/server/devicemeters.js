/**
 *  return String JSON  
 */
var listdevices = []

const _adddevicelist = (portname , devicename ,tagname ,payload) =>{
    if(portname && devicename && tagname){

        let id_key = `${portname}_/_${devicename}_/_${tagname}`
        if( listdevices.find(device => device.id === id_key) ) 
        {
                listdevices.find(device => device.id === id_key).value = payload
        }else{
                listdevices = [...listdevices,{id:id_key ,port: portname , device:devicename , tag:tagname, value:payload}]
        }
        return {error:null , message:"Ok"}
    }else{
        return ({error:"input is undefiend" , message:"function adddevicelist error"})
    }
   
}
 const _refacedevicelist = (listmeter) =>{
    return null 
}

 const _getlistdevices  = () =>{
    return listdevices
}
 const _setlistdevices = (payload) =>{
    if(payload && payload.length){
        listdevices = [...payload].splice()
    }else{
        return {error:"payload is not Array",messageerror:"payload is not Array"}
    }
}
/**
 *  return String JSON  
 */
 const _getAllMeter = () =>{
    return listdevices
}

exports.adddevicelist = _adddevicelist
exports.getlistdevices = _getlistdevices
exports.setlistdevices = _setlistdevices
exports.getAllMeter = _getAllMeter