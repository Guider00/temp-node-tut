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
    mutation{
        createFloor(input:{
            name:"${input.name}",
            building:"${input.building}"
          }){
            id
            errors
          }
    }
    `
    }
}
export const updateFloor = (id , input) =>{
    return { query:`
    mutation{
        updateFloor(id:"${id}",
        input:{
            name:"${input.name}"
            building:"${input.building}"
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
