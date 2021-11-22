import {  gql } from '@apollo/client';

export const queryMemberByid = (id) =>{
    return {query:`
        query{
            MemberByid(id:"${id}"){
                id
                name
                lastname
                personalid
                tel
                email
                carid
                note
                
            }
        }
    `}
}

export const queryMembers =  () =>{
    return {query:`
    query{
        Members{
            id
            name
            lastname
            personalid
            tel
            email
            carid
            note
        }
    }
    `
    }
}

export const createMember= (input) =>{
    return {query:`
    mutation{
        createMember(input:{
        name:"${input.name}",
        lastname:"${input.lastname}",
        personalid:"${input.personalid}",
        tel:"${input.tel}",
        email:"${input.email}",
        carid:"${input.carid}",
        note:"${input.note}"
        }){
            id
            errors
       
        }
    }
    `
    }
}

export const updateMember = (id , input) =>{
    return { query:`
    mutation{
        updateMember(id:"${id}",
                        input:{
                            name:"${input.name}",
                            lastname:"${input.lastname}",
                            personalid:"${input.personalid}",
                            tel:"${input.tel}",
                            email:"${input.email}",
                            carid:"${input.carid}",
                            note:"${input.note}"
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

export const deleteMember = (id) =>{
    return {query:`
    mutation{
        deleteMember(id:"${id}")
        {
            n
            ok
            deletedCount
        }
    }
    `
    }
}



export const API_GET_Members = gql`
    query{
        Members{
            id
            name
            lastname
            personalid
            tel
            email
            carid
            note
        }
    }
`;

export const API_createMember = gql`
    mutation createMember( $input:MemberInput!){
        createMember(input:$input){
            id
        }
    }
`
export const API_updateMember = gql`
    mutation updateMember( $id:ID! , $input:MemberInput!){
        updateMember(id:$id,input:$input){
            n
            nModified
        }
    }
`

