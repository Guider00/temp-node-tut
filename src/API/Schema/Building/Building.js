export const queryBuildingByid = (id) =>{
    return {query:`
        query{
            BuildingByid(id:"${id}"){
                id
                name
            }
        }
    `}
}
export const queryBuildings =  () =>{
    return {query:`
    query{
        Buildings{
            id
            name
        }
    }
    `
    }
}
export const createBuilding = (input) =>{
    return {query:`
    mutation(input:{
        name:"${input.name}"
    }){
        id
        name
    }
    `
    }
}
export const updateBuilding = (id , input) =>{
    return { query:`
    mutation(id:"${id}",
    input:{
        name:"${input.name}"
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
export const  deleteBuilding = (id) =>{
    return {query:`
    mutation{
        deleteBuilding(id:"${id}")
        {
            n
            ok
            deletedCount
        }
    }
    `
    }
}
