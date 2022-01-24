/**
 * @param  {Nubmer} price
 * @param  {string} select_vat is [ "NOVAT" ,"PRICE_NOVAT","PRICE+VAT" ]
 * @param  {number} numbervat
 */
export function calvat( price : Nubmer, select_vat :string, numbervat :number ) {
    if(select_vat === 'NOVAT'){
        return {price:price , vat:0}
    }else if(select_vat === 'PRICE_NOVAT'){
        return({
                price:(price*numbervat/100.0) + price ,
                vat: (price*numbervat/100.0)
                })
    }else if(select_vat === 'PRICE+VAT'){
        return({
              price:(price*numbervat/100.0) + price ,
              vat: (price*numbervat/100.0)
        })
    }
}