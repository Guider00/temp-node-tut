import { API_queryRooms } from '../../API/index';

export const filter_rooms = (rooms , options_search) =>{
    let _filter_table = []
    if(rooms  &&  options_search){
        _filter_table = rooms.filter(room =>{
                if(room){
                    if(options_search.keyword === 'ทั้งหมด'){
                        console.log("all")
                        return (room.room && room.room.search(options_search.text) !== -1 ) ||
                        (room.building && room.building.search(options_search.text) !== -1 ) || 
                        (room.floor && room.floor.search(options_search.text) !== -1 ) ||
                        (room.RoomType && room.RoomType.search(options_search.text) !== -1 ) ||
                        (room.status && room.status.search(options_search.text) !== -1 ) ||
                        (room.name && room.name.search(options_search.text) !== -1 ) ||
                        (room.surname && room.surname.search(options_search.text) !== -1 ) ||
                        (room.checkout && room.checkout.search(options_search.text) !== -1 ) ||
                        (options_search.text === '')	
                        ;
                    }else if (options_search.keyword === 'ห้อง'){                      
                        return (room.room.search(options_search.text) !== -1 )||
                        (options_search.text === '')	
                    }else if (options_search.keyword === 'อาคาร'){
                        return (room.building.search(options_search.text) !== -1 )||
                        (options_search.text === '')	
                    }else if( options_search.keyword === 'ชั้น' ){
                        return (room.floor.search(options_search.text) !== -1 )	||
                        (options_search.text === '')	
                    }else if( options_search.keyword === 'ประเภทห้อง'){
                        return (room.RoomType && room.RoomType.search(options_search.text) !== -1 )	||
                        (options_search.text === '')		
                    }else{
                        return false; 
                    }
                }else{
                    return false;
                }
            })
    }
    return _filter_table
    
}



export const getRooms = async () => {
        return new Promise(async (resolve, reject) => {
            
            let res = await API_queryRooms();
            console.log("get-first-res",res)
            let table = [];
            if (res && res.status === 200) {
                table = res.data.rooms.map((data) => {
                    let _data = data;
                    return {
                        id: data.id,
                        data: _data,
                        checkout:data.checkout_date,
                        room : data.name ? data.name : '---',
                        RoomType : data.RoomType ? data.RoomType.name : '---',
                        building:
                            data.floor && data.floor.building && data.floor.building.name
                                ? data.floor.building.name
                                : '---',
                        floor: data.floor ? data.floor.name : '---',
                        name : ( data.members && data.members.length > 0 ) ? data.members[0].name : '---',
                        surname : ( data.members && data.members.length > 0 ) ? data.members[0].lastname : '---',
                        status: data.status ? data.status  : '---'
                        
                    };
                });
            }
    
            resolve(table);
        }).catch((e) => {
            console.log('Promise Error', e);
            return [];
        });
    };
