export const filter_rooms = (datas , options_search) =>{
    let _filter_table = []
    if(datas && options_search){
        _filter_table = datas.filter(data =>{
            if(data){
                if(options_search.keyword === 'ทั้งหมด'){
                                    console.log('data.Room',data)

                    return (data.id && data.id.search(options_search.text) !== -1) ||
                    (data.monthlybilling && data.monthlybilling.search(options_search.text) !== -1 ) ||
                    (data.Room && data.Room.name && data.Room.name.search(options_search.text) !== -1 ) ||
                    (data.status && data.status.search(options_search.text) !== -1 ) ||
                    (data.printstatus && data.printstatus.search(options_search.text) !== -1 ) ||
                    (data.duedateinvoice && data.duedateinvoice.search(options_search.text) !== -1 ) ||
                    (options_search.text === '')	
                }else if( data.Room && data.Room.name && options_search.keyword === 'ชื่อห้อง'){
                    return (data.Room.name.search(options_search.text) !== -1 )||
                    (options_search.text === '')

                }else if( data.monthlybilling && options_search.keyword === 'รอบบิล'){
                    return (data.monthlybilling.search(options_search.text) !== -1 )||
                    (options_search.text === '')

                }else if(data.Room && data.Room.members && options_search.keyword === 'ชื่อผู้พักอาศัย'){
                    return (data.Room.members[0].name.search(options_search.text) !== -1 )||
                    (options_search.text === '')
                }else{
                    return false;
                }
            }
            else{
                return false
            }
        })
    }
    return _filter_table



}