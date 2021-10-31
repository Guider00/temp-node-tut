import { useEffect, useState } from 'react';

import styles from './Checkin.module.css';
import { API_queryRooms, API_queryBuildings, API_updateMeterRoomkwh, API_updateMeterRoomwater } from '../../API/index';
import SearchIcon from '@material-ui/icons/Search';

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
					meterroom: data.meterroom ? data.meterroom : '---'
				};
			});
		}

		resolve(table);
	}).catch((e) => {
		console.log('Promise Error', e);
		return [];
	});
};

export const Checkin = () => {
	const [ textfilter, settextfilter ] = useState('');
	const [ rooms, setrooms ] = useState([]);
	const [ loading, setloading ] = useState(false);
	const [ selectedroom, setselectedroom ] = useState(null);
	useEffect(
		() => {
			async function fetchData() {
				let Rooms = await getRooms();
				console.log('Rooms', Rooms);
				setrooms(Rooms);
			}
			fetchData();
			setloading(true);
		},
		[ loading ]
	);
	console.log('rooms', rooms);
	console.log('selectedroom', selectedroom);
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
														setselectedroom(room.id);
													}}
													style={{
														background: selectedroom === room.id ? 'lightgray' : 'none'
													}}
												>
													<td>{room.name ? room.name : '---'}</td>
													<td>{room.building ? room.building : '---'}</td>
													<td>{room.floor ? room.floor : '---'}</td>
													<td>{room.type ? room.type : '---'}</td>
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
									<input type="text" />
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>วันที่ทำสัญญา</label>
								</div>
								<div className={styles.input}>
									<input type="date" />
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>ประเภทการเช่า</label>
								</div>
								<div className={styles.input}>
									<select>
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
									<input type="text" />
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>เงินจองห้อง</label>
								</div>
								<div className={styles.input}>
									<input type="text" />
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>จำนวนวัน</label>
								</div>
								<div className={styles.input}>
									<input type="text" />
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
									<select>
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
									<input type="text" />
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>นามสกุล</label>
								</div>
								<div className={styles.input}>
									<input type="text" />
								</div>
							</div>
							<div className={styles.row}>
                                <div className={styles.label} >    
								    <label>บัตรประชาชน</label>
                                </div>
								<div className={styles.input}>
									<input type="text" />
								</div>
							</div>
							<div className={styles.row}>
                                <div className={styles.label} >    
								    <label>เลขประจำตัวผู้เสียภาษี</label>
                                </div>
								<div className={styles.input}>
									<input type="text" />
								</div>
							</div>
							<div className={styles.row}>
                                <div className={styles.label} >    
								    <label>สาขา</label>
                                </div>
								<div className={styles.input}>
									<input type="text" />
								</div>
							</div>
							<div className={styles.row}>
                                 <div className={styles.label} >    
								    <label>ที่อยู่ตามบัตรประชาชน</label>
                                </div>
                                <div className={styles.input}>
								    <input type="text" />
                                </div>
							</div>
							<div className={styles.row}>
                                 <div className={styles.label} >    
								    <label>เบอร์ติดต่อ</label>
                                </div>
                                <div className={styles.input}>
								    <input type="text" />
                                </div>
							</div>
							<div className={styles.row}>
                                <div className={styles.label} >    
								    <label>ทะเบียนรถ</label>
                                </div>
                                <div className={styles.input}>
								    <input type="text" />
                                </div>
							</div>
							<div className={styles.row}>
                                <div className={styles.label} >    
								    <label>หมายเหตุ</label>
                                </div>
                                <div className={styles.input}>
								    <input type="text" />
                                </div>
							</div>
						</div>
					</div>
					<div className={styles.formroom}>
						<div className={styles.header}>
							<label>ผู้อาศัย</label>
						</div>
                        <div className={styles.body}>
                            <div className={styles.row}>
                                <div className={styles.table}>Table Member</div>
                            </div>
                            <div  className={styles.rowmenu} >
                                <button>เพิ่ม</button>
                            </div>
                        </div>
						
                        
					</div>
				</div>
			</div>
		</div>
	);
};
