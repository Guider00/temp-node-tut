export const Rooms_to_table = (Rooms) =>{
    let table = [];
        table = Rooms.map((data)=>{
            return{
                id:data.id,
                building:
                data.Invoice && data.Invoice.Room  && data.Invoice.Room.floor && data.Invoice.Room.floor.building && data.Invoice.Room.floor.building.name ? 
                data.Invoice.Room.floor.building.name : '---',
                roomName: data.Contract && data.Contract.RoomName ? data.Contract.RoomName
                : '---',
                contractID: data.Contract && data.Contract.id ? data.Contract.id 
                : '---',
                invoiceID: data.Invoice && data.Invoice.id ? data.Invoice.id
                : '---',
                name:  data.Contract &&  data.Contract.name ? data.Contract.name 
                : '---',
                surname: data.Contract &&  data.Contract.surname ? data.Contract.surname 
                : '---',
                cashBack: data.cashback ? data.cashback : '---',
                status: data.status ? data.status : '---',
                cashBack_date: data.cashback_date ? data.cashback_date : '---',
            }
        })
        return table
}


export const filter_rooms = (rooms , formFilter) =>{
    let _filter_table = []
    if(rooms && formFilter){
        _filter_table = rooms.filter(room =>{
            if(room){
                if(formFilter.option_search === 'ทั้งหมด'){
                    console.log('All')
                    return(room.building && room.building.search(formFilter.text) !==1) ||
                    (room.building && room.building.search(formFilter.text) !==1) ||
                    (room.roomName && room.roomName.search(formFilter.text) !==1) ||
                    (room.contractID && room.contractID.search(formFilter.text) !==1) ||
                    (room.invoiceID && room.invoiceID.search(formFilter.text) !==1) ||
                    (room.name && room.name.search(formFilter.text) !==1) ||
                    (room.surname && room.surname.search(formFilter.text) !==1) ||
                    (room.cashBack && room.cashBack.search(formFilter.text) !==1) ||
                    (room.status && room.status.search(formFilter.text) !==1) ||
                    (room.cashBack_date && room.cashBack_date.search(formFilter.text) !==1) ||
                    (formFilter.text === '')
                    
                }else if(formFilter.option_search === 'อาคาร'){
                    console.log('Building')
                    return (room.building.search(formFilter.text) !== -1 )||
                    (formFilter.text === '')

                }else if(formFilter.option_search === 'ชื่อห้อง'){
                    console.log('RoomName')
                    return (room.roomName.search(formFilter.text) !== -1 )||
                    (formFilter.text === '')

                }else if(formFilter.option_search === 'วันที่คืน'){
                    console.log('Name')
                    return (room.cashBack_date.search(formFilter.text) !== -1 )||
                    (formFilter.text === '')

                }else{
                    return false
                }
            }else{
                return false
            }
        })
    }
    return _filter_table
}
