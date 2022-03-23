
export const calculate_price = ( price  ,type_price , selectvat) =>{
    if(type_price === "ราคารวมvat" && selectvat === "ไม่คิดvat"){
        return `${ Number(price*100.0/107.0).toFixed(2)}`
    }else{
        return `${ Number(price).toFixed(2)}`
    }
}


export const calculate_Amount = ( price ,number_item  ,type_price , selectvat) =>{
    if(type_price === "ราคารวมvat" && selectvat === "ไม่คิดvat"){
        return `${   ( Number(price*100.0/107.0) * Number(number_item ?  number_item :`0`) ).toFixed(2)  }`
    }else{
        return `${  ( Number(price) * Number(number_item ?  number_item :`0`) ).toFixed(2)  }`
    }
}
