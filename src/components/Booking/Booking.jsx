import { useEffect, useState } from 'react';

import styles from './Booking.module.css';
import { API_queryRooms, API_queryBuildings, API_updateMeterRoomkwh, API_updateMeterRoomwater } from '../../API/index';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

import { Tablebooking } from './Tablebooking/Tablebooking';

import { formatDate } from '../../general_functions/convert';
import { useQuery, useMutation } from '@apollo/client';
import {
	API_GET_Booking,
	API_ADD_Booking,
	API_DELETE_Booking,
	API_UPDATE_Booking
} from '../../API/Schema/Booking/Booking';

const getRooms = async () => {
	return new Promise(async (resolve, reject) => {
		let res = await API_queryRooms();
		let table = [];
		if (res && res.status === 200) {
			console.log(res.data.rooms);
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

					RoomType : data.RoomType ? data.RoomType  : "---",
					nameroomtype : data.RoomType ? data.RoomType.name  : "---",
					monthlyprice: data.RoomType ? data.RoomType.monthlyprice  : "---",
					dailyprice: data.RoomType ? data.RoomType.dailyprice  : "---",
					insurance: data.RoomType ? data.RoomType.insurance  : "---",
					deposit_rent: data.RoomType ? data.RoomType.deposit_rent  : "---",

				};
			});
		}

		resolve(table);
	}).catch((e) => {
		console.log('Promise Error', e);
		return [];
	});
};

export const Booking = () => {
	//  const { loading, error, data } = useQuery(API_GET_Booking);

	const booking = useQuery(API_GET_Booking);

	const [ createBooking, mutationcreatebook ] = useMutation(API_ADD_Booking);

	const [ deleteBooking, mutation_deletebook ] = useMutation(API_DELETE_Booking);

	const [ updateBooking, mutation_updatebook ] = useMutation(API_UPDATE_Booking);

	const [ textfilter, settextfilter ] = useState('');
	const [ rooms, setrooms ] = useState([]);
	const [ loadingpage, setloadingpage ] = useState(false);
	const [ selectedroom, setselectedroom ] = useState(null);

	const [ action, setaction ] = useState('create');

	const setdefault_forminput = () => {
		setformbooking({
			id: null,
			booking_number:'',
			customer_name: '',
			customer_lastname: '',
			customer_tel: '',
			deposit: '',
			checkin_date: '',
			checkin_date_exp: '',
			note: '',
			status: '',
			receipt_number: '',
			Room:'',
		});
		setselectedroom(null)
		setformroom({
			name: '',
			building: '',
			floor: '',
			nameroomtype: '',
			monthlyprice: '',
			insurance:'',
			dailyprice: '',
			deposit_rent: ''
		})
	};

	const [ formbooking, setformbooking ] = useState({
		id: null,
		booking_number:'',
		customer_name: '',
		customer_lastname: '',
		customer_tel: '',
		deposit: '',
		checkin_date: '',
		checkin_date_exp: '',
		note: '',
		status: '',
		receipt_number: ''
	});

	const [ formroom, setformroom ] = useState({
		name: '',
		building: '',
		floor: '',
		nameroomtype: '',
		monthlyprice: '',
		dailyprice: '',
		insurance: '',
		deposit_rent: ''
	});
	const handleChangedALLformroom = (room) => {
		if (room) {
			let _formroom = formroom;
			for (const property in room) {
				console.log(property, _formroom[property], room);
				if (property && _formroom.hasOwnProperty(property)) {
					_formroom[property] = room[property];
				}
			}

			setformroom(_formroom);
		}
	};
	const handleChangedformroom = (e) => {
		let _formroom = formroom;
		if (e.target.id && _formroom[e.target.id]) {
			_formroom[e.target.id] = e.target.value;
			setformbooking({ ..._formroom });
		}
	};
	const handleChangedformbooking = (e) => {
		let _formbooking = formbooking;
		console.log('e', e.target.value, e.target.id, _formbooking[e.target.id]);

		if (e.target.id && _formbooking.hasOwnProperty(e.target.id)) {
			_formbooking[e.target.id] = e.target.value;
			setformbooking({ ..._formbooking });
		}
	};

	useEffect(
		() => {
			async function fetchData() {
				let Rooms = await getRooms();
				console.log('Rooms', Rooms);
				setrooms(Rooms);
			}
			fetchData();
			setloadingpage(true);
		},
		[ loadingpage ]
	);
	// console.log('rooms', rooms);
	// console.log('selectedroom', selectedroom);
	return (
		<div>
			<div className={styles.zone1}>
				<div className={styles.bigbox}>
					<div className={styles.tableroomselect}>
						<div className={styles.headertable}>
							<div className={styles.text}> รายการห้องว่างและย้ายออก </div>
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

						<div className={styles.zonetable}>
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
										.filter(
											(room) => (room && room.status === 'ย้ายออก') || room.status === 'ห้องว่าง'
										)
										.map(
											(room, index) =>
												room ? (
													<tr
														onClick={() => {
															setselectedroom(room.id);
															handleChangedALLformroom(room);
														}}
														style={{
															background: selectedroom === room.id ? 'lightgray' : 'none'
														}}
													>
														<td>{room.name ? room.name : '---'}</td>
														<td>{room.building ? room.building : '---'}</td>
														<td>{room.floor ? room.floor : '---'}</td>
														<td>{room.RoomType ? room.RoomType.name : '---'}</td>
														<td>{room.status ? room.status : '---'}</td>
													</tr>
												) : null
										)}
								</table>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.bigbox}>
					<div>
						<div className={styles.form_input}>
							<div className={styles.header}>จองห้อง</div>
							<div className={styles.body}>
								<div>
									<div>
										<label> หมายเลขใบจอง </label>
									</div>
									<div className={styles.input}>
										<input
											id="booking_number"
											type="text"
											value={formbooking.booking_number}
											onChange={handleChangedformbooking}
										/>
									</div>
								</div>
								<div>
									<div>
										<label> คำนำหน้า </label>
									</div>
									<div>
										<select>
											<option>นาย</option>
											<option>นาง</option>
											<option>นางสาว</option>
										</select>
									</div>
								</div>
								<div>
									<div>
										<label> ชื่อ </label>
									</div>
									<div className={styles.input}>
										<input
											id="customer_name"
											type="text"
											value={formbooking.customer_name}
											onChange={handleChangedformbooking}
										/>
									</div>
								</div>
								<div>
									<div>
										<label> นามสกุล </label>
									</div>
									<div>
										<input
											id="customer_lastname"
											type="text"
											value={formbooking.customer_lastname}
											onChange={handleChangedformbooking}
										/>
									</div>
								</div>
								<div>
									<div>
										<label> เบอร์ติดต่อ </label>
									</div>
									<div>
										<input
											id="customer_tel"
											type="text"
											value={formbooking.customer_tel}
											onChange={handleChangedformbooking}
										/>
									</div>
								</div>
								<div>
									<div>
										<label> เงินจองห้อง </label>
									</div>
									<div>
										<input
											id="deposit"
											type="text"
											value={formbooking.deposit}
											onChange={handleChangedformbooking}
										/>
									</div>
								</div>
								<div>
									<div>
										<label> วันที่ต้องการย้ายเข้า </label>
									</div>
									<div>
										<input
											id="checkin_date"
											type="date"
											value={formbooking.checkin_date}
											onChange={handleChangedformbooking}
										/>
									</div>
								</div>
								<div>
									<div>
										<label> วันครบกำหนดการจอง </label>
									</div>
									<div>
										<input
											id="checkin_date_exp"
											type="date"
											value={formbooking.checkin_date_exp}
											onChange={handleChangedformbooking}
										/>
									</div>
								</div>
								<div>
									<div>
										<label> หมายเหตุ </label>
									</div>
									<div>
										<input
											id="note"
											type="text"
											value={formbooking.note}
											onChange={handleChangedformbooking}
										/>
									</div>
								</div>
							</div>
						</div>

						<div className={styles.form_input}>
							<div className={styles.header}>ห้อง</div>
							<div className={styles.body_inputroom}>
								<div>
									<div>
										<div>
											<label> ชื่อห้อง </label>
										</div>
										<div>
											<input
												id="name"
												type="text"
												value={formroom.name}
												onChange={handleChangedformroom}
											/>
										</div>
									</div>
									<div>
										<div>
											<label> ค่าเช่ารายเดือน </label>
										</div>
										<div className={styles.input}>
											<input id="monthlyprice" value={formroom.monthlyprice} type="text" onChange={handleChangedformroom} />
										</div>
									</div>
								</div>
								<div>
									<div>
										<div>
											<label> อาคาร </label>
										</div>
										<div>
											<input
												id="building"
												type="text"
												value={formroom.building}
												onChange={handleChangedformroom}
											/>
										</div>
									</div>
									<div>
										<div>
											<label> ค่าประกัน</label>
										</div>
										<div className={styles.input}>
											<input type="text"  value={formroom.insurance} onChange={handleChangedformroom} />
										</div>
									</div>
								</div>
								<div>
									<div>
										<div>
											<label> ชั้น </label>
										</div>
										<div>
											<input
												id="floor"
												type="text"
												value={formroom.floor}
												onChange={handleChangedformroom}
											/>
										</div>
									</div>
									<div>
										<div>
											<label> ค่าเช่าล้วงหน้า </label>
										</div>
										<div className={styles.input}>
											<input  value={formroom.deposit_rent} type="text" />
										</div>
									</div>
								</div>
								<div>
									<div>
										<div>
											<label> ประเภทห้อง </label>
										</div>
										<div>
											<input 
											value={formroom.nameroomtype} 
											type="text" />
										</div>
									</div>
									<div>
										<div>
											<label> ค่าเช่ารายวัน </label>
										</div>
										<div className={styles.input}>
											<input 
											type="text"
											value={formroom.dailyprice}
											 />
										</div>
									</div>
								</div>
							</div>
							<div className={styles.footer_inputroom}>
								<div>
									<button
										onClick={async () => {
											console.log('send update', formbooking);
											let  _res = null
											if (formbooking.id) {
											
												_res = await updateBooking({
													variables: {
														id: formbooking.id,
														input: {
															customer_name: formbooking.customer_name,
															customer_lastname: formbooking.customer_lastname,
															customer_tel: formbooking.customer_tel,
															deposit: formbooking.deposit,
															checkin_date: formbooking.checkin_date,
															checkin_date_exp: formbooking.checkin_date_exp,
															note: formbooking.note,
															status: 's',
															receipt_number: 's',
															Room:selectedroom
														}
													}
												});
											} else {
												_res =  await createBooking({
													variables: {
														input: {
															customer_name: formbooking.customer_name,
															customer_lastname: formbooking.customer_lastname,
															customer_tel: formbooking.customer_tel,
															deposit: formbooking.deposit,
															checkin_date: formbooking.checkin_date,
															checkin_date_exp: formbooking.checkin_date_exp,
															note: formbooking.note,
															status: 's',
															receipt_number: 's',
															Room:selectedroom
														}
													}
												});
											}
										 //>>   communication note <<//
											if(_res && _res.data){
												console.log('record sucess ')
												setdefault_forminput();
												booking.refetch();
											}else{
												console.log('record Error ')
											}
										}}
									>
										{' '}
										<SaveIcon />{' '}
									</button>
									<button onClick={() => {}}>
										{' '}
										<EditIcon />{' '}
									</button>
									<button onClick={() => {}}>
										{' '}
										<DeleteIcon />{' '}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.zone2}>
				<div className={styles.bigboxtable}>
					<Tablebooking
						loading={booking.loading}
						data={booking.data}
						handlerdelete={(_booking) => {
							console.log('delete', _booking.id);
							//TODO: TEST  booking.refetch()
							let res = deleteBooking({ variables: { id: _booking.id } });
							if(res){
							booking.refetch();
							}else{
								console.log('elete Error')
							}
						}}
						handleredit={(_booking) => {
							console.log('update', _booking);
							//setformroom()
					
							setformbooking({
								id: _booking.id,
								customer_name: _booking.customer_name,
								customer_lastname: _booking.customer_lastname,
								customer_tel: _booking.customer_tel,
								deposit: _booking.deposit,
								checkin_date: formatDate(
									new Date(_booking.checkin_date ? Number(_booking.checkin_date) : Number(0))
								),
								checkin_date_exp: formatDate(
									new Date(_booking.checkin_date ? Number(_booking.checkin_date_exp) : Number(0))
								),
								note: _booking.note,
								status: _booking.status,
								receipt_number: _booking.receipt_number
							});
							if(_booking && _booking.Room)
							{
								setselectedroom(_booking.Room.id);
								handleChangedALLformroom(
									{
										name:_booking.Room.name,
										floor:_booking.Room.floor.name,
										building:_booking.Room.floor.building.name,
										nameroomtype: _booking.Room.RoomType.name,
										monthlyprice : _booking.Room.RoomType.monthlyprice,
										dailyprice : _booking.Room.RoomType.dailyprice,
										insurance: _booking.Room.RoomType.insurance,
										deposit_rent: _booking.Room.RoomType.deposit_rent
									}
								);
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
};
