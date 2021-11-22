export const filter_rooms = (rooms , options_search ,option_keyword) =>{
		let _filter_table = []
		if(rooms  &&  options_search){
			_filter_table = rooms.filter(room =>{
					
					if(room && room.data){
						if(options_search.keyword === 'ทั้งหมด'){
						
							return ( room.data.name.search(options_search.text) !== -1 ) ||
							(room.building.search(options_search.text) !== -1 ) || 
							(room.floor.search(options_search.text) !== -1 ) ||
							(room.data.RoomType.name.search(options_search.text) !== -1 ) ||
							(room.data  && (room.data.status.search(options_search.text) !== -1 ) )	||
							(room.data.members.length > 0  && (room.data.members[0].name.search(options_search.text) !== -1 ) )	||
							// (room.data.members.length > 0  && (room.data.members[0].tel.search(options_search.text) !== -1 ) ) || 
							(options_search.text === '')	
							;
						}else if (options_search.keyword === 'ห้อง'){
							return (room.data.name.search(options_search.text) !== -1  || 
							(options_search.text === '')	
							)
						}else if (options_search.keyword === 'อาคาร'){
							return (room.building.search(options_search.text) !== -1 )||
							(options_search.text === '')	
						}else if( options_search.keyword === 'ชั้น' ){
							return (room.floor.search(options_search.text) !== -1 )	||
							(options_search.text === '')	
						}else if( options_search.keyword === 'ประเภทห้อง'){
							return (room.data.RoomType.name.search(options_search.text) !== -1 )	||
							(options_search.text === '')	
						}else if( options_search.keyword === 'สถานะ'){
							return (room.data  && (room.data.status.search(options_search.text) !== -1 ) )	||
							(options_search.text === '')		
						}else if( options_search.keyword === 'ชื่อ'){
							return (room.data.members.length > 0  && (room.data.members[0].name.search(options_search.text) !== -1 ) )	||
							(options_search.text === '')		
						}else if( options_search.keyword === 'เบอร์ติดต่อ'){
							return ( room.data.members.length > 0  && (room.data.members[0].tel.search(options_search.text) !== -1 ) )	||
							(options_search.text === '')	
						
						}else{
							return false; 
						}
					}else{ return false;  }
				})
		}
		return _filter_table
}