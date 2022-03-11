export const  toYYMMDD = (date:Date) =>{
    if(date){
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month,day].join('-');
    }else{
        return ('')
    }
}
export const  toYYMM = (date:Date) =>{
    if(date){
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month].join('-');
    }else{
        return ('')
    }
}
export const  toDDMM = (date:Date) =>{
    if(date){
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate();
  
    
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month].join('-');
    }else{
        return ('')
    }
}
export const toYYYYMMDD = (date:Date) =>{

    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);

    return ( date.getFullYear()+"-"+(month)+"-"+(day)  ) 
}

export const  formatDate = (date) => {
    if(date){
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
    }else{
        return ('')
    }
}
export const toHHMMSS = (date) =>{
    let d = new Date();
    let datetext = d.toTimeString();
    return( datetext.split(' ')[0] ) 
}

export const getlaststring = (str:String,number:Number) =>{
    console.log('str',str.length)
    if( (str.length-1) >= number){
         return str.substring( (str.length) -number , str.length )
    }else{
        return str
    }
   
}