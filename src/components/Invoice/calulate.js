export const total_lists = (lists) =>{{
    if(lists && lists.length > 0){
        
    }
    return 0
}} 
export const vatprice = (list) =>{{
    if(list){
       return Number( (Number( list.price ) * Number(list.vat ? list.vat : 7 )/100.0) ).toFix(3)
    }
    return 0
}} 

export const totalprice = (list) =>{{
    if(list){
       return ( Number( list.price ) +  Number( (Number( list.price ) * Number(list.vat ? list.vat : 7 )/100.0) ) ).toFix(3)
    }
    return 0
}} 
