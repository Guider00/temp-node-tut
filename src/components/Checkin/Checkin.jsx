import { useEffect, useState } from 'react';

import styles from './Checkin.module.css';
import { API_queryRooms, API_queryBuildings, API_updateMeterRoomkwh, API_updateMeterRoomwater } from '../../API/index';
import SearchIcon from '@material-ui/icons/Search';
import  { TableRoomMember }  from './TableRoomMember/TableRoomMember'
import { useQuery, useMutation } from '@apollo/client';
import { API_UPDATE_Room ,API_GET_Rooms} from '../../API/Schema/Room/Room'
const getRooms = async () => {
	return new Promise(async (resolve, reject) => {
		let res = await API_queryRooms();
		let table = [];
		if (res && res.status === 200) {
			table = res.data.rooms.map((data) => {
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
					metername: data.meterroom ? data.meterroom.name : '---',
					meterroom: data.meterroom ? data.meterroom : '---',
					
				};
			});
		}

		resolve(table);
	}).catch((e) => {
		console.log('Promise Error', e);
		return [];
	});
};
const Rooms_to_table =(Rooms) =>{
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
						metername: data.meterroom ? data.meterroom.name : '---',
						meterroom: data.meterroom ? data.meterroom : '---',
						RoomType: data.RoomType ? data.RoomType.name: "---"
					};
				});
	 return table
}

export const Checkin = () => {

	const [ textfilter, settextfilter ] = useState('');
	const [ rooms, setrooms ] = useState([]);
	const [ loading, setloading ] = useState(false);
	const [ selectedroom, setselectedroom ] = useState(null);

	const GET_Rooms = useQuery(API_GET_Rooms);
	console.log('GET_Rooms',GET_Rooms)
	const [ updateRoom, mutationuploadFile ] = useMutation(API_UPDATE_Room)


	const [ formcheckin , setformcheckin] = useState({
		checkinnumber:"",
		checkintype:"",
		rental_period:"",
		rental_deposit:"",
		rental_period_day:""
	})
	const [ formmember, setformmember ] = useState({
		 nametitle:"",
		 name:"",
		 lastname:"",
		 personalid:"",
		 taxnumber:"",
		 branch:"",
		 address:"",
		 tel:"",
		 car_registration:"",
		 note:""

	});
	const handlechangeformmember = (e) =>{
	
		let _formmember = formmember
			console.log('change',e.target.id , _formmember)
		if (e.target.id && _formmember.hasOwnProperty(e.target.id) ) {
			_formmember[e.target.id] = e.target.value;
			setformmember({ ..._formmember });
		}
	}
	const handlechangeformcheckin =(e) =>{
			let _formcheckin = formmember
			console.log('change',e.target.id , _formcheckin)
		if (e.target.id && _formcheckin.hasOwnProperty(e.target.id) ) {
			_formcheckin[e.target.id] = e.target.value;
			setformcheckin({ ..._formcheckin });
		}
	}
	useEffect( ()=>{
		
				console.log('update Rooms')
				if( GET_Rooms.data ){
				let Rooms = Rooms_to_table(GET_Rooms.data.Rooms)

				console.log('Rooms', Rooms);
				
				setrooms(Rooms);
				setloading(true);
				}
	
	},[GET_Rooms.data])
	// useEffect(
	// 	() => {
	// 		async function fetchData() {
	// 			//let Rooms = await getRooms();
	// 			if( GET_Rooms.loading ===false ){
	// 			let Rooms = Rooms_to_table(GET_Rooms.data.Rooms)

	// 			console.log('Rooms', Rooms);
	// 			setrooms(Rooms);
	// 			}
	// 		}
	// 		fetchData();
	// 		setloading(true);
	// 	},
	// 	[ loading ]
	// );
	 console.log('rooms', rooms);
	// console.log('selectedroom', selectedroom);
	return (
		<div>
			<div className={styles.zone1}>
				<div className={styles.bigbox}>
					<div className={styles.tableroomselect}>
						<div className={styles.headertable}>
							<div className={styles.text}> รายการห้องว่างและถูกจอง </div>
							<div className={styles.input}>
								<div className={styles.zonetextbox}>
									<input
										type="text"
										value={textfilter}
										onChange={(e) => {
											settextfilter(e.target.value);
										}}
									/>
								</div>
								<div className={styles.zonebtn}>
									<select>
										<option>ทั้งหมด</option>
										<option>ห้อง</option>
									</select>
									<button onClick={() => {}}>
										{' '}
										ค้นหา<SearchIcon />{' '}
									</button>
								</div>
							</div>
						</div>
						<div className={styles.bodytable}>
							<table>
								<tr>
									<th> ห้อง</th>
									<th> อาคาร</th>
									<th> ชั้น</th>
									<th> ประเภทห้อง</th>
									<th> สถานะ</th>
								</tr>
								{rooms
									.filter((room) => (room && room.status === 'จอง') || room.status === 'ห้องว่าง')
									.map(
										(room, index) =>
											room ? (
												<tr
													onClick={() => {
														setselectedroom(room);
														


														
													}}
													style={{
														background:  (selectedroom && selectedroom.id === room.id) ? 'lightgray' : 'none'
													}}
												>
													<td>{room.name ? room.name : '---'}</td>
													<td>{room.building ? room.building : '---'}</td>
													<td>{room.floor ? room.floor : '---'}</td>
													<td>{room.RoomType ? room.RoomType : '---'}</td>
													<td>{room.status ? room.status : '---'}</td>
												</tr>
											) : null
									)}
							</table>
						</div>
					</div>
				</div>

				<div className={styles.bigbox}>
					<div className={styles.formroom}>
						<div className={styles.header}>
							<label>ย้ายเข้า</label>
						</div>
						<div className={styles.body}>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>เลขที่สัญญา</label>
								</div>
								<div className={styles.input}>
									<input type="text" id="checkinnumber"  onChange={handlechangeformcheckin}/>
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>วันที่ทำสัญญา</label>
								</div>
								<div className={styles.input}>
									<input type="date"  id="checkindate" onChange={handlechangeformcheckin}/>
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>ประเภทการเช่า</label>
								</div>
								<div className={styles.input}>
									<select id="checkintype" onChange={handlechangeformcheckin} >
										<option>รายวัน</option>
										<option>รายเดือน</option>
									</select>
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>ระยะเวลาเช่า</label>
								</div>
								<div className={styles.input}>
									<input type="text"   id="rental_period" />
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>เงินจองห้อง</label>
								</div>
								<div className={styles.input}>
									<input type="text"  id="rental_deposit"/>
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>จำนวนวัน</label>
								</div>
								<div className={styles.input}>
									<input type="text" id="rental_period_day" />
								</div>
							</div>
						</div>
					</div>

					<div className={styles.formroom}>
						<div className={styles.header}>
							<label>ย้ายเข้า</label>
						</div>
						<div className={styles.body}>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>คำนำหน้า</label>
								</div>
								<div className={styles.input}>
									<select  id="nametitle" value={formmember.nametitle}  onChange={handlechangeformmember}>
										<option>นาย</option>
										<option>นาง</option>
										<option>นางสาว</option>
									</select>
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>ชื่อ</label>
								</div>
								<div className={styles.input}>
									<input id="name" type="text" value={formmember.name}  onChange={handlechangeformmember} />
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>นามสกุล</label>
								</div>
								<div className={styles.input}>
									<input type="text" id="lastname" value={formmember.lastname}  onChange={handlechangeformmember} />
								</div>
							</div>
							<div className={styles.row}>
                                <div className={styles.label} >    
								    <label>บัตรประชาชน</label>
                                </div>
								<div className={styles.input}>
									<input type="text" id="personalid" value={formmember.personalid}   onChange={handlechangeformmember} />
								</div>
							</div>
							<div className={styles.row}>
                                <div className={styles.label} >    
								    <label>เลขประจำตัวผู้เสียภาษี</label>
                                </div>
								<div className={styles.input}>
									<input type="text" id="taxnumber"  value={formmember.taxnumber}   onChange={handlechangeformmember}/>
								</div>
							</div>
							<div className={styles.row}>
                                <div className={styles.label} >    
								    <label>สาขา</label>
                                </div>
								<div className={styles.input}>
									<input type="text" id="branch"  value={formmember.branch}   onChange={handlechangeformmember}/>
								</div>
							</div>
							<div className={styles.row}>
                                 <div className={styles.label} >    
								    <label>ที่อยู่ตามบัตรประชาชน</label>
                                </div>
                                <div className={styles.input}>
								    <input type="text"  id="address" value={formmember.address}   onChange={handlechangeformmember} />
                                </div>
							</div>
							<div className={styles.row}>
                                 <div className={styles.label} >    
								    <label>เบอร์ติดต่อ</label>
                                </div>
                                <div className={styles.input}>
								    <input type="text"  id="tel" value={formmember.tel}   onChange={handlechangeformmember} />
                                </div>
							</div>
							<div className={styles.row}>
                                <div className={styles.label} >    
								    <label>ทะเบียนรถ</label>
                                </div>
                                <div className={styles.input}>
								    <input type="text"  id="car_registration" value={formmember.car_registration}   onChange={handlechangeformmember} />
                                </div>
							</div>
							<div className={styles.row}>
                                <div className={styles.label} >    
								    <label>หมายเหตุ</label>
                                </div>
                                <div className={styles.input}>
								    <input type="text"  id="note" value={formmember.note}   onChange={handlechangeformmember} />
                                </div>
							</div>
						</div>
					</div>
					<div className={styles.formroom}>
						<div className={styles.header}>
							<label>ผู้อาศัย</label>
						</div>
                        <div className={styles.body}>
                            <div className={styles.rowtable}>
                                <div className={styles.tableroommember}>
									<TableRoomMember  data={selectedroom}/> 
								</div>
							
                            </div>
                            <div  className={styles.rowmenu} >
                                <button>เพิ่ม</button>
								<button onClick={ async ()=>{ 
									// upload Room status
									let _room = selectedroom
									if(_room && _room.id){
										let _res = await updateRoom({
												variables: {
													id: _room.id,
													input: {
														status:"มีคนอยู่"
													}
												}
											});
										if(_res){
											console.log('update status Room ')
											// reface page
										}
									}
					
								} }>บันทึก</button>
                            </div>
                        </div>
						
                        
					</div>
				</div>
			</div>
		</div>
	);
};
