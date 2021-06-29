export const queryMemberByid = (id) =>{
    return {query:`
        query{
            MemberByid(id:"${id}"){
                id
                name
                personalid
                tel
                personalid
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
        tel:"${input.tel}"

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
                            lastname:"${input.lastname}"
                            personalid:"${input.personalid}",
                            tel:"${input.tel}"
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