export const queryRoomByid = (id) =>{
    return {query:`
        query{
            roomByid(id:"${id}"){
                id
                name
                status
                floor{
                    id
                    name
                    building{
                        id
                        name
                    }
                }
                version
            }
        }
    `}
}

export const queryRooms = () =>{
    return { query:`
        query{
            rooms{
                id
                name
                status
                floor{
                    id
                    name
                    buiding{
                        id
                        name
                    }
                }
            }
        }
    `

    }
}
export const createRoom = (data) =>{
    return {query:`
        mutation{
            createRoom(input:{
                name:"${data.input}",
                type:"${data.type},
                status:"${data.status}",
                floor:"${data.floor}"
                version:"0.0.1"

            })
            {
               id
               name
               type
               status
               floor{
                   id
                   name
                   floor{
                       id
                       name
                       building{
                           id
                           name
                       }
                   }
               }
               version
            }
        }
        `
    }
}

export const updateRoom = (id ,data )=>{
    return {query:`
    mutation{
        updateRoom(id:"${id}",
        input:{
            name
            status
            floor
        })
        {
            
        }
    }

    `
    }
}

export const deleteRoom = (id) =>{
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