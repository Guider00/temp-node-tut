
const _pasue  = () => {
    return new Promise( (resolve , reject) => {

    }).catch( e =>{
        console.log('Error pasue :',e)
        return ({errors:e})
    })
}
const _disconnect = async () =>{
    return new Promise( (resolve , reject) => {

    }).catch( e =>{
        console.log('Error disconect :',e)
        return ({errors:e})
    })
}
const _connect = async () =>{
    return new Promise( (resolve , reject) => {

    }).catch( e =>{
        console.log('Error connect :',e)
        return ({errors:e})
    })
}



exports.connect = _connect
