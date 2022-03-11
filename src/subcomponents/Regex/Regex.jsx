export const Blocktext  = (type,text)=>{
        let _regex = /.*/ig;
        switch (type) {
            case 'customer_name':
            case 'customer_lastname':
                _regex = /[^0-9a-zA-Zก-๙ ]/ig
                text = text.replace(_regex,"")
            break;
            case 'address':
            case 'customer_address':
                _regex = /[^0-9\u0E00-\u0E7Fa-zA-Z' .\n]/ig
            break;
            case 'email':
                _regex = /^[a-zA-Z0-9.!#$%&'*=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
            break;
            case 'taxnumber':
              _regex =  /[^0-9]{1,32}$/;
            break;
            default:
                break;
        }
        text = text.replace(_regex,"");
        return text 
}

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
        case 'customer_address':
            reg =  /[^0-9\u0E00-\u0E7Fa-zA-Z' .\n]{1,200}$/;
             resulte =  reg.test(String(text));
        break;
        case 'tel':
            reg =  /[^0-9+\n]{1,32}$/;
             resulte =  reg.test(String(text));
        break;
        
        default:
            resulte =  false
        break;
    }
    return resulte
}