var number_tx = 0
var number_rx = 0

const _inc_rx = () =>{
    number_rx++;
    return number_rx
}
const _inc_tx = () =>{
    number_tx++;
    return number_tx
}



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


exports.inc_rx = _inc_rx
exports.inc_tx = _inc_tx


exports.pause = _pasue
exports.disconect = _disconnect
exports.connect = _connect
