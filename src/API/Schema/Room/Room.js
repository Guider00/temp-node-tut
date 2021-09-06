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
                building{
                    id
                    name
                }
            }
            member{
                id
                name
            }
        }
    }
    `
    }
}
export const createRoom = (data) =>{
    console.log('createRoom',data)
    return {query:`
    mutation{
        createRoom(input:{
            name:"${data.name}"
            status:"${data.status}"
            type:"${data.type}"
            floor:"${data.floor}"
            member:"${data.member}"
          }){
            id
            errors
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
            name :"${data.name}"
            status:"${data.status}"
            floor:"${data.floor}"
            member:"${data.member}"
        })
        {
         n
         ok
         nModified   
        }
    }

    `
    }
}

export const deleteRoom = (id) =>{
    return {query:`
        mutation{
            deleteRoom(id:"${id}"){
                n
                ok
                deletedCount
              }
        }
        `
    }
}