

export const queryPortmeterByid = (id) =>{
    return {query:`
        query{
            PortmeterByid(id:"${id}"){
                id
                name
                comport
                baudrate
                readtimeout
                writetimeout
                stopbits
                databits
                autoreconnect
                ipaddress
                tcp_port
                topic
                version
                protocol
            }
        }
    `}
}

export const queryPortmeters =  () =>{
    return {query:`
    query{
        Portmeters{
            id
            name
            comport
            baudrate
            readtimeout
            writetimeout
            stopbits
            databits
            autoreconnect
            ipaddress
            tcp_port
            topic
            version
            protocol
        }
    }
    `
    }
}

export const createPortmeter= (input) =>{
    console.log('create custome',input)
    return {query:`
    mutation{
        createPortmeter(input:{
            name: "${input.name}",
            protocol: "${input.protocol}",
            comport: "${input.comport}",
            baudrate: "${input.baudrate}",
            readtimeout: "${input.readtimeout}",
            writetimeout: "${input.writetimeout}",
            stopbits: "${input.stopbits}",
            databits: "${input.databits}",
            autoreconnect: "${input.autoreconnect}",
            ipaddress: "${input.ipaddress}",
            tcp_port: "${input.tcp_port}",
            topic: "${input.topic}",
            version:  "${input.version}",

        }){
            id
            errors
        }
    }
    `
    }
}

export const updatePortmeter = (id , input) =>{
    return { query:`
    mutation{
        updatePortmeter(id:"${id}",
                        input:{
                            name: "${input.name}",
                            protocol: "${input.protocol}",
                            comport: "${input.comport}",
                            baudrate: "${input.baudrate}",
                            readtimeout: "${input.readtimeout}",
                            writetimeout: "${input.writetimeout}",
                            stopbits: "${input.stopbits}",
                            databits: "${input.databits}",
                            autoreconnect: "${input.autoreconnect}",
                            ipaddress: "${input.ipaddress}",
                            tcp_port: "${input.tcp_port}",
                            topic: "${input.topic}",
                            version:  "${input.version}",
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

export const deletePortmeter = (id) =>{
    return {query:`
    mutation{
        deletePortmeter(id:"${id}")
        {
            n
            ok
            deletedCount
        }
    }
    `
    }
}