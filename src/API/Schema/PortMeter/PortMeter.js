
import { gql } from '@apollo/client';


export const API_GET_Portmeters = gql`

query{
    Portmeters {
                id
                name
                protocol
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
      }
}

`;
export const API_CREATE_Portmeter = gql`
    mutation createPortmeter($input:PortmeterInput!){
        createPortmeter(input: $input){
             id
             errors
        }
    }
`;
export const API_DELETE_Portmeter = gql`
	mutation deletePortmeter($id: ID!) {
		deletePortmeter(id: $id) {
			n
			deletedCount
		}
	}
`;
export const API_UPDATE_Portmeter = gql`
mutation updatePortmeter($id:ID! , $input:PortmeterInput){
	updatePortmeter(id:$id,input:$input){
		n
		nModified
	}
}
` ;




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