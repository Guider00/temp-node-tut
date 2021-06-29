

export const Validate = (type , text)=>{
    let reg= ''
    switch(type)
    {
        case 'Email':
             reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return reg.test(String(text).toLowerCase());
        break;
        case 'Building':
             reg = '/\[size=(.*?)\d{1,10}](.*?)\[\/size]/i'
            return reg.test(String(text).toLowerCase());
        break;
        case 'Floor':
        break;
        case 'Room':
        break;
        case 'Text':
        break;
        default:
            return true
        break;
    }
}