export const data_display = (data,property) =>{
    if(typeof property  === 'string'){
        return data[property]
    }else if (typeof property  === 'object'){
        if( Array.isArray(property)){

            return  property.reduce( (acc ,current  )  => {
               return ( acc ? acc[current]: undefined )
            }, data ) 
        }
    }
 
}