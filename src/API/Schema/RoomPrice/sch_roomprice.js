
export const queryroomprice = () =>{
    return {query:`
    query{
        roomprices{
            id
            name
            type
            monthlyprice
            forehandrent
            insurance
            type_price_electrical
            unit_electrical
            rate_electrical
            totalprice_electrical
            type_price_water
            unit_water
            rate_water
            totalprice_water
            version
        }
    }
    `

    }
}

export const  createroomprice =  (input) =>{
    return {query:`
    mutation{
        createroomprice( input:{
            name:"${input.name}",
            type:"${input.type}",
            monthlyprice:"${input.monthlyprice}",
            forehandrent:"${input.forehandrent}",
            insurance:"${input.insurance}",
            type_price_electrical:"${input.type_price_electrical}",
            unit_electrical:"${input.unit_electrical}",
            rate_electrical:"${input.rate_electrical}",
            totalprice_electrical:"${input.totalprice_electrical}",
            type_price_water:"${input.type_price_water}",
            unit_water:"${input.unit_water}",
            rate_water:"${input.rate_water}",
            totalprice_water:"${input.totalprice_water}",
            version:"0.0.1",
        }){
            name
            type
        }
    }
    `
    }
}

export const deleteroomprice = (id) =>{
    return {query:`
    mutation{
        deleteroomprice(id:"${id}")
        {
            n
            ok
            deletedCount
        }
    }
    `
    }
}

export const editroomprice = (id,input) =>{
    return {query:`
    mutation{
        updateroomprice(id:"${id}",
        input:{
            name:"${input.name}",
            type:"${input.type}",
            monthlyprice:"${input.monthlyprice}",
            forehandrent:"${input.forehandrent}",
            insurance:"${input.insurance}",
            type_price_electrical:"${input.type_price_electrical}",
            unit_electrical:"${input.unit_electrical}",
            rate_electrical:"${input.rate_electrical}",
            totalprice_electrical:"${input.totalprice_electrical}",
            type_price_water:"${input.type_price_water}",
            unit_water:"${input.unit_water}",
            rate_water:"${input.rate_water}",
            totalprice_water:"${input.totalprice_water}",
        }
        )
        {
            n
            nModified
            ok
        }
    }
    `
    }
}