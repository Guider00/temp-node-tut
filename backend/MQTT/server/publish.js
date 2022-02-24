const { MeterRooms  } = require('../../controllers/graphql/schema/MeterRoom/MeterRoom')
const {inc_rx }  = require('./command')

const {adddevicelist } = require ('./devicemeters')

const  IsValidJSONString  = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const toShort = (number) => {
    const int16 = new Int16Array(1)
    int16[0] = number
    return int16[0]
}


const seach_eui = (eui,list) =>{
    return list.findIndex( ( {deveui})=>{

        return( (deveui).toLocaleLowerCase() === (eui).toLocaleLowerCase()   )
     })
}


const Femto_convert_topic = (packet) =>{
   if(packet.topic){
      let message =  packet.topic.indexOf('/') !== -1 ?  packet.topic.split('/') : []
    if(message.length >= 3){
        return ({ public_topic: message[0] , action:message[1] , gwid: message[2] })
    }else{
        return ({ public_topic:"" , action:"" , gwid: "" })
    }
   }else{
       return ({ public_topic:"" , action:"" , gwid: "" })
   }

 
}
const _printlog = (packet , client) =>{
    if(client && client.id){
        console.log(` mqtt client subscribed : ', ${client.id} subscribed : , topic :  ${packet.topic}`);
    }
}

const _mqtt_publich = async (packet,client) =>{
    if(client && client.id && packet && packet.topic){
        _printlog (packet,client)
        // check device EUI 
        try{

            setTimeout(async() => {
                try{
                const meters = await MeterRooms()
            //    let  listdevices =    meters.map(  x =>  {  return x } ) // <<  get only have deveui   [obj , obj ]
       

                let femto_message = Femto_convert_topic(packet.topic)
                console.log(femto_message)

                let payload = String (packet.payload)
                if( IsValidJSONString(payload) )
                {
                    var obj = JSON.parse(payload);
                    obj = obj[0]
                 
                    if(obj !== undefined && obj !== null &&  obj.hasOwnProperty("data") &&  ( obj.hasOwnProperty("devEUI") )
                    &&  obj.hasOwnProperty("rssi")  && obj.hasOwnProperty('gwid') && obj.hasOwnProperty('macAddr') )
                    {
                        if(seach_eui(obj.devEUI, meters ) !== -1 ){
                            let meter_index = seach_eui(obj.devEUI, meters )
                            console.log('update data Lora ')
                            inc_rx(); // << count rx message 
                       
                            //<< check modal  KM-24-L
                

                                const originaldata = new Buffer.from(obj.data,'hex'); // Ta-da
                                if(originaldata.length === 9 && meters[meter_index]['device_model'] === "KM24L"  ){
                                    let kwh_H = toShort( parseInt((originaldata[0] << 8) | originaldata[1]) );
                                    let kwh_L = toShort( parseInt((originaldata[2] << 8) | originaldata[3]) );
                                    let kwh =  parseInt((kwh_H << 16) + kwh_L)
                                    let count_H = toShort( parseInt((originaldata[4] << 8) | originaldata[5]) );
                                    let count_L = toShort( parseInt((originaldata[6] << 8) | originaldata[7]) );
                                    let count =  parseInt((count_H << 16) + count_L) / 1000.0 
                                    
                                    let temp = originaldata[8]
                                    console.log('kwh',kwh,'count',count,'temp',temp , 'deveui',obj.devEUI)
                                
                                    adddevicelist(meters[meter_index]['portmeter'].name ,meters[meter_index].name ,'kwh', kwh )
                                    adddevicelist(meters[meter_index]['portmeter'].name ,meters[meter_index].name ,'count', count )
                                    adddevicelist(meters[meter_index]['portmeter'].name ,meters[meter_index].name ,'temp', temp )
                                
                                    // lora_communcation.list_device_eui[index_math].set_value_by_address(1,kwh_L)
                                    // lora_communcation.list_device_eui[index_math].set_value_by_address(2,count_H)
                                    // lora_communcation.list_device_eui[index_math].set_value_by_address(3,count_L)
                                    // lora_communcation.list_device_eui[index_math].set_value_by_address(4,temp)


                                    //  let  last_update_time = new Date(obj.time).getTime()
                                    //  let  old_message_time = new Date(lora_communcation.list_device_eui[index_math].timelastupdate).getTime()
                                    //  lora_communcation.list_device_eui[index_math].timeperiod = ( last_update_time   -   old_message_time  ) /1000.0


                                    // lora_communcation.list_device_eui[index_math].timelastupdate = (obj.time)

                                    // console.log('kwh',kwh,'count',count,'temp',temp ,'period',lora_communcation.list_device_eui[index_math].timeperiod )

                                //  _data_table =[{value:""},{value:""}]
                                }else{

                                    let obj_lora = {data:[]}
                                    originaldata.map( (value,index) => {
                                        if(index%4 === 0 ){
                                            obj_lora.data[parseInt((index)/4)] = {chanal:value}
                                        }else if( index%4 === 1){
                                            obj_lora.data[parseInt((index)/4)] = {...obj_lora.data[ parseInt((index)/4) ] ,datatype:value}
                                        }else if( index%4 === 2){
                                            obj_lora.data[parseInt((index)/4)] = {...obj_lora.data[parseInt((index)/4)] ,H:value}
                                        }else if( index%4 === 3){
                                            obj_lora.data[parseInt((index)/4)] = {...obj_lora.data[parseInt((index)/4)] ,L:value}
                                        }
                                    })
                                    console.log(obj_lora) // << log previe data 
                                
                                }

                        }else{  console.log("Not Have list deviceEui : ",obj.devEUI)  }
                    }else{ console.log('MQTT object Property Error ') }
                }else{  console.log('packet.payload  JSON format error')  }

      

                }catch(e){
                    console.log(e)
                }
            }, 100);

        }catch(error){

        }
      
        // convert data 

    }
}

exports.mqtt_publich = _mqtt_publich
