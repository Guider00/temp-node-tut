/**
 * @param  {Nubmer} price
 * @param  {string} selectvat is [ "NOVAT" ,"PRICE_NOVAT","PRICE+VAT" ]
 * @param  {number} numbervat
 */
export function calvat( price : Nubmer, selectvat :string, numbervat :number ) {
    if(selectvat === 'NOVAT'){
        return {price:price , vat:0}
    }else if(selectvat === 'PRICE_NOVAT'){
        return({
                price:(price*numbervat/100.0) + price ,
                vat: (price*numbervat/100.0)
                })
    }else if(selectvat === 'PRICE+VAT'){
        return({
              price:(price*numbervat/100.0) + price ,
              vat: (price*numbervat/100.0)
        })
    }
}