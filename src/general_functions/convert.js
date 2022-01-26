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