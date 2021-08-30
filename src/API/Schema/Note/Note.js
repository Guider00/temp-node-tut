export const queryNoteByid = (id) =>{
    return {query:`
        query{
            NoteByid(id:"${id}"){
                id
                record_date
                event_date
                room{
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
                topic
                message

                
            }
        }
    `}
}

export const queryNotes =  () =>{
    return {query:`
    query{
        Notes{
            id
            record_date
            event_date
            room{
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
            topic
            message
        }
    }
    `
    }
}

export const createNote= (input) =>{
    return {query:`
    mutation{
        createNote(input:{

        record_date:"${input.record_date}",
        event_date:"${input.event_date}",
        room:"${input.room}",
        topic:"${input.topic}",
        message:"${input.message}"


        }){
            id
            errors
       
        }
    }
    `
    }
}

export const updateNote = (id , input) =>{
    return { query:`
    mutation{
        updateNote(id:"${id}",
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

export const deleteNote = (id) =>{
    return {query:`
    mutation{
        deleteNote(id:"${id}")
        {
            n
            ok
            deletedCount
        }
    }
    `
    }
}