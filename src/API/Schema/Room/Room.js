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
            meterroom{
                id
                name
                device_model
                inmemory_kwh
                inmemory_kwh_date
                inmemory_finished_kwh
                inmemory_finished_kwh_date 

                inmemory_water
                inmemory_water_date
                inmemory_finished_water
                inmemory_finished_water_date

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
            meterroom:"${data.meterroom}"
          }){
            id
            errors
          }
      }
    `
    }
}

export const updateRoom = (id ,data )=>{
    console.log('update Room',data)
    return {query:`
    mutation{
        updateRoom(id:"${id}",
        input:{
            name :"${data.name}"
            status:"${data.status}"
            floor:"${data.floor}"
            member:"${data.member}"
            meterroom:"${data.meterroom}"
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