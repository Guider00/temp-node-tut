
export const queryMeterRoomByid = (id) =>{
    return {query:`
        query{
            MeterRoomByid(id:"${id}"){
                id
                name
                port
                device_address
                inmemory_kwh
                inmemory_kwh_date
                realtime_kwh
                inmemory_water
                inmemory_water_date
                realtime_water
                device_model
                version
            }
        }
    `}
}

export const queryMeterRooms =  () =>{
    return {query:`
    query{
        MeterRooms{
            id
            name
            port
            device_address
            inmemory_kwh
            inmemory_kwh_date
            realtime_kwh
            inmemory_water
            inmemory_water_date
            realtime_water
            device_model
            version
        }
    }
    `
    }
}

export const createMeterRoom= (input) =>{
    return {query:`
    mutation{
        createMeterRoom(input:{
            name:${input.name},
            port: ${input.port},
            device_address: ${input.device_address},
            inmemory_kwh: ${input.inmemory_kwh},
            inmemory_kwh_date: ${input.inmemory_kwh_date},
            realtime_kwh: ${input.realtime_kwh},
            inmemory_water: ${input.inmemory_water},
            inmemory_water_date: ${input.inmemory_water_date},
            realtime_water: ${input.realtime_water},
            device_model: ${input.device_model},
            version: ${input.version}
        }){
            id
            errors
        }
    }
    `
    }
}

export const updateMeterRoom = (id , input) =>{
    return { query:`
    mutation{
        updateMeterRoom(id:"${id}",
                        input:{
                            name:${input.name},
                            port: ${input.port},
                            device_address: ${input.device_address},
                            inmemory_kwh: ${input.inmemory_kwh},
                            inmemory_kwh_date: ${input.inmemory_kwh_date},
                            realtime_kwh: ${input.realtime_kwh},
                            inmemory_water: ${input.inmemory_water},
                            inmemory_water_date: ${input.inmemory_water_date},
                            realtime_water: ${input.realtime_water},
                            device_model: ${input.device_model},
                            version: ${input.version}
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

export const deleteMeterRoom = (id) =>{
    return {query:`
    mutation{
        deleteMeterRoom(id:"${id}")
        {
            n
            ok
            deletedCount
        }
    }
    `
    }
}
