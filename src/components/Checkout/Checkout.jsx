import { useEffect, useState } from 'react';

import styles from './Checkout.module.css';
import SaveIcon from '@mui/icons-material/Save';
import ArticleIcon from '@mui/icons-material/Article';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SearchIcon from '@material-ui/icons/Search';
import CalculateIcon from '@mui/icons-material/Calculate';

import Dialog from '../../subcomponents/Dialog/Dialog'
import { DialogFunction } from "../../subcomponents/Dialog/Dialog";

import { export_Invoice_pdf   } from '../../general_functions/pdf/export/export_pdf';




// import { API_queryRooms} from '../../API/index';


import { useMediaQuery } from 'react-responsive'


import { useQuery, useMutation } from '@apollo/client';
import { API_UPDATE_Room, API_GET_Rooms } from '../../API/Schema/Room/Room'
import { API_ADD_Invoice } from '../../API/Schema/Invoice/Invoice'
// import { API_DELETE_Contract} from '../../API/Schema/Contract/Contract'
import { API_CREATE_Reimbursement } from '../../API/Schema/Reimbursement/Reimbursement'

import { Rooms_to_table } from './function';

import { filter_rooms } from '../../general_functions/filter'


// const getRooms = async () => {
// 	return new Promise(async (resolve, reject) => {
// 		let res = await API_queryRooms();
// 		let table = [];
// 		if (res && res.status === 200) {
// 			table = res.data.rooms.map((data) => {
// 				let _data = data;
// 				return {
// 					id: data.id,
// 					data: _data,
// 					building: (data.floor && data.floor.building && data.floor.building.name) ? data.floor.building.name : '---',
// 					floor: data.floor ? data.floor.name : '---',
// 					name: data.name,
// 					status: data.status ? data.status : '---',
// 					member: data.member ? data.member.name : '---',
// 					memberlastname: data.member ? data.member.lastname : '---',
// 					metername: data.meterroom ? data.meterroom.name : '---',
// 					meterroom: data.meterroom ? data.meterroom : '---',
// 					checkout_date: data.checkout_date ? data.checkout_date : '---',
// 					checkin_date: data.checkin_date ? data.checkin_date : '---'
// 				};
// 			});
// 		}

// 		resolve(table);
// 	}).catch((e) => {
// 		console.log('Promise Error', e);
// 		return [];
// 	});
// };

export const Checkout = () => {

	const isDesktop = useMediaQuery({
		query: "(min-width: 1224px)"
	});
	const isTablet = useMediaQuery({
		query: "(max-width: 1224px)"
	});
	const [ rooms, setrooms ] = useState([]);
	const [ loading, setloading ] = useState(false);
	const [ selectedroom, setselectedroom ] = useState(null);
	 //  << dialog function 
	const { defaultDialog, handleDialog, checkData } = DialogFunction();
	const [path, setPath] = useState([''])
	const handleChangePath = (props) => {
		setPath(props)

	}
	 // ------------------------------ // 
	const [ options_search  ,setoptions_search] = useState({
		text:"",
		keyword:"ทั้งหมด"
	})
  
	const [formdetailroom, setformdetailroom] = useState({
		id: "",
		name: "",
		floor: "",
		building: "",
		RoomType: "",
		checkout_date: "",
		calculate_price_type: "ตามจำนวนวัน",
		rental_deposit: "",
		total_cost: "",

		start_unit_electrical: "0",
		start_unit_electrical_date: "",
		end_unit_electrical: "0",
		end_unit_electrical_date: "",
		start_unit_water: "0",
		start_unit_water_date: "",
		end_unit_water: "0",
		end_unit_water_date: "",

		cashback: ""
	});
	const [showtableprice, setshowtableprice] = useState(false)
	const [tableprice, settableprice] = useState([])
	const [editmodetableprice, seteditmodetableprices] = useState(false)

	const handlerdeletetableprice = (index) => {
		let _tableprice = tableprice
		_tableprice.splice(index, 1)
		settableprice([..._tableprice])
	}
	const handleronChangetableprice = (e, index, key) => {
		let _tableprice = tableprice
		if (index !== undefined && e !== undefined && e.target !== undefined && e.target.value !== undefined && key !== undefined) {
			_tableprice[index][key] = e.target.value

		}
		if (key === "price" || key === 'number') {
			if (_tableprice[index].addvat === false) {
				_tableprice[index].costvat = 0
				_tableprice[index].totalprice = Number(_tableprice[index].price * Number(_tableprice[index].number)).toFixed(2)
			} else {
				_tableprice[index].costvat = Number(_tableprice[index].price * Number(_tableprice[index].number) * 0.07).toFixed(2)
				_tableprice[index].totalprice = Number(_tableprice[index].price * Number(_tableprice[index].number) * 1.07).toFixed(2)

			}

			// update calculate
		}

		settableprice([..._tableprice])
	}

	const clertableprice = () => {
		settableprice([])
		setshowtableprice(false)
	}

	const clerformrdetailsroom = () => {

		setformdetailroom({
			id: "",
			name: "",
			floor: "",
			building: "",
			RoomType: "",
			checkout_date: "",
			calculate_price_type: "ตามจำนวนวัน",
			rental_deposit: "",
			total_cost: "",


			start_unit_electrical: "",
			start_unit_electrical_date: "",
			end_unit_electrical: "",
			end_unit_electrical_date: "",
			start_unit_water: "",
			start_unit_water_date: "",
			end_unit_water: "",
			end_unit_water_date: "",

			cashback: ""
		})
	}
	const handlerchangeformdetailsroom = (e) => {
		let _formdetailroom = formdetailroom
		if (e.target.id && _formdetailroom.hasOwnProperty(e.target.id)) {
			_formdetailroom[e.target.id] = e.target.value;
			setformdetailroom({ ..._formdetailroom });
		}
	}
	const handlerselectroom = (room) => {
		if (room && room.id) {
			console.log('room', room)
			setselectedroom(room)
			setformdetailroom({
				id: room.id,
				name: room.name,
				floor: room.data.floor.name,
				building: room.data.floor.building.name,
				RoomType: room.data.RoomType.name,
				checkout_date: room.data.checkout_date,
				calculate_price_type: "ตามจำนวนวัน",
				rental_deposit: room.data.RoomType.deposit_rent,
				total_cost: "",

				start_unit_electrical: "",
				start_unit_electrical_date: "",
				end_unit_electrical: "",
				end_unit_electrical_date: "",
				start_unit_water: "",
				start_unit_water_date: "",
				end_unit_water: "",
				end_unit_water_date: "",

				cashback: ""
			})
		}
	}

	const GET_Rooms = useQuery(API_GET_Rooms);
	const [updateRoom] = useMutation(API_UPDATE_Room)
	const [createInvoice] = useMutation(API_ADD_Invoice)
	const [invoicecheckout, setinvoicecheckout] = useState("")
	// const [deleteContract] = useMutation(API_DELETE_Contract)
	const [createReimbursement] = useMutation(API_CREATE_Reimbursement)




	useEffect(
		() => {

			console.log('update data Rooms')
			if (GET_Rooms.data) {
				let Rooms = Rooms_to_table(GET_Rooms.data.Rooms)

				console.log('Rooms', Rooms);
				let _filter_rooms = []
				_filter_rooms = filter_rooms([...Rooms], options_search)
				setrooms(_filter_rooms);

				setloading(true);

			}
		}, [GET_Rooms, loading ,options_search]
	);


    return (
        <div>
           		<div className={styles.zone1}>
				   	<div className={styles.bigbox}>
						{defaultDialog.isLoading && <Dialog onDialog={checkData} nextPage={path} message={defaultDialog.message} />}

						<div className={styles.tableroomselect}>
							<div className={styles.headertable}>
								<div style={{ fontSize: isDesktop ? '' : isTablet ? '20px' : '' }} className={styles.text}> ห้องเช่าและแจ้งย้ายออก </div>
								<div className={styles.input}>
									<div className={styles.zonetextbox}>
										<input
											style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
											type="text"
											value={options_search.text}
											onChange={(e) => {
													let _options_search = options_search
												_options_search.text = e.target.value 
												setoptions_search({..._options_search})
											}}
										/>
									</div>
								
									<div className={styles.zonebtn}>
										<select 
										style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
										value={options_search.keyword}
											onChange={(e) => {
												let _options_search = options_search
												_options_search.keyword = e.target.value
												setoptions_search({ ..._options_search })
											}}

										>
											<option>ทั้งหมด</option>
											<option> ห้อง</option>
											<option> อาคาร</option>
											<option> ชั้น</option>
											<option> ประเภทห้อง</option>
											<option> ชื่อ</option>
											<option> สถานะ</option>
										</select>
										<button 
										className={styles.button_search}
										style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
										onClick={async () => {
											try {
												await GET_Rooms.refetch()
												setloading(false)
												setselectedroom(null);

											} catch (error) {

											}
										}}>
											{' '}
											<span>ค้นหา</span>
											<SearchIcon className={styles.icon_search}/>{' '}
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className={styles.bodytable}>
							<table>
								<thead>
									<tr style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
										<th> ห้อง</th>
										<th> อาคาร</th>
										<th> ชั้น</th>
										<th> ประเภทห้อง</th>
										<th> ชื่อ</th>
										<th> นามสกุล</th>
										<th> วันที่ย้ายออก</th>
										<th> สถานะ</th>
									</tr>
								</thead>
								<tbody>
									{rooms.filter((room) => (room && room.status === 'มีคนอยู่') || room.status === 'ย้ายออก').map(
										(room, index) =>
											room ? (
												<tr 
													key={index}
													onClick={() => {
														handlerselectroom(room)
													}}
													style={{ background: selectedroom && selectedroom.id === room.id ? 'lightgray' : 'none',fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
												>
													<td>{room.name ? room.name : '---'}</td>
													<td>{room.building ? room.building : '---'}</td>
													<td>{room.floor ? room.floor : '---'}</td>
													<td>{room && room.data && room.data.RoomType && room.data.RoomType.name ? room.data.RoomType.name : '---'}</td>
													<td>{room && room.data && room.data.members && room.data.members.length > 0 && room.data.members[0]
														&& room.data.members[0].name
														? room.data.members[0].name : '---'}</td>
													<td>{room && room.data && room.data.members && room.data.members.length > 0 && room.data.members[0]
														&& room.data.members[0].lastname
														? room.data.members[0].lastname : '---'}</td>
													<td>{room && room.data && room.data.checkout_date ? room.data.checkout_date : '---'}</td>
													<td>{room && room.data && room.data.status ? room.data.status : '---'}</td>
												</tr>
											) : null
									)}

								</tbody>
							</table>
						</div>
					</div>
				

			
					<div className={styles.bigbox}>
						<div className={styles.formcontact}>
							<div className={styles.card}>

								<div className={styles.cardheader} style={{ fontSize: isDesktop ? '' : isTablet ? '20px' : '' }}>
									<label>ห้องพัก（ย้ายออก）</label>
								</div>
								<div className={styles.cardbody} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
									<div className={styles.row}>
										<div className={styles.label}>
											<label>ชื่อ</label>
										</div>
										<div className={styles.input}>
											<input type="text" id="name"
												disabled={true}
												value={formdetailroom.name}
												onChange={handlerchangeformdetailsroom}
											></input>
										</div>
									</div>

									<div className={styles.row}>
										<div className={styles.label}>
											<label>ชั้น</label>
										</div>
										<div className={styles.input}>
											<input type="text" id="floor"
												disabled={true}
												value={formdetailroom.floor}

												onChange={handlerchangeformdetailsroom}
											></input>
										</div>
									</div>

									<div className={styles.row}>
										<div className={styles.label}>
											<label>อาคาร</label>
										</div>
										<div className={styles.input}>
											<input type="text" id="building"
												disabled={true}
												value={formdetailroom.building}

												onChange={handlerchangeformdetailsroom}
											></input>
										</div>
									</div>

									<div className={styles.row}>
										<div className={styles.label}>
											<label>ประเภทห้อง</label>
										</div>
										<div className={styles.input}>
											<input type="text" id="RoomType"
												disabled={true}
												value={formdetailroom.RoomType}
												onChange={handlerchangeformdetailsroom}
											></input>
										</div>
									</div>

									<div className={styles.row}>
										<div className={styles.label}>
											<label>วันที่ย้ายออก</label>
										</div>
										<div className={styles.input}>
											<input type="date" id="checkout_date"
												value={formdetailroom.checkout_date}
												onChange={handlerchangeformdetailsroom}
											></input>
										</div>
									</div>

									<div className={styles.row}>
										<div className={styles.label}>
											<label>ประเภทราคา</label>
										</div>
										<div className={styles.input}>
											<select
												id="calculate_price_type"
												value={formdetailroom.calculate_price_type}
												onChange={handlerchangeformdetailsroom}
											>
												<option>เต็มเดือน</option>
												<option>ตามจำนวนวัน</option>
											</select>
										</div>
									</div>



									<div className={styles.row}>
										<div className={styles.label}>
											<label>สาธารณูปโภค</label>
										</div>
									</div>
									<div className={styles.row}>
										<div className={styles.label}>
											<label>หน่วยไฟฟ้าครั้งก่อน</label>
										</div>
										<div className={styles.input}>
											<input type="text" id="start_unit_electrical"
												value={formdetailroom.start_unit_electrical}
												onChange={handlerchangeformdetailsroom}
											></input>
										</div>
									</div>
									<div className={styles.row}>
										<div className={styles.label}>
											<label>วันที่จดบันทึก หน่วยไฟฟ้าครั้งก่อน</label>
										</div>
										<div className={styles.input}>
											<input type="date" id="start_unit_electrical_date"
												value={formdetailroom.start_unit_electrical_date}
												onChange={handlerchangeformdetailsroom}
											></input>
										</div>
									</div>
									<div className={styles.row}>
										<div className={styles.label}>
											<label>หน่วยไฟฟ้าปัจจุบัน</label>
										</div>
										<div className={styles.input}>
											<input type="text" id="end_unit_electrical"
												value={formdetailroom.end_unit_electrical}
												onChange={handlerchangeformdetailsroom}
											></input>
											<button> อ่านค่าจาก Meter </button>
										</div>
									</div>

									<div className={styles.row}>
										<div className={styles.label}>
											<label>วันที่จดบันทึก หน่วยไฟฟ้าปัจจุบัน</label>
										</div>
										<div className={styles.input}>
											<input type="date" id="end_unit_electrical_date"
												value={formdetailroom.end_unit_electrical_date}
												onChange={handlerchangeformdetailsroom}
											></input>
										</div>
									</div>

									<div className={styles.row}>
										<div className={styles.label}>
											<label>หน่วยการใช้น้ำครั้งก่อน</label>
										</div>
										<div className={styles.input}>
											<input type="text" id="start_unit_water"
												value={formdetailroom.start_unit_water}
												onChange={handlerchangeformdetailsroom}
											></input>
										</div>
									</div>
									<div className={styles.row}>
										<div className={styles.label}>
											<label>วันที่จดบันทึก หน่วยการใช้น้ำ</label>
										</div>
										<div className={styles.input}>
											<input type="date" id="start_unit_water_date"
												value={formdetailroom.start_unit_water_date}
												onChange={handlerchangeformdetailsroom}
											></input>
										</div>
									</div>

									<div className={styles.row}>
										<div className={styles.label}>
											<label>หน่วยการใช้ปันจุบัน</label>
										</div>
										<div className={styles.input}>
											<input type="text" id="end_unit_water"
												value={formdetailroom.end_unit_water}
												onChange={handlerchangeformdetailsroom}
											></input>
											<button> อ่านค่าจาก Meter </button>
										</div>
									</div>
									<div className={styles.row}>
										<div className={styles.label}>
											<label>วันที่จดบันทึก หน่วยการใช้น้ำปัจจุบัน</label>
										</div>
										<div className={styles.input}>
											<input type="date" id="end_unit_water_date"
												value={formdetailroom.end_unit_water_date}
												onChange={handlerchangeformdetailsroom}
											></input>
										</div>
									</div>

									<div className={styles.row}>
										<div className={styles.label}>
											<label>เงินค่าเช่าล่วงหน้า</label>
										</div>
										<div className={styles.input}>
											<input type="text" id="rental_deposit" disabled={true}
												value={formdetailroom.rental_deposit}
												onChange={handlerchangeformdetailsroom}
											></input>
										</div>
									</div>
									<div className={styles.row}>
										<div className={styles.label}>
											<label>ค่าใช้จ่ายทั้งหมด</label>
										</div>
										<div className={styles.input}>
											<input type="text" id="total_cost" disabled={true}
												value={formdetailroom.total_cost}
												onChange={handlerchangeformdetailsroom}
											></input>
										</div>
									</div>


									<div className={styles.row}>
										<div className={styles.label}>
											<label>คืนเงิน</label>
										</div>
										<div className={styles.input}>
											<input type="text" id="cashback" disabled={true}
												value={(formdetailroom.rental_deposit - formdetailroom.total_cost) ? formdetailroom.rental_deposit - formdetailroom.total_cost : 0}
												onChange={handlerchangeformdetailsroom}
											></input>
										</div>
									</div>

									<div className={styles.row}>
										<button
											style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
											disabled={(selectedroom === null)}
											onClick={() => {
												if (selectedroom) {
													setshowtableprice(true)

													console.log('select-room', selectedroom)
													let _selectedroom = selectedroom
													let option_room = []
													if (selectedroom && selectedroom.data && selectedroom.data.RoomType && selectedroom.data.RoomType.listoptionroom) {
														option_room = selectedroom.data.RoomType.listoptionroom.map(item => {
															return {
																name: item.name,
																number: Number(1),
																price: Number(item.price),
																costvat: (Number(item.price) * 0.07).toFixed(2),
																totalprice: (Number(item.price) * 1.07).toFixed(2),
																addvat: true
															}
														})
													}
													let _tableprice = [...[
														{
															name: "ค่าเช่า", number: 1,
															price: _selectedroom.data.RoomType.monthlyprice,
															costvat: (Number(_selectedroom.data.RoomType.monthlyprice) * 0.07).toFixed(2),
															totalprice: (Number(_selectedroom.data.RoomType.monthlyprice) * 1.07).toFixed(2),
															addvat: true
														},
														{
															name: "ค่าไฟ",
															number: (Number(formdetailroom.end_unit_electrical) - Number(formdetailroom.start_unit_electrical)) ? (Number(formdetailroom.end_unit_electrical) - Number(formdetailroom.start_unit_electrical)) : 0,
															price: Number(_selectedroom.data.RoomType.rate_electrical),
															costvat: Number(Number(_selectedroom.data.RoomType.rate_electrical) * (Number(formdetailroom.end_unit_electrical) - Number(formdetailroom.start_unit_electrical)) * 0.07).toFixed(2),
															totalprice: Number(Number(_selectedroom.data.RoomType.rate_electrical) * (Number(formdetailroom.end_unit_electrical) - Number(formdetailroom.start_unit_electrical)) * 1.07).toFixed(2),
															addvat: true
														},
														{
															name: "ค่าน้ำ",
															number: (Number(formdetailroom.end_unit_water) - Number(formdetailroom.start_unit_water)) ? Number(formdetailroom.end_unit_water) - Number(formdetailroom.start_unit_water) : 0,
															price: Number(_selectedroom.data.RoomType.rate_water),
															costvat: Number(Number(_selectedroom.data.RoomType.rate_water) * (Number(formdetailroom.end_unit_water) - Number(formdetailroom.start_unit_water)) * 0.07).toFixed(2),
															totalprice: Number(Number(_selectedroom.data.RoomType.rate_water) * (Number(formdetailroom.end_unit_water) - Number(formdetailroom.start_unit_water)) * 1.07).toFixed(2),
															addvat: true
														},
														...option_room
													]];

													settableprice(_tableprice)
													let _formdetailroom = JSON.parse(JSON.stringify(formdetailroom))
													_formdetailroom.total_cost = _tableprice.reduce((acc, obj) => { return acc + Number(obj.totalprice); }, 0)  // sum totalprice 
													setformdetailroom(_formdetailroom)

												}
											}}>
						
											คำนวณค่าใช้จ่าย <CalculateIcon />
										</button>
									</div>
									{showtableprice ?
										<div>
											<div>
												<button 
												style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
												onClick={() => {
													let _tableprice = tableprice
													if (_tableprice.length < 10) {


														_tableprice = [..._tableprice, {
															name: "",
															number: "0",
															price: "0",
															costvat: "",
															totalprice: "",
															addvat: true
														}
														]
														seteditmodetableprices(true)
														settableprice([..._tableprice])
														console.log('_tableprice', _tableprice)
													}
												}} >เพิ่มรายการค่าใช้จ่าย</button>
												<button onClick={() => {
													// Mode Edit table 
													seteditmodetableprices(!editmodetableprice)
												}}
												> {editmodetableprice ? "ยกเลิกการแก้ไข" : "แก้ไขรายการค่าใช้จ่าย"} </button>
												<button onClick={() => {
													seteditmodetableprices(false)
													let _formdetailroom = JSON.parse(JSON.stringify(formdetailroom))
													_formdetailroom.total_cost = tableprice.reduce((acc, obj) => { return acc + Number(obj.totalprice); }, 0)  // sum totalprice 
													setformdetailroom(_formdetailroom)
												}}> บันทึก</button>
											</div>
											<div className={styles.table}>
												<table className={styles.tableStyles}>
													<thead className={styles.thead}>
														<tr style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
															<th>#</th>
															<th>ชื่อรายการ</th>
															<th>จำนวน</th>
															<th>ราคา</th>
															<th>ภาษี</th>
															<th>ราคาทั้งหมด</th>
															<th>ภาษี</th>
															{editmodetableprice ? <th></th> : null}
														</tr>
													</thead>
													<tbody className={styles.tbody}>{
														tableprice.map((list, index) =>
															<tr key={index} style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}>
																<td>
																	<input style={{ textAlign: 'center', width: '60px', border: 'none' }} value={index} />
																</td>
																<td>
																	<input style={{ textAlign: 'center', width: '100px', border: 'none' }} value={list.name} type="text" disabled={!editmodetableprice}
																		onChange={(e) => handleronChangetableprice(e, index, 'name')}
																	/>

																</td>
																<td><input style={{ textAlign: 'center', width: '100px', border: 'none' }} value={list.number} type="text" disabled={!editmodetableprice}
																	onChange={(e) => handleronChangetableprice(e, index, 'number')}
																/></td>
																<td><input style={{ textAlign: 'center', width: '100px', border: 'none' }} value={list.price} type="text" disabled={!editmodetableprice}
																	onChange={(e) => handleronChangetableprice(e, index, 'price')}
																/></td>
																<td style={{ textAlign: 'center', width: '100px' }} >{list.costvat}</td>
																<td style={{ textAlign: 'center', width: '100px' }} >{list.totalprice}</td>
																<td>
																	<input
																		style={{ textAlign: 'center', width: '80px' }}
																		type="checkbox" checked={list.addvat}
																		onChange={() => {

																			let _tableprice = tableprice
																			_tableprice[index].addvat = !_tableprice[index].addvat
																			if (_tableprice[index].addvat === false) {
																				_tableprice[index].costvat = 0
																				_tableprice[index].totalprice = Number(_tableprice[index].price * Number(_tableprice[index].number)).toFixed(2)
																			} else {
																				_tableprice[index].costvat = Number(_tableprice[index].price * Number(_tableprice[index].number) * 0.07).toFixed(2)
																				_tableprice[index].totalprice = Number(_tableprice[index].price * Number(_tableprice[index].number) * 1.07).toFixed(2)

																			}
																			console.log('change', _tableprice)
																			settableprice([..._tableprice])
																		}}
																	>
																	</input>
																</td>
																{editmodetableprice ?
																	<td> <button 
																	style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
																	onClick={() => handlerdeletetableprice(index)}> X </button> </td> : null
																				}
																			</tr>
																			)
																			}
																			
																		</tbody>
																	</table>
																</div> 
															</div>
															:
														null}



														<div className={styles.rowmenu}>
															<button 
															style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
															disabled={
																(selectedroom === null) ||  ( ( formdetailroom.rental_deposit -  formdetailroom.total_cost ) < 0)
															} 
															onClick={ async ()=>{ 
																// create ใบคืนเงินประกัน 
																console.log('selectedroom',)
																try{
																//	 console.log(`invoiceid':${ invoiceid }+ 'contractid: ${ contractid } `)
																let res =  await createReimbursement({
																		variables:{
																			input:{
																				invoiceid: invoicecheckout,
																				cashback : ( formdetailroom.rental_deposit -  formdetailroom.total_cost ).toString(),
																				//  contractid: selectedroom.data.Contract.id
																			}
																		}
																	})
																	if( res ){
																	handleChangePath('/Reimbursement')
																	handleDialog("The request was successful !!!!! Go Reimbursement page?", true)

																	}else{
																		console.error('data',res)
																	}
																
																}catch(e){
																		console.error(" สร้าง ใบคืนเงินประกัน Error ");
																}
															}}
															
															> สร้างใบคืนเงินประกัน <PictureAsPdfIcon/> </button>
															<button style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}  disabled={(selectedroom === null)} onClick={ async ()=>{ 
																console.log('tableprice',tableprice)
																console.log('selectedroom',selectedroom)
																let newtable = tableprice.map(data=>{
																	let _data = data
																	_data.unit = data.number
																	return _data
																})
																let _list  = tableprice.map(data=>{
																	
																	return {
																			name: data.name,
																			price: `${data.price}`,
																			vat:"7",
																			number_item: `${data.number}`,
																			type_price : `ราคาไม่รวมvat`,
																			selectvat : `${data.addvat}`,
																			
																			}
																})


																
																try{
																	let _res = await createInvoice({
																				variables:{
																					input:{
																						roomid: selectedroom.id,
																						status:"รอการชำระเงิน",
																						lists: JSON.parse(JSON.stringify([..._list]))
																					}
																				}
																			})
																	if(_res && _res.data){
																		setinvoicecheckout(_res.data.id)
																		handleChangePath('/invoice')
																		handleDialog("The request was successful !!!!! Go invoice page?", true)

																		console.log('สร้างใบแจ้งหนี้ ',_res.data.addInvoice.id)
																	}

																}catch(e){
																	console.error(" สร้าง Invoice Error ");
																}
																export_Invoice_pdf(selectedroom , newtable)

															
															}} > ออกใบแจ้งหนี้ <PictureAsPdfIcon/>  </button>
														
															<button style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }} disabled={(selectedroom === null)}  onClick={ async ()=>{ 
															let _room = selectedroom
															console.log('ย้ายออก',formdetailroom.checkout_date)
															if(_room && _room.id && formdetailroom && formdetailroom.checkout_date){
																let _res = await updateRoom({
																		variables: {
																			id: _room.id,
																			input: {
																				status:"ย้ายออก",
																				checkout_date :formdetailroom.checkout_date
																			}
																		}
																	});
																if(_res){
																	console.log('update status Room ')
																		
																	
																	clerformrdetailsroom();
																	clertableprice();
																	setTimeout(() => {
																			GET_Rooms.refetch() 
																		}, 10)
																	// reface page
																}
															}else{
																alert('ไม่พบค่าวันย้ายออก')
															}
											
														} }>ย้ายออก <SaveIcon/> </button>

														</div>
									
									<div className={styles.rowmenuright}>

										<button
										style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
											disabled={!(selectedroom && selectedroom.status === "ย้ายออก")}
											onClick={async () => {
												let _room = selectedroom
												if (_room && _room.id && formdetailroom && formdetailroom.checkout_date) {
													let _res = await updateRoom({
														variables: {
															id: _room.id,
															input: {
																status: "ห้องว่าง",
																checkout_date: ""
															}
														}
													});
													if (_res) {
														console.log('update status Room ')

														setselectedroom(null)
														clerformrdetailsroom();
														clertableprice();
														setTimeout(() => {
															GET_Rooms.refetch()
														}, 10);
														// reface page
													}
												}
											}

											}>ยกเลิกสัญญาและคืนสถานะห้องพัก <ArticleIcon /> </button>


										<button
											style={{ fontSize: isDesktop ? '' : isTablet ? '15px' : '' }}
											disabled={(selectedroom === null)}
											onClick={() => {
												setselectedroom(null);
												clerformrdetailsroom();
												clertableprice();
											}

											}>ยกเลิก </button>
									</div>

								</div>
								
							</div>
						</div>
					</div>
				</div>
		</div>
		
	
	)
}