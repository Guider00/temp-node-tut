

export const Validate = (type , text)=>{
    let reg= ''
    let resulte = false;
    switch(type.toLowerCase())
    {
        case 'email':
             reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
             resulte =  reg.test(String(text).toLowerCase());
        break;
        case 'building':
             reg = /\[size=(.*?)\d{1,10}](.*?)\[\/size]/i
             resulte =  reg.test(String(text).toLowerCase());
        break;
        case 'ipaddress':
            reg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
            resulte =  reg.test(String(text));
        break;
        case 'floor':
        break;
        case 'room':
        break;
        case 'name':
            reg= /^.{0,50}$/
            resulte = reg.test(String(text));
        break;
        case 'device_address':
            reg  =  /^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/
            resulte =  reg.test(String(text));
        break;
        case 'text':
            reg  =  /^[a-zA-Z0-9_.-]{1,32}$/
            resulte =  reg.test(String(text));
        break;
        case 'appeui':
            reg  =  /^[a-zA-Z0-9_.]{1,32}$/
            resulte =  reg.test(String(text));
        break;
        case 'appkey':
            reg  =  /^[a-zA-Z0-9_.]{1,32}$/
            resulte =  reg.test(String(text));
        break;
        case 'deveui':
            reg  =  /^[a-zA-Z0-9_.]{1,32}$/
            resulte =  reg.test(String(text));
        break;

        
        default:
            resulte =  false
        break;
    }
    return resulte
}