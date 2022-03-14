import React from "react";

import { useEffect, useState } from 'react';

import { useMediaQuery } from 'react-responsive'

import styles from './Booking.module.css';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
 import EditIcon from '@material-ui/icons/Edit';

import { ModalAlert } from '../../subcomponents/ModalAlert/ModalAlert';

import { Tablebooking } from './Tablebooking/Tablebooking';
import { formatDate } from '../../general_functions/convert';

import { useQuery, useMutation } from '@apollo/client';

import { export_booking_pdf, export_Receipt_pdf } from '../../general_functions/pdf/export/export_pdf';

import CalendarPicker from '../../subcomponents/Calendar/Calendar.js';
import EventNoteIcon from '@mui/icons-material/EventNote';


import {
	API_GET_Booking,
	API_ADD_Booking,
	API_DELETE_Booking,
	API_UPDATE_Booking,
	API_DELETE_Booking_and_BookinginRoom
} from '../../API/Schema/Booking/Booking';
import {
	API_GET_Rooms
} from '../../API/Schema/Room/Room';
import {
	SingleUpload,
} from '../../API/Schema/UploadFile/UploadFile';
import {
	API_UPDATE_Room
} from '../../API/Schema/Room/Room'

import {
 toYYYYMMDD
} from '../../general_functions/convert'

const filter_rooms = (rooms, options_search) => {
	let _filter_table = []
	if (rooms && options_search) {
		_filter_table = rooms.filter(room => {
				console.log('debug',(options_search.text === ''),room,options_search.keyword)
			if (room) {
				if (options_search.keyword === 'ทั้งหมด') {
					return (room.name && room.name.search(options_search.text) !== -1) ||
						( room.floor && room.floor.building && room.floor.building.name && room.floor.building.name.search(options_search.text) !== -1) ||
						(room.floor && room.floor.name  &&room.floor.name.search(options_search.text) !== -1) ||
						(room.RoomType && room.RoomType.name && room.RoomType.name.search(options_search.text) !== -1) ||
						(options_search.text === '')
						;
				} else if (options_search.keyword === 'ห้อง') {
					return (room.name.search(options_search.text) !== -1 ||
						(options_search.text === '')
					)
				} else if (options_search.keyword === 'อาคาร') {
					return (room.floor && room.floor.building &&  room.floor.building.name.search(options_search.text) !== -1) ||
						(options_search.text === '')
				} else if (options_search.keyword === 'ชั้น') {
					return (room.floor && room.floor.name.search(options_search.text) !== -1) ||
						(options_search.text === '')
				} else if (options_search.keyword === 'ประเภทห้อง') {
					return (room.RoomType && room.RoomType.name && room.RoomType.name.search(options_search.text) !== -1) ||
						(options_search.text === '')
				} else {
					return false;
				}
			} else {
				return false;
			}
		})
	}
	return _filter_table
}

/*
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

					RoomType: data.RoomType ? data.RoomType : "---",
					nameroomtype: data.RoomType ? data.RoomType.name : "---",
					monthlyprice: data.RoomType ? data.RoomType.monthlyprice : "---",
					dailyprice: data.RoomType ? data.RoomType.dailyprice : "---",
					insurance: data.RoomType ? data.RoomType.insurance : "---",
					deposit_rent: data.RoomType ? data.RoomType.deposit_rent : "---",

				};
			});
		}

		resolve(table);
	}).catch((e) => {
		console.log('Promise Error', e);
		return [];
	});
};
*/
export const Booking = () => {

	const isDesktop = useMediaQuery({
		query: "(min-width: 1224px)"
	});
	const isTablet = useMediaQuery({
		query: "(max-width: 1224px)"
	});
	//  const { loading, error, data } = useQuery(API_GET_Booking);

	const booking = useQuery(API_GET_Booking);
	const api_rooms = useQuery(API_GET_Rooms);


	const [updateRoom] = useMutation(API_UPDATE_Room)

	const [uploadFile] = useMutation(SingleUpload);

	const [createBooking] = useMutation(API_ADD_Booking);

	const [deleteBooking_and_BookinginRoom] = useMutation(API_DELETE_Booking_and_BookinginRoom);
	const [deleteBooking] = useMutation(API_DELETE_Booking);

	const [updateBooking] = useMutation(API_UPDATE_Booking);

	// const [textfilter, settextfilter] = useState('');

	const [alert, setalert] = useState({

		show: false,
		item: null,
		message: ""
	})
	const [rooms, setrooms] = useState([]);
	const [loadingpage, setloadingpage] = useState(false);
	const [selectedroom, setselectedroom] = useState(null);

	const [options_search, setoptions_search] = useState({
		text: "",
		keyword: "ทั้งหมด",
		roomtype: "ทั้งหมด",
	})
	const [roomType_search, setRoomType_search] = useState({
		roomtype: "ทั้งหมด",
	})

	// const [action, setaction] = useState('create');


	const setdefault_forminput = () => {
		setformbooking({
			id: null,
			booking_number: '',
			customer_name: '',
			customer_lastname: '',
			customer_tel: '',
			customer_address: '',
			taxnumber: '',
			payment_method: "",
			deposit: '',
			checkin_date: '',
			checkin_date_exp: '',
			note: '',
			status: '',
			receipt_number: '',
			confirm_booking: '',
			Room: '',
		});
		setselectedroom(null)
		setformroom({
			name: '',
			building: '',
			floor: '',
			nameroomtype: '',
			monthlyprice: '',
			insurance: '',
			dailyprice: '',
			deposit_rent: ''
		})
	};

	const [formbooking, setformbooking] = useState({
		id: null,
		booking_number: '',
		customer_name: '',
		customer_lastname: '',
		customer_tel: '',
		customer_address: '',
		taxnumber: '',
		payment_method: "",
		deposit: '',
		checkin_type: 'รายวัน',
		checkin_date: '',
		checkin_date_exp: '',
		note: '',
		status: '',
		confirm_booking: '',
		receipt_number: ''
	});

	const [formroom, setformroom] = useState({
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
			console.log('debug change form room',room)
			for (const property in _formroom) {
				if (property === 'building' && room['floor']['building'] ) {
					_formroom[property] = room['floor']['building']['name'];
				} else if (property === 'floor') {
					_formroom[property] = room['floor']['name'];
				} else if (property === 'nameroomtype') {
					_formroom[property] = room['RoomType']['name'];
				} else if (property === 'dailyprice') {
					_formroom[property] = room['RoomType']['dailyprice'];
				} else if (property === 'monthlyprice') {
					_formroom[property] = room['RoomType']['monthlyprice'];
				} else if (property === 'insurance') {
					_formroom[property] = room['RoomType']['insurance'];
				} else if (property === 'deposit_rent') {
					_formroom[property] = room['RoomType']['deposit_rent'];
				} else {
					_formroom[property] = room[property];
				}
			}

			setformroom(_formroom);
		}
	};
	const handleChangedformroom = (e) => {
		let _formroom = formroom;
		if (e.target.id === 'name' || e.target.id === 'building' || e.target.id === 'floor' || e.target.id === 'nameroomtype') {
			let text = /[^0-9a-zA-Zก-๙]/ig;
			e.target.value = e.target.value.replace(text, '')
			_formroom[e.target.id] = e.target.value;
			setformbooking({ ..._formroom });
			console.log('_formroom', _formroom)
		} else if (e.target.id === 'monthlyprice') {
			let text = /[^0-9]/ig;
			e.target.value = e.target.value.replace(text, '')
			_formroom[e.target.id] = e.target.value;
			setformbooking({ ..._formroom });
			console.log('_formroom', _formroom)

		} else {
			_formroom[e.target.id] = e.target.value;
			setformbooking({ ..._formroom });
			console.log('_formroom', _formroom)

		}
	};
	const [error] = useState({})


	//ฟังก์ชั่นแจ้งเตือนกรณีลืมกรอก Data
	const placeholder = (e) => {
		let id = (e.target.id).split("_")
		if (!e.target.value) {
			if (id[1] === undefined) {
				return e.target.placeholder = `${id[0]} not require`

			} else {
				return e.target.placeholder = `${id[1]} not require`
			}

		}

	}
	const handleChangedformbooking = (e) => {
		let _formbooking = formbooking;
		console.log('e', e.target.value, e.target.id, _formbooking[e.target.id]);

		placeholder(e)
		console.log('error', error)
		if (e.target.id && _formbooking.hasOwnProperty(e.target.id)) {
			if (e.target.id === 'customer_name' || e.target.id === 'customer_lastname') {

				let text = /[^0-9\u0E00-\u0E7Fa-zA-Z' ./\n]/ig;
				e.target.value = e.target.value.replace(text, '')
				_formbooking[e.target.id] = e.target.value;
				setformbooking({ ..._formbooking });
			} else if (e.target.id === 'customer_address') {

				let text = /[^0-9\u0E00-\u0E7Fa-zA-Z' ./\n]/ig;
				e.target.value = e.target.value.replace(text, '')
				_formbooking[e.target.id] = e.target.value;
				setformbooking({ ..._formbooking });

			} else if (e.target.id === 'customer_tel' || e.target.id === 'deposit') {
				let text = /[^\d+(\d)?\d*$]/ig;
				e.target.value = e.target.value.replace(text, '')
				_formbooking[e.target.id] = e.target.value;
				setformbooking({ ..._formbooking });

			} else if (e.target.id === 'booking_number') {
				let text = /[^0-9a-zA-Z]/ig;
				e.target.value = e.target.value.replace(text, '')
				_formbooking[e.target.id] = e.target.value;
				setformbooking({ ..._formbooking });
			} else if (e.target.id === 'taxnumber') {
				let text = /[^0-9a-zA-Z]/ig;
				e.target.value = e.target.value.replace(text, '')
				_formbooking[e.target.id] = e.target.value;
				setformbooking({ ..._formbooking });
			}
			else {
				_formbooking[e.target.id] = e.target.value;
				setformbooking({ ..._formbooking });

			}

		}
	};




	//Calendar


	const [defaultCalendar, setdefaultCalendar] = useState({
		isLoading: false
	});
	const [DateStart, setDateStart] = useState( toYYYYMMDD ( (new Date()) ) )
	const [DateEnd, setDateEnd] = useState(     toYYYYMMDD (   (new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ))  )
	const [DateRange, setDateRange] = useState([])

	console.log('debug DateEnd',DateEnd)
	const handleCalendar = (isLoading) => {
		setdefaultCalendar({
			isLoading: isLoading,
		})
	}

	const handleStart = (data) => {
		setDateRange(data)
		console.log(" debug DateRange", DateRange)
	}

	const CalendarDate = (selecteddate) => {
		console.log('debug', selecteddate)

		if (selecteddate) {
			if (selecteddate.from === null) {
				setDateStart('')
			} else {
				let iDay = parseInt(selecteddate.from.day, 10);
				let iMonth = parseInt(selecteddate.from.month, 10);

				if (iDay < 10 && iMonth < 10) {
					let _DateStart = DateStart
					_DateStart = selecteddate.from.year + "-0" + selecteddate.from.month + "-0" + selecteddate.from.day
					setDateStart(_DateStart)

				} if (iDay < 10 && iMonth >= 10) {
					let _DateStart = DateStart
					_DateStart = selecteddate.from.year + "-" + selecteddate.from.month + "-0" + selecteddate.from.day
					setDateStart(_DateStart)

				} if (iDay >= 10 && iMonth < 10) {
					let _DateStart = DateStart
					_DateStart = selecteddate.from.year + "-0" + selecteddate.from.month + "-" + selecteddate.from.day
					setDateStart(_DateStart)

				}
			}

		}
		if (selecteddate) {
			if (selecteddate.to === null) {
				setDateEnd('')
			} else {

				let iDay = parseInt(selecteddate.to.day, 10);
				let iMonth = parseInt(selecteddate.to.month, 10);

				if (iDay < 10 && iMonth < 10) {
					let _DateEnd = DateEnd
					_DateEnd = selecteddate.to.year + "-0" + selecteddate.to.month + "-0" + selecteddate.to.day
					setDateEnd(_DateEnd)

				} if (iDay < 10 && iMonth >= 10) {
					let _DateEnd = DateEnd
					_DateEnd = selecteddate.to.year + "-" + selecteddate.to.month + "-0" + DateRange.to.day
					setDateEnd(_DateEnd)

				} if (iDay >= 10 && iMonth < 10) {
					let _DateEnd = DateEnd
					_DateEnd = selecteddate.to.year + "-0" + selecteddate.to.month + "-" + selecteddate.to.day
					setDateEnd(_DateEnd)

				}
			}

		}
		if (selecteddate && selecteddate.from === null && selecteddate.to === null) {

		} else {
			handleCalendar(false);
		}


	}


	//Calendar

	useEffect(
		() => {
			// async function fetchData() {
			// 	let Rooms = await getRooms();
			// 	console.log('Rooms', Rooms);
			// 	//	setrooms(Rooms);
			// }


			// fetchData();
			setloadingpage(true);


		},
		[loadingpage, DateRange]
	);
	useEffect(() => {
		console.log('debug',api_rooms)
		if (api_rooms.data) {
		
			if (api_rooms.data.Rooms && api_rooms.data.Rooms.length) {

				let start_date = DateStart ? new Date(DateStart) : new Date()
				let end_date = DateEnd ? new Date(DateStart) : new Date()
				start_date = start_date.getTime()
				end_date = end_date.getTime()
			
				let roomschedules = api_rooms.data.Rooms.map((room) => {
					let { bookings, checkin } = room
						console.log("debug bookings", bookings)
					let _schbooking = bookings.map((booking) => {
						if(booking){
							let { checkin_date, checkin_date_exp, checkin_type } = booking;

							return ({
								"checkin_date": checkin_date ? new Date(Number(checkin_date)).getTime() : checkin_date,
								"checkin_date_exp": checkin_date_exp ? new Date(Number(checkin_date_exp)).getTime() : checkin_date_exp,
								"checkin_type": checkin_type,
								booking: booking
							})
						}else{
							return null 
						}
					}).filter(item => item)

					let _schcheckin = {
						"checkin_date": (checkin && checkin.checkin_date) ? new Date(checkin.checkin_date).getTime() : null,
						"checkin_date_exp": (checkin && checkin.checkin_date_exp) ? new Date(checkin.checkin_date_exp).getTime() : null,
						"checkin_type": (checkin && checkin.checkin_type) ? checkin.checkin_type : null,
						"checkin": checkin,
					}

					let sch = null
					sch = [..._schbooking, _schcheckin]
					return { room: room, sch: sch }
				})

				console.log('debug roomschedules', roomschedules)
				let room_support = roomschedules.map((roomschedule) => {
					let { room } = roomschedule
					console.log('room',room)

					// console.log(`debug roomschedule`,roomschedule)
					let condition = roomschedule.sch.map(({ checkin_date_exp, checkin_date, checkin_type }) => {
							 console.log(`debug roomschedule`,checkin_date_exp , end_date , ( checkin_date_exp === null  || (end_date <  checkin_date &&    end_date < checkin_date_exp ) ))

						if (roomType_search.roomtype === 'ทั้งหมด') {
							if (
								//       [จอง] ____________
								//       ________ [วันที่เลือก ]
								(start_date > checkin_date && start_date > checkin_date_exp) &&
								(end_date > checkin_date && end_date > checkin_date_exp)
								&& checkin_type === 'รายวัน') {
								return true
							} else if (
								//        ____________[จอง]
								//       [วันที่เลือก ]________
								(start_date < checkin_date && start_date < checkin_date_exp) &&
								(end_date < checkin_date && end_date < checkin_date_exp) &&
								checkin_type === 'รายวัน'
							) {
								return true
							} else if (
								//       _____________[จอง รายเดือน]_
								//       _[วันที่เลือก ]______________
								(start_date < checkin_date && (start_date < checkin_date_exp || checkin_date_exp === null)) &&
								(checkin_date_exp === null || (end_date < checkin_date && end_date < checkin_date_exp)) &&
								checkin_type === 'รายเดือน'
							) {
								return true
							} else if (
								// new room 
								checkin_date_exp === null && checkin_date === null && checkin_type === null
							) {
								return true
							}
							else {
								return false
							}

						} else if (roomType_search.roomtype === 'รายวัน') {
							if (
								//       [จอง] ____________
								//       ________ [วันที่เลือก ]
								(start_date > checkin_date && start_date > checkin_date_exp) &&
								(end_date > checkin_date && end_date > checkin_date_exp)
								&& checkin_type === 'รายวัน') {
								return true
							} else if (
								//        ____________[จอง]
								//       [วันที่เลือก ]________
								(start_date < checkin_date && start_date < checkin_date_exp) &&
								(end_date < checkin_date && end_date < checkin_date_exp) &&
								checkin_type === 'รายวัน'
							) {
								return true
							} else if (
								// new room 
								checkin_date_exp === null && checkin_date === null && checkin_type === null
							) {
								return true
							}
							else {
								return false
							}

						} else if (roomType_search.roomtype === 'รายเดือน') {
							if (
								//       _____________[จอง รายเดือน]_
								//       _[วันที่เลือก ]______________
								(start_date < checkin_date && (start_date < checkin_date_exp || checkin_date_exp === null)) &&
								(checkin_date_exp === null || (end_date < checkin_date && end_date < checkin_date_exp)) &&
								checkin_type === 'รายเดือน'
							) {
								return true
							} else if (
								// new room 
								checkin_date_exp === null && checkin_date === null && checkin_type === null
							) {
								return true
							}
							else {
								return false
							}

						} else {
							return false
						}

					})

					//console.log(`debug ${roomschedule.room.name}`,condition)

					roomschedule.condition = Boolean(condition.reduce((previousValue, currentValue) => previousValue & currentValue))

					return roomschedule
				}).filter(item => item.condition === true)
				let _rooms = room_support.map(({ room }) => {
					return room
				})
				console.log('debug room_support',options_search, _rooms)
				let _filter_rooms = filter_rooms(_rooms, options_search)
				setrooms([..._filter_rooms]);

			}


		}
	}, [api_rooms, api_rooms.data,api_rooms.loading, DateStart, DateEnd, roomType_search,options_search])


	 console.log('debug rooms', rooms);
	// console.log('selectedroom', selectedroom);






	return (
		<div>
			{defaultCalendar.isLoading && <CalendarPicker onCalendar={CalendarDate} start={handleStart}
				selectedStartDate={DateStart ? new Date(DateStart) : DateStart}
				selectedEndDate={DateEnd ? new Date(DateEnd) : DateEnd}
			/>}
			{alert && alert.show ?
				<ModalAlert
					handleaccept={async () => {
						let _alert = alert
						console.log('alert item ', alert)
						try {
							let res = await deleteBooking_and_BookinginRoom({ variables: { id: _alert.item.id, id_room: _alert.item.Room.id } });
							if (res) {
								_alert.show = false
								booking.refetch();
							} else {
								_alert.message = 'Delet Booking Error'
							}
							setalert({ _alert })
						} catch (e) {
							if (_alert.item.Room === null) {
								let res = await deleteBooking({ variables: { id: _alert.item.id, id_room: "" } });
								if (res) {
									_alert.show = false
									booking.refetch();
								} else {
									_alert.message = 'Delet Booking Error'
								}
								setalert({ _alert })
							}
							console.error(e);
						}

					}}
					handleclose={() => {
						let _alert = alert
						_alert.item = null
						_alert.show = false
						setalert({ _alert })
					}} message={(alert && alert.message) ? alert.message : ""}

				/>
				: null}


			<div className={styles.zone1}>
				<div className={styles.bigbox}>
					<div className={styles.tableroomselect}>
						<div className={styles.headertable}>
							<div style={{ fontSize: isDesktop ? '' : isTablet ? '20px' : '' }} className={styles.text}> รายการห้องว่างและย้ายออก </div>
							<div className={styles.input} >
								<div className={styles.zoneselect_checkincheckout} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
									<label> ประเภทห้อง </label>
									<select
										className={styles.roomType}
										name="input_roomtype"
										onChange={(e) => {
											let _roomType_search = roomType_search
											_roomType_search.roomtype = e.target.value
											setRoomType_search({ ..._roomType_search })
										}}
									>
										<option>ทั้งหมด</option>
										<option>รายวัน</option>
										<option>รายเดือน</option>
									</select>

									 <input 
									className={styles.roomType}
									value={options_search.roomtype}
									type='text' 
									name="input_roomtype" 
									onChange={(e) => {
										let _options_search = options_search
										_options_search.roomtype = e.target.value 
										setoptions_search({..._options_search})
									}}
									/>

									<label> วันที่เข้าพัก </label>
									<input
										type='date'
										name="input_searchdatecheckin"
										max={DateEnd}
										value={DateStart ? DateStart : ''}
										onChange={(e) => {
											let { value } = e.target
											setDateStart(value)
										}} />
									<label> วันที่เข้าย้ายออก </label>
									<input
										type='date'
										name="input_searchdatecheckout"
										min={DateStart}
										value={DateEnd ? DateEnd : ''}
										onChange={(e) => {
											let { value } = e.target
											console.log('debug set end date',value)
											setDateEnd(value)
										}} />
									<button
										onClick={() => {
											setdefaultCalendar({
												isLoading: true
											})
										}}
									><EventNoteIcon /></button>
								</div>
							</div>
							<div className={styles.input}>
								<div className={styles.zonetextbox}>
									<input
										type="text"
										value={options_search.text}
										onChange={(e) => {
											let _options_search = options_search
											_options_search.text = e.target.value
											setoptions_search({ ..._options_search })
										}}
									/>
								</div>
								<div className={styles.zonebtn} >
									<select value={options_search.keyword}
									style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
										onChange={(e) => {

											let _options_search = options_search
											_options_search.keyword = e.target.value
											setoptions_search({ ..._options_search })
										}}

									>
										<option>ทั้งหมด</option>
										<option>ห้อง</option>
										<option>อาคาร</option>
										<option>ชั้น</option>
										<option>ประเภทห้อง</option>

									</select>
									<button 
									style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
									onClick={
										async () => {
										// let Rooms = await getRooms();

										// let _filter_rooms = []
										// console.log('DateStart,DateEnd', DateStart, DateEnd)
										// _filter_rooms = filter_rooms(Rooms, options_search, DateStart, DateEnd)

										// setrooms(_filter_rooms);
									}}>
										{' '}
										ค้นหา<SearchIcon />{' '}
									</button>
								</div>
							</div>
						</div>

						<div className={styles.zonetable}>
							<div className={styles.bodytable}>
								<table>
									<thead>
										<tr>
											<th>ห้อง</th>
											<th>อาคาร</th>
											<th>ชั้น</th>
											<th>ประเภทห้อง</th>
											<th>สถานะ</th>
										</tr>
									</thead>
									<tbody>{rooms.filter(
											(room) => (room && room && room.status === 'ย้ายออก') || room.status === 'ห้องว่าง'
										).map(
											(room, index) =>
												room ? (

													<tr key={index}
														onClick={() => {
															setselectedroom(room);
															handleChangedALLformroom(room);

															console.log('bookingnumber', formbooking,)
															let _formbooking = formbooking
															if (_formbooking.booking_number) {
															} else {
																_formbooking.booking_number = `${Math.random().toString(36).slice(2, 15)}`

															}
															setformbooking(JSON.parse(JSON.stringify(formbooking)))

														}}
														style={{
															background: selectedroom && selectedroom.id === room.id ? 'lightgray' : 'none' ,
															fontSize: isDesktop ? '' : isTablet ? '15px' : '' 
														}}>
														<td>{room && room.name ? room.name : '---'}</td>
														<td>{room && room.floor && room.floor.building ? room.floor.building.name : '---'}</td>
														<td>{room && room.floor ? room.floor.name : '---'}</td>
														<td>{room && room.RoomType ? room.RoomType.name : '---'}</td>
														<td>{room && room.status ? room.status : '---'}</td>
													</tr>
												) : null
										)}</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.bigbox}>
					<div>
						<div className={styles.form_input}>
							<div className={styles.header} style={{ fontSize: isDesktop ? '' : isTablet ? '20px' : '' }}>จองห้อง</div>
							<div className={styles.body} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
								<div>
									<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
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
									<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
										<label> รูปแบบการจอง </label>
									</div>
									<div className={styles.input}>
										<select
											style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
											id="checkin_type"
											value={formbooking.checkin_type}
											onChange={handleChangedformbooking}
										>
											<option>รายวัน</option>
											<option>รายเดือน</option>
										</select>
									</div>
								</div>

								<div>
									<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
										<label> คำนำหน้า </label>
									</div>
									<div>
										<select style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
											<option>นาย</option>
											<option>นาง</option>
											<option>นางสาว</option>
											<option>Mr.</option>
											<option>Ms.</option>
											<option>Mrs.</option>
										</select>
									</div>
								</div>
								<div>
									<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
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
									<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
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
									<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
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
									<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
										<label> ที่อยู่ตามบัตรประชาชน </label>
									</div>
									<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
										<textarea
											cols="25"
											rows="3"
											id="customer_address"
											type="text"
											value={formbooking.customer_address}
											onChange={handleChangedformbooking}
										/>
									</div>
								</div>

								<div>
									<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
										<label> เลขประจำตัวผู้เสียภาษี </label>
									</div>
									<div>
										<input
											id="taxnumber"
											type="text"
											value={formbooking.taxnumber}
											onChange={handleChangedformbooking}
										/>
									</div>
								</div>




								<div>
									<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
										<label> วิธีการชำระเงิน </label>
									</div>
									<div>
										<select
											style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
											id="payment_method"
											type="text"
											value={formbooking.payment_method}
											onChange={handleChangedformbooking}
										>
											<option>เงินสด</option>
											<option>ผ่านบัตร</option>
											<option>โอน</option>
										</select>
									</div>
								</div>
								<div>
									<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
										<label> เงินจองห้อง </label>
									</div>
									<div>
										<input
											style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
											id="deposit"
											type="text"
											value={formbooking.deposit}
											onChange={handleChangedformbooking}
										/>
									</div>
								</div>
								<div>
									<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
										<label> วันที่ต้องการย้ายเข้า </label>
									</div>
									<div>
										<input
											style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
											id="checkin_date"
											type="date"
											value={formbooking && formbooking.checkin_date ? formbooking.checkin_date : ""}
											onChange={handleChangedformbooking}
										/>
									</div>
								</div>
								<div>
									<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
										<label> วันย้ายออก </label>
									</div>
									<div>
										<input
											style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
											id="checkin_date_exp"
											type="date"
											value={formbooking && formbooking.checkin_date_exp ? formbooking.checkin_date_exp : ""}
											onChange={handleChangedformbooking}
										/>
									</div>
								</div>
								<div>
									<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
										<label> หมายเหตุ </label>
									</div>
									<div>
										<input
											style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
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
							<div className={styles.header} style={{ fontSize: isDesktop ? '' : isTablet ? '20px' : '' }}>ห้อง</div>
							<div className={styles.body_inputroom}>
								<div>
									<div>
										<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
											<label> ชื่อห้อง </label>
										</div>
										<div>
											<input
												style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
												id="name"
												type="text"
												value={formroom.name}
												onChange={handleChangedformroom}
											/>
										</div>
									</div>
									<div>
										<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
											<label> ค่าเช่ารายเดือน </label>
										</div>
										<div className={styles.input}>
											<input style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }} id="monthlyprice" value={formroom.monthlyprice} type="text" onChange={handleChangedformroom} />
										</div>
									</div>
								</div>
								<div>
									<div>
										<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
											<label> อาคาร </label>
										</div>
										<div>
											<input
												style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
												id="building"
												type="text"
												value={formroom.building}
												onChange={handleChangedformroom}
											/>
										</div>
									</div>
									<div>
										<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
											<label> ค่าประกัน</label>
										</div>
										<div className={styles.input}>
											<input style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }} type="text" value={formroom.insurance} onChange={handleChangedformroom} />
										</div>
									</div>
								</div>
								<div>
									<div>
										<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
											<label> ชั้น </label>
										</div>
										<div>
											<input
												style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
												id="floor"
												type="text"
												value={formroom.floor}
												onChange={handleChangedformroom}
											/>
										</div>
									</div>
									<div>
										<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
											<label> ค่าเช่าล้วงหน้า </label>
										</div>
										<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }} className={styles.input}>
											<input style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }} defaultValue={formroom.deposit_rent} type="text" />
										</div>
									</div>
								</div>
								<div>
									<div>
										<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
											<label> ประเภทห้อง </label>
										</div>
										<div>
											<input
												style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
												defaultValue={formroom.nameroomtype}
												type="text" />
										</div>
									</div>
									<div>
										<div style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
											<label> ค่าเช่ารายวัน </label>
										</div>
										<div className={styles.input}>
											<input
												style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
												type="text"
												defaultValue={formroom.dailyprice}
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
											let _res = null
											try {
												if (formbooking.id) {

													_res = await updateBooking({
														variables: {
															id: formbooking.id,
															input: {
																booking_number: formbooking.booking_number,
																customer_name: formbooking.customer_name,
																customer_lastname: formbooking.customer_lastname,
																customer_tel: formbooking.customer_tel,
																customer_address: formbooking.customer_address,
																taxnumber: formbooking.taxnumber,
																payment_method: formbooking.payment_method,
																deposit: formbooking.deposit,
																checkin_type: formbooking.checkin_type,
																checkin_date: formbooking.checkin_date,
																checkin_date_exp: formbooking.checkin_date_exp,
																note: formbooking.note,
																status: formbooking.status ? formbooking.status : 'รอการชำระเงิน',
																confirm_booking: formbooking.confirm_booking ? formbooking.confirm_booking : '---',
																receipt_number: formbooking.receipt_number,
																Room: selectedroom.id // << id room 
															}
														}
													});
												} else {
													_res = await createBooking({
														variables: {
															input: {
																booking_number: formbooking.booking_number,
																customer_name: formbooking.customer_name,
																customer_lastname: formbooking.customer_lastname,
																customer_tel: formbooking.customer_tel,
																customer_address: formbooking.customer_address,
																taxnumber: formbooking.taxnumber,
																payment_method: formbooking.payment_method,
																deposit: formbooking.deposit,
																checkin_type: formbooking.checkin_type,
																checkin_date: formbooking.checkin_date,
																checkin_date_exp: formbooking.checkin_date_exp,
																note: formbooking.note,
																status: 'รอการชำระเงิน',
																confirm_booking: formbooking.confirm_booking,
																receipt_number: '',
																Room: selectedroom.id  //<< id room 
															}
														}
													});
												}

												//>>   communication note <<//
												if (_res && _res.data) {
													console.log('record sucess ')
													setdefault_forminput();
													api_rooms.refetch();
													booking.refetch();
												} else {
													console.log('record Error ')
												}
											} catch (e) {
												console.error("can't save booking data ", e)
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
									<button onClick={() => { setdefault_forminput(); }}>
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
						key={'1'}
						loading={booking.loading}
						data={booking.data}
						handlerdelete={(_booking) => {
							console.log('delete', _booking);
							let room_cancel = (_booking.Room && _booking.Room.name) ? _booking.Room.name : '---'
							setalert({ show: true, message: `Cancel Booking Room ${room_cancel}`, item: _booking })

							//TODO: TEST  booking.refetch()
							// let res = deleteBooking({ variables: { id: _booking.id } });
							// if(res){
							// booking.refetch();
							// }else{
							// 	console.log('elete Error')
							// }
						}}
						handleUpdateconfirm_booking={async (_booking) => {
							let _confirm_booking = ((_booking && _booking.confirm_booking === 'ยืนยันการเข้าพัก') ? 'รอการยืนยัน' : 'ยืนยันการเข้าพัก')
							try {
								let _res = await updateBooking({
									variables: {
										id: _booking.id,
										input: {
											confirm_booking: _confirm_booking,
										}
									}
								});
								if (_res) {
									booking.refetch();
								}
							} catch (e) {
								console.log(e)
							}
						}}
						handleUpdatecompletestatus={async (_booking) => {
							let _status = ((_booking && _booking.status === 'สำเร็จ') ? 'รอการชำระเงิน' : 'สำเร็จ')

							let _res = await updateBooking({
								variables: {
									id: _booking.id,
									input: {
										booking_number: _booking.booking_number,
										customer_name: _booking.customer_name,
										customer_lastname: _booking.customer_lastname,
										customer_tel: _booking.customer_tel,
										customer_address: _booking.customer_address,
										taxnumber: _booking.taxnumber,
										payment_method: _booking.payment_method,
										deposit: _booking.deposit,
										checkin_type: _booking.checkin_type,
										checkin_date: _booking.checkin_date,
										checkin_date_exp: _booking.checkin_date_exp,
										note: _booking.note,
										status: _status,
										confirm_booking: _booking.confirm_booking,
										receipt_number: _booking.receipt_number,
										Room: _booking.Room.id
									}
								}
							});

							let _res_updateroom = await updateRoom({
								variables: {
									id: _booking.Room.id,
									input: {
										status: (_status === 'สำเร็จ') ? "จอง" : 'ห้องว่าง'
									}
								}
							});
							if (_res_updateroom && _res_updateroom.data) {
								console.log('update status Room ', 'จอง')
								// reface page
							}


							if (_res) {
								booking.refetch();
							}
						}}
						handleSaveimage={async (_booking, file_image, handleclose) => {

							let _file_image = file_image
							let res = null
							console.log('booking', _booking, 'file_image', _file_image)

							if (_file_image) {

								try {
									res = await uploadFile({ variables: { file: _file_image } });
									console.log('receipt_number', res)
								} catch (error) {
									console.log('fetch upload error ')
								}
							}

							if (res && res.data && res.data.singleUpload && res.data.singleUpload.url) {
								let _res = null
								try {
									_res = await updateBooking({
										variables: {
											id: _booking.id,
											input: {
												booking_number: _booking.booking_number,
												customer_name: _booking.customer_name,
												customer_lastname: _booking.customer_lastname,
												customer_tel: _booking.customer_tel,
												customer_address: _booking.customer_address,
												taxnumber: _booking.taxnumber,
												payment_method: _booking.payment_method,
												deposit: _booking.deposit,
												checkin_type: _booking.checkin_type,
												checkin_date: _booking.checkin_date,
												checkin_date_exp: _booking.checkin_date_exp,
												note: _booking.note,
												status: _booking.status ? _booking.status : 'รอการชำระเงิน',
												confirm_booking: _booking.confirm_booking,
												receipt_number: res.data.singleUpload.url,
												Room: _booking.Room.id
											}
										}
									});
								} catch (error) {
									console.log('fetch update updateBooking  error ')
								}

								if (_res) {
									booking.refetch();
									handleclose();
								} else {
									console.log('Error Update Booking ')
								}

							} else {
								console.log('Upload image  Error')
							}
						}}
						handleredit={(_booking) => {
							console.log('update', _booking);
							//setformroom()

							setformbooking({
								id: _booking.id,
								booking_number: _booking.booking_number ? _booking.booking_number : `${Math.random().toString(36).slice(2, 15)}`,
								customer_name: _booking.customer_name,
								customer_lastname: _booking.customer_lastname,
								customer_tel: _booking.customer_tel,
								customer_address: _booking.customer_address,
								taxnumber: _booking.taxnumber,
								payment_method: _booking.payment_method,
								deposit: _booking.deposit,
								checkin_type: _booking.checkin_type,
								checkin_date: _booking.checkin_date ? formatDate(new Date(Number(_booking.checkin_date))) : "",
								checkin_date_exp: _booking.checkin_date_exp ? formatDate(new Date(Number(_booking.checkin_date_exp))) : "",
								note: _booking.note,
								status: _booking.status,
								confirm_booking: _booking.confirm_booking,
								receipt_number: _booking.receipt_number
							});
							if (_booking && _booking.Room) {
								setselectedroom(_booking.Room);
								handleChangedALLformroom(_booking.Room);
							}
						}}

						handleExportformbooking={(_booking) => {
							export_booking_pdf(_booking);
						}}
						handleExportReceipt={(_booking) => {

							export_Receipt_pdf(_booking, 'booking');
						}}
					/>
				</div>
			</div>
		</div>
	);
};
