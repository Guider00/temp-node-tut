export const queryFloorByid = (id) =>{
    return {query:`
        query{
            FloorByid(id:"${id}"){
                id
                name
                building{
                    id
                    name
                }
            }
        }
    `}
}
export const queryFloors =  () =>{
    return {query:`
    query{
        Floors{
            id
            name
            building{
                id
                name
            }
        }
    }
    `
    }
}
export const createFloor = (input) =>{
    return {query:`
    mutation(input:{
        name:"${input.name}"
        building : "${input.building}"
    }){
        id
        name
        building{
            id
            name
        }
    }
    `
    }
}
export const updateFloor = (id , input) =>{
    return { query:`
    mutation(id:"${id}",
    input:{
        name:"${input.name}"
        building:{
            id
            name
            }
        }
    )
    {
        n
        nModified
        ok
    }
    `
    }
}
export const  deleteFloor = (id) =>{
    return {query:`
    mutation{
        deleteFloor(id:"${id}")
        {
            n
            ok
            deletedCount
        }
    }
    `
    }
}
