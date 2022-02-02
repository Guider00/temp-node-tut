export const Rooms_to_table =(Rooms) =>{
	let table = [];
		table =	Rooms.map((data) => {
					let _data = data;
					return {
						id: data.id,
						data: _data,
						building:
							data.floor && data.floor.building && data.floor.building.name
								? data.floor.building.name
								: '---',
						floor: data.floor ? data.floor.name : '---',
						name: data.name,
						status: data.status ? data.status : '---',
						member: data.member ? data.member.name : '---',
						members: data.members ? data.members :[],
						metername: data.meterroom ? data.meterroom.name : '---',
						meterroom: data.meterroom ? data.meterroom : '---',
						RoomType: data.RoomType ? data.RoomType.name: "---"
						
					};
				});
	 return table
}