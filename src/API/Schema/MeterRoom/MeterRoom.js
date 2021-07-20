
export const queryMeterRoomByid = (id) =>{
    return {query:`
        query{
            MeterRoomByid(id:"${id}"){
                id
                name
                device_model
                portmeter{
                    name
                }
                device_address
                inmemory_kwh
                inmemory_kwh_date
                realtime_kwh
                inmemory_water
                inmemory_water_date
                realtime_water
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
            device_model
            portmeter{
                id
                autoreconnect
                protocol
                name
            }
            device_address
            inmemory_kwh
            inmemory_kwh_date
            realtime_kwh
            inmemory_water
            inmemory_water_date
            realtime_water
            
            deveui,
            appeui,
            appkey,

            version
        }
    }
    `
    }
}

export const createMeterRoom= (input) =>{
    console.log('create meter room ',input)
    return {query:`
    mutation{
        createMeterRoom(input:{
            name: "${input.name}",
            device_model: "${input.device_model}",
            portmeter: "${input.portmeter}",
            device_address: "${input.device_address}",
            inmemory_kwh: "${input.inmemory_kwh}",
            inmemory_kwh_date: "${input.inmemory_kwh_date}",
            realtime_kwh: "${input.realtime_kwh}",
            inmemory_water: "${input.inmemory_water}",
            inmemory_water_date: "${input.inmemory_water_date}",
            realtime_water: "${input.realtime_water}",

            deveui:"${input.deveui}",
            appeui:"${input.appeui}",
            appkey:"${input.appkey}",


            version: "${input.version}"
        }){
            id
            errors
        }
    }
    `
    }
}

export const updateMeterRoom = (id , input) =>{
    console.log('updateMeterRoom data',id,input)
    return { query:`
    mutation{
        updateMeterRoom(id:"${id}",
                        input:{
                            name: "${input.name}",
                            device_model: "${input.device_model}",
                            portmeter: "${input.portmeter}",
                            device_address: "${input.device_address}",
                            inmemory_kwh: "${input.inmemory_kwh}",
                            inmemory_kwh_date: "${input.inmemory_kwh_date}",
                            realtime_kwh: "${input.realtime_kwh}",
                            inmemory_water: "${input.inmemory_water}",
                            inmemory_water_date: "${input.inmemory_water_date}",
                            realtime_water: "${input.realtime_water}",

                            deveui:"${input.deveui}",
                            appeui:"${input.appeui}",
                            appkey:"${input.appkey}",

                            version: "${input.version}"
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
