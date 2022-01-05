import { useEffect, useState } from 'react';

import styles from './Checkin.module.css';
import { API_queryRooms, API_queryBuildings, API_updateMeterRoomkwh, API_updateMeterRoomwater } from '../../API/index';
import { Table } from "../../subcomponents/Table/Table"


import SearchIcon from '@material-ui/icons/Search';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaidIcon from '@mui/icons-material/Paid';

import  { TableRoomMember }  from './TableRoomMember/TableRoomMember'
import {  ModalSelectMember } from './ModalSelectMember/ModalSelectMember'
import { useQuery, useMutation } from '@apollo/client';

import { API_UPDATE_MemberInRoom, API_DELET_MemberInRoom } from '../../API/Schema/Room/Room';
import { API_UPDATE_Room ,API_GET_Rooms} from '../../API/Schema/Room/Room'
import { API_createMember , API_updateMember} from '../../API/Schema/Member/Member'

 // icon 

import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

import { formatDate } from '../../general_functions/convert'
import { DiffDate } from '../../general_functions/time'

const filter_rooms = (rooms , options_search) =>{
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
							( room.data.bookings.length > 0  && (room.data.bookings[0].customer_name.search(options_search.text) !== -1 ) )	||
							( room.data.bookings.length > 0  && (room.data.bookings[0].customer_tel.search(options_search.text) !== -1 ) ) || 
							(options_search.text === '')	
							;
						}else if (options_search.keyword === 'ห้อง'){
							return (room.name.search(options_search.text) !== -1  || 
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
						}else if( options_search.keyword === 'ชื่อคนจอง'){
							return ( room.data.bookings.length > 0  && (room.data.bookings[0].customer_name.search(options_search.text) !== -1 ) )	||
							(options_search.text === '')
						}else if( options_search.keyword === 'เบอร์ติดต่อจอง'){
							return (  room.data.bookings.length > 0  && (room.data.bookings[0].customer_tel.search(options_search.text) !== -1 ) )	||
							(options_search.text === '')	
						
						}else{
							return false; 
						}
					}else{ return false;  }
				})
		}
		return _filter_table
}
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
						members: data.members ? data.members :[],
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
	const [ reselectedroom , setreselectedroom] = useState(false);

	const [ options_search  ,setoptions_search] = useState({
		text:"",
		keyword:"ทั้งหมด"
	})

	const GET_Rooms = useQuery(API_GET_Rooms);

	const [ updateRoom, mutationuploadFile ] = useMutation(API_UPDATE_Room)
	const [ addmemberinRoom, mutationaddmemberinRoom]  = useMutation(API_UPDATE_MemberInRoom)
	const [ deletememberinRoom, mutationdelememberinRoom]  = useMutation(API_DELET_MemberInRoom)
	const [ createMember, mutationcreateMember]  = useMutation(API_createMember)
	const [ updateMember,mutationupdateMember] = useMutation(API_updateMember) 

	const [ modalselectmember , setmodalselectmember ] = useState(false)
	


	const [ formcheckin , setformcheckin] = useState({
		checkinnumber:"",
		checkin_type:"",
		rental_period:"",
		rental_deposit:"",
		rental_period_day:"",
		branch:"",
	})
	const [ modeformmember, setmodeformmember] = useState(null)
	const [ formmember, setformmember ] = useState({
		 id:"",
		 nametitle:"",
		 name:"",
		 lastname:"",
		 personalid:"",
		 email:"",
		 taxnumber:"",
		 address:"",
		 tel:"",
		 carid:"",
		 note:""

	});
	const [ formroomtype , setformroomtype ]  = useState({
		id:"",
		name:"",
		floor:"",
		building:"",
		RoomType:"",
		monthlyprice:"",
		insurance:"",
		deposit_rent:"",
		rate_electrical:"",
		inmemory_kwh_date:"",
		rate_water:"",
		inmemory_water_date:"",
		listoptionroom:[],

	})
	const [ tableoption  ,settableoption ] = useState({
	showindex:true,
	disablemenu:false,
	disableedit:false,
	topic:["รายการ","ราคา"],
	body:[],
		inputs: [
		{
			label: "name",
			property: "name",
			form: {
				displayform: "textbox",
				type: "text",
				value: ""
			}
		},
		{
			label: "price",
			property: "price",
			form: {
				displayform: "textbox",
				type: "text",
				value: ""
			}
		},
		
	]

})
	//  function in file
	const  clearformcheckin  = () =>{
		setformcheckin({
				checkinnumber:"",
				checkintype:"",
				rental_period:"",
				rental_deposit:"",
				rental_period_day:"",
				branch:"",
		})
	}
	const clerformroomtype  = () =>{
		setformroomtype({
		id:"",
		name:"",
		floor:"",
		building:"",
		RoomType:"",
		monthlyprice:"",
		insurance:"",
		deposit_rent:"",
		rate_electrical:"",
		inmemory_kwh_date:"",
		rate_water:"",
		inmemory_water_date:"",
		listoptionroom:[]
		})
	}

	

	const refetch_roomMember = () =>{
		GET_Rooms.refetch() // << refect data room 
		setreselectedroom(true)
	}
	const handleSelectMember  = ( e )=>{
		console.log('select member ')
		setmodalselectmember(true)
	}
	const handleClerformmember = (e) =>{
		setmodeformmember(null) // << action mode 
		setformmember({
		 id:"",
		 nametitle:"",
		 name:"",
		 lastname:"",
		 personalid:"",
		email:"",
		 taxnumber:"",
		 address:"",
		 tel:"",
		 carid:"",
		 note:""})
	}
	const handleAddmembertoroom = async  ( e ) =>{
		 let  _selectedroom = selectedroom
		 let  _formmember = formmember
		console.log('add member to room ',_selectedroom , _formmember)
		let res = {
			updatemember : null,
			createmember : null,
			addmembertoroom : null 
		};
		if(_selectedroom ){  // << not ID create new member 
			if( _formmember.id === "" && modeformmember === null ){   
				res.createmember = await createMember({
					variables:{
						input:{ 
							name:_formmember.name,
							lastname:_formmember.lastname,
							personalid:_formmember.personalid,
							tel:_formmember.tel,
							email:_formmember.email,
							carid:_formmember.carid,
						}
					}
				})
			}
			if(_formmember && _formmember.id && modeformmember === 'select' ){
				console.log('select mode')
				res.updatemember = await updateMember({
					variables:{
						id:_formmember.id,
						input:{
							name:_formmember.name,
							lastname:_formmember.lastname,
							personalid:_formmember.personalid,
							tel:_formmember.tel,
							email:_formmember.email,
							carid:_formmember.carid,

						}
					}
				})
				if(res.updatemember){
					res.createmember  = {data:{ createMember : {id :_formmember.id  } }}
				}
				
			}

			if(_formmember && _formmember.id && modeformmember === 'edit' ){
			res.updatemember = await updateMember({
					variables:{
						id:_formmember.id,
						input:{
							name:_formmember.name,
							lastname:_formmember.lastname,
							personalid:_formmember.personalid,
							tel:_formmember.tel,
							email:_formmember.email,
							carid:_formmember.carid,

						}
					}
				})
			}


		}

		
			console.log('res.createmember',res.createmember)
		if(res.createmember && res.createmember.data && res.createmember.data.createMember && res.createmember.data.createMember.id && 
		  	_selectedroom && _selectedroom.id
		){
				console.log( 'new id member  = ' ,res.createmember.data.createMember.id)
				  res.addmembertoroom = await  addmemberinRoom({
														variables:{
															id:_selectedroom.id,
															input:{
																id:res.createmember.data.createMember.id
															},
														}
													})
				if( res.addmembertoroom.data){
					console.log('update new member complete ')
					refetch_roomMember() // << refect data room 
					setmodeformmember(null) // <<
					// GET_Rooms.refetch() 
					// setreselectedroom(true)
					// _selectedroom.id
					// setselectedroom(room);
				}
		}else{
			if(_selectedroom === null ){
				console.log('with out room id')
			}
			refetch_roomMember() // << refect data room 
			setmodeformmember(null) // <<
		}

		
			// _res = await updateBooking({

	}
	const handlerselectrooms =  (e) =>{

	}
	const handlerchangeformroomtype = (e) =>{
		let _formroomtype = formroomtype
		if (e.target.id && _formroomtype.hasOwnProperty(e.target.id) ) {
			_formroomtype[e.target.id] = e.target.value;
			setformroomtype({ ..._formroomtype });
		}
	}
	const handlechangeformmember = (e) =>{
	
		let _formmember = formmember
			console.log('change',e.target.id , _formmember)
		if (e.target.id && _formmember.hasOwnProperty(e.target.id) ) {
			_formmember[e.target.id] = e.target.value;
			setformmember({ ..._formmember });
		}
	}
	const handlechangeformcheckin =(e) =>{
			let _formcheckin = formcheckin
			console.log('change',e.target.id , _formcheckin)
		if (e.target.id && _formcheckin.hasOwnProperty(e.target.id) ) {
			_formcheckin[e.target.id] = e.target.value;
			setformcheckin({ ..._formcheckin });
		}
	}

	useEffect(( )=>{

		
	},[formroomtype])

	useEffect( ()=>{
		
				console.log('update Rooms')
				if( GET_Rooms.data ){
				let Rooms = Rooms_to_table(GET_Rooms.data.Rooms)

				console.log('Rooms', Rooms);
				let _filter_rooms  =[]
				_filter_rooms = filter_rooms([...Rooms] , options_search)
				setrooms(_filter_rooms);
				setloading(true);

				}
	if(reselectedroom){
		if(selectedroom.id){

			console.log('update new member',);
			let  updateroom = 	GET_Rooms.data.Rooms.find(room => room.id === selectedroom.id)
			setselectedroom(updateroom)
			setreselectedroom(false)

			console.log('RoomType')

		}
	}
	
	},[GET_Rooms,loading])
	console.log('GET_Rooms',GET_Rooms)
	return (
		<div>
				{modalselectmember? 
				<ModalSelectMember handlerclose={()=>{
					setmodalselectmember(false)
					
				}}
				handleronselectmember={ ( member)=>{
					
					let _member  =  JSON.parse( JSON.stringify (member))
										setformmember(  
												{
												id:_member.id,
												nametitle:_member.nametitle,
												name:_member.name,
												lastname:_member.lastname,
												personalid:_member.personalid,
												taxnumber:_member.taxnumber,
												address:_member.address,
												tel:_member.tel,
												carid:_member.carid,
												note:_member.note
											} )
					setmodeformmember('select')
					setmodalselectmember(false)
				}
				}
				/>
				: null}
			<div className={styles.zone1}>

			
			
				<div className={styles.bigbox}>
					<div className={styles.tableroomselect}>
						<div className={styles.headertable}>
							<div className={styles.text}> รายการห้องว่างและถูกจอง </div>
							<div className={styles.input}>
								<div className={styles.zonetextbox}>
									<input
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
									<select value ={options_search.keyword}
									onChange={(e) => {
											let _options_search = options_search
											_options_search.keyword = e.target.value 
											setoptions_search({..._options_search})
										}}
									>
										<option>ทั้งหมด</option>
										<option>ห้อง</option>
										<option>อาคาร</option>
										<option>ชั้น</option>
										<option>ประเภทห้อง</option>
										<option>สถานะ</option>
										<option>ชื่อคนจอง</option>
										<option>เบอร์ติดต่อจอง</option>
									</select>
									<button onClick={async () => { 
										
										try{
											await GET_Rooms.refetch()
											setloading(false)
											setselectedroom(null);
											clerformroomtype();
										}catch(error){

										}

									}}>
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
									<th> ชื่อคนจอง </th>
									<th> เบอร์ติดต่อจอง </th>
								</tr>
								{rooms
									.filter((room) => (room && room.status === 'จอง') || room.status === 'ห้องว่าง')
									.map(
										(room, index) =>
											room ? (
												<tr
													onClick={() => {
														setselectedroom(room);
															console.log('ROOM_SELECTED',room)
															

															setformcheckin({
																checkin_date:room && room.data  && room.data.hasOwnProperty('bookings')  && room.data.bookings.length > 0 && 
																			room.data.bookings[0].checkin_date ? formatDate(new Date(Number(room.data.bookings[0].checkin_date)) ) :"2021-12-08" ,
																checkin_type:room && room.data  && room.data.hasOwnProperty('bookings')  && room.data.bookings.length > 0 && 
																			room.data.bookings[0].checkin_type ?  room.data.bookings[0].checkin_type : "",
																rental_period:room && room.data  && room.data.hasOwnProperty('bookings')  && room.data.bookings.length > 0 && 
																			room.data.bookings[0].checkin_date &&  room.data.bookings[0].checkin_date_exp  ?
																			DiffDate(new Date(Number(room.data.bookings[0].checkin_date)) , new Date(Number(room.data.bookings[0].checkin_date_exp))): "",
																rental_deposit: room && room.data  && room.data.hasOwnProperty('bookings')  && room.data.bookings.length > 0 && 
																				room.data.bookings[0].deposit ? room.data.bookings[0].deposit :"",
																rental_period_day: "",
																branch:"",


															})
													
													
													

														if(room && room.data && room.data.RoomType)
														{
															setformroomtype({
																	id:room.data.RoomType.id,
																	name:room.data.name,
																	floor:room.data.floor.name,
																	building:room.data.floor.building.name,
																	RoomType:room.data.RoomType.name,
																	monthlyprice:room.data.RoomType.monthlyprice,
																	insurance:room.data.RoomType.insurance,
																	deposit_rent:room.data.RoomType.deposit_rent,
																	rate_electrical:room.data.RoomType.rate_electrical,
																	inmemory_kwh_date:room.data.meterroom.inmemory_kwh_date,
																	rate_water:room.data.RoomType.rate_water,
																	inmemory_water_date:room.data.meterroom.inmemory_water_date,
																	listoptionroom: room.data.RoomType.listoptionroom
															})
															let _tableoption = tableoption
															_tableoption.body = room.data.RoomType.listoptionroom
															console.log('_tableoption.body',_tableoption.body)
															settableoption(_tableoption)
														}
															
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
													
													<td>{room && room.data && room.data.hasOwnProperty('bookings') &&  room.data.bookings.length > 0 && room.data.bookings[0] &&  room.data.bookings[0].customer_name ?
													 room.data.bookings[0].customer_name : '---'}</td>
													<td>{ room && room.data &&  room.data.hasOwnProperty('bookings') &&  room.data.bookings.length > 0 && room.data.bookings[0] &&  room.data.bookings[0].customer_tel ?
													room.data.bookings[0].customer_tel : '---'}</td>

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
									<input type="text" value={formcheckin.checkinnumber}  id="checkinnumber"  onChange={handlechangeformcheckin}/>
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>วันที่ทำสัญญา</label>
								</div>
								<div className={styles.input}>
									<input  type="date" value={formcheckin.checkin_date}   id="checkin_date" onChange={handlechangeformcheckin}/>
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>ประเภทการเช่า</label>
								</div>
								<div className={styles.input}>
									<select  value={formcheckin.checkin_type} id="checkin_type" onChange={handlechangeformcheckin} >
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
									<input  value={formcheckin.rental_period} type="text"   id="rental_period"  onChange={handlechangeformcheckin}/>
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>เงินจองห้อง</label>
								</div>
								<div className={styles.input}>
									<input value={formcheckin.rental_deposit} type="text"  id="rental_deposit" onChange={handlechangeformcheckin}/>
								</div>
							</div>
							<div className={styles.row}>
								<div className={styles.label}>
									<label>จำนวนวัน</label>
								</div>
								<div className={styles.input}>
									<input value={formcheckin.rental_period_day}  type="text" id="rental_period_day"  onChange={handlechangeformcheckin}/>
								</div>
							</div>
							<div className={styles.row}>
                                <div className={styles.label} >    
								    <label>สาขา</label>
                                </div>
								<div className={styles.input}>
									<input  value={formcheckin.branch} type="text" id="branch"   />
								</div>
							</div>
						</div>
					</div>

					<div className={styles.formroom}>
						<div className={styles.header}>
							<div className={styles.label}>
								<label>ย้ายเข้า</label>
							</div>
						</div>
						<div className={styles.body}>
							<div className={styles.row}>
								<div className={styles.label}>
								</div>
								<div className={styles.input} >
									<button onClick={ handleSelectMember }> เลือกผู้เช่า</button>
								</div>
							</div>
							{/* <div className={styles.row}>
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
							</div> */}
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
								    <label>ที่อยู่ตามบัตรประชาชน</label>
                                </div>
                                <div className={styles.input}>
								    <input type="text"  id="address" value={formmember.address}   onChange={handlechangeformmember} />
                                </div>
							</div>
							<div className={styles.row}>
                                 <div className={styles.label} >    
								    <label>Email</label>
                                </div>
                                <div className={styles.input}>
								    <input type="text"  id="email" value={formmember.email}   onChange={handlechangeformmember} />
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
								    <input type="text"  id="carid" value={formmember.carid}   onChange={handlechangeformmember} />
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
							<div className={styles.rowmenu}>
								 <button onClick={handleAddmembertoroom}> 
								 {
								
								   modeformmember ==='edit' ?
								   
									 <div>
									    แก้ไข <EditIcon/> 
									 </div>
									 :
										<div>
										เพิ่ม <AddIcon/>
										</div>
									
									
								 }
								

								 </button>
								 <button onClick={handleClerformmember}>ยกเลิก </button>
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
									<TableRoomMember  data={selectedroom} 
									handlerdelete={ async (member)=>{
										console.log('member id = ',member.id)
											let _selectedroom = selectedroom
											if(_selectedroom.id){
													let res_deletememberinRoom =  await deletememberinRoom({
														variables:{
															id:_selectedroom.id,
															input:{
																id:member.id
															},
														}
													})
												
													if(res_deletememberinRoom && res_deletememberinRoom.data){
															console.log('res_deletememberinRoom',res_deletememberinRoom)
														refetch_roomMember()
													}
											}
									}}
									handleredit={(member)=>{
										let _member  =  JSON.parse( JSON.stringify (member))
										setformmember(  
												{
												id:_member.id,
												nametitle:_member.nametitle,
												name:_member.name,
												lastname:_member.lastname,
												personalid:_member.personalid,
												taxnumber:_member.taxnumber,
												address:_member.address,
												tel:_member.tel,
												carid:_member.carid,
												note:_member.note
											} )
											setmodeformmember('edit')
										
										
									}}
									/> 
								</div>
							
                            </div>
                            {/* <div  className={styles.rowmenu} >
                               
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
											GET_Rooms.refetch() 
											setselectedroom(null)
											// reface page
										}
									}
					
								} }>บันทึก <SaveIcon/> </button>
                            </div> */}
                        </div>
						
                        
					</div>
				</div>
			</div>
			<div className={styles.zone2}>
				<div className={styles.formcontact}>
						<div className={styles.card}>
							<div className={styles.cardheader}>
								<label>ห้องพัก</label>
							</div>
							<div className={styles.cardbody}>
								<div className={styles.row}>
									<div className={styles.label}>
										<label>ชื่อ</label>
									</div>
									<div className={styles.input}>
										<input type="text" id="name"
										disabled={true}
										 value={formroomtype.name} 

										onChange={()=>{}}
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
										 value={formroomtype.floor} 

										 onChange={()=>{}}
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
										 value={formroomtype.building} 

										 onChange={()=>{}}
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
										 value={formroomtype.RoomType} 
										 onChange={()=>{}}
										></input>
									</div>
								</div>

								<div className={styles.row}>
									<div className={styles.label}>
										<label>ค่าเช่า</label>
									</div>
									<div className={styles.input}>
										
										<input type="text" id="monthlyprice" 
										disabled={true}
										value={formroomtype.monthlyprice} 
										 onChange={()=>{}}
										></input>
									</div>
								</div>

							

								<div className={styles.row}>
									<div className={styles.label}>
										<label>ค่าเช่าล่างหน้า</label>
									</div>
									<div className={styles.input}>
										<input type="text" id="deposit_rent" 
										disabled={true}
											value={formroomtype.deposit_rent} 
										 onChange={()=>{}}
										></input>
									</div>
								</div>

								<div className={styles.row}>
									<div className={styles.label}>
										<label>ค่าเช่าประกัน</label>
									</div>
									<div className={styles.input}>
										<input type="text" id="insurance" 
										disabled={true}
										value={formroomtype.insurance} 
										 onChange={()=>{}}
										></input>
									</div>
								</div>

								<div className={styles.row}>
									<div className={styles.label}>
										<label>สาธารณูปโภค</label>
									</div>
								</div>
								<div className={styles.row}>
									<div className={styles.label}>
										<label>ไฟฟ้า</label>
									</div>
									<div className={styles.input}>
										<input type="text" id="RoomType" 
										value={formroomtype.rate_electrical} 
										 onChange={()=>{}}
										></input>
										<button>
											อ่านค่าจาก Meter
										</button>
									</div>
								</div>

								<div className={styles.row}>
									<div className={styles.label}>
										<label>วันที่จดบันทึก ค่าไฟ</label>
									</div>
									<div className={styles.input}>
										<input type="date" id="inmemory_kwh_date"
										value={formroomtype.inmemory_kwh_date} 
										  onChange={()=>{}}
										></input>
									</div>
								</div>

								<div className={styles.row}>
									<div className={styles.label}>
										<label>น้ำ</label>
									</div>
									<div className={styles.input}>
										<input type="text" id="rate_water"  
										value={formroomtype.rate_water} 
										onChange={()=>{}}
										></input>
										<button>
											อ่านค่าจาก Meter
										</button>
									</div>
								</div>
								<div className={styles.row}>
									<div className={styles.label}>
										<label>วันที่จดบันทึก ค่าน้ำ</label>
									</div>
									<div className={styles.input}>
										<input type="date" id="inmemory_water_date" 
										value={formroomtype.inmemory_water_date} 
										 onChange={()=>{}}
										></input>
									</div>
								</div>
								 {/* ตรางรายละเอียดห้องพัก */}
								<div>
										<div> 
											<button onClick={()=> {
												let _tableoption = tableoption
												_tableoption.body = [..._tableoption.body , {name:"",price:"0"}]
												settableoption({..._tableoption})
											}}>เพิ่มรายการ</button>
											<button onClick={()=>{
												let _tableoption = tableoption
												_tableoption.disableedit = !tableoption.disableedit
												settableoption({...tableoption})
											}}> { !tableoption.disableedit ? "แก้ไขรายการ" : "บันทึกรายการ" }</button>
										 </div>
										 <table>
										 	<thead> 
											 	<tr>
												 	{tableoption.topic.map(topic =>
													 <th>{topic}</th>
													 
													 )}
													  { tableoption.disableedit ? <th></th>:null }
												 	
												</tr>
											</thead>
											<tbody>
												{tableoption.body.map( (data,index) =>
												<tr>
													<td> <input value={data.name}  disabled={ !tableoption.disableedit }/></td>
													<td><input value={data.price}  disabled={ !tableoption.disableedit }/></td>
													 { (tableoption && tableoption.disableedit) ? <td><button onClick={()=>{
														 let _tableoption  =tableoption
														_tableoption.body.splice(index, 1)
														settableoption({..._tableoption})
													 }}> X </button></td>:null }
												</tr>
												)}
											</tbody>
										 </table>
										 {/* <Table Data={tableoption}
										 onClickDelete={()=>{console.log('delete')}}
										 onClickEdit={()=>{console.log('edit')}}
										  /> */}
								</div>
							
								<div className={styles.rowmenu} style={{float:"right"}}>
									<button  onClick={()=>{
										// ดึงข้อมูลจาก checkin-list ไป สร้างใบแจ้งหนี้
									}}>สร้างใบแจ้งหนี้ <PaidIcon/></button>
									 {/* ออกใบแจ้งหนี้ */}
									<button  onClick={()=>{
										// เปลี่ยน สถานะ ใบแจ้งหนี้  เป็นชำระเงิน
									}}>ชำระเงิน <PaidIcon/></button>
									  {/* ออกใบเสร็จ */}
									<button   onClick={()=>{
										// ดึงข้อมูลใบแจ้งหนี้ ที่ชำระเงินแล้ว มาสร้างใบเสร็จ
									}}> ออกใบเสร็จ  <ReceiptIcon/></button>
								</div>
								<div className={styles.rowmenu}>
									<button 
									disabled={ (selectedroom === null) }
									onClick={ async ()=>{ 
									  // ส่ง table option ไปบันทึกไว้ใน ห้อง 
									// upload Room status

									// let _room = selectedroom
									// if(_room && _room.id){
									// 	let _res = await updateRoom({
									// 			variables: {
									// 				id: _room.id,
									// 				input: {
									// 					status:"ย้ายเข้า"
									// 				}
									// 			}
									// 		});
									// 	if(_res){
									// 		console.log('update status Room ')
									// 		GET_Rooms.refetch() 
									// 		setselectedroom(null)
									// 		clerformroomtype();
									// 		// reface page
									// 	}
									// }
					
								} }>บันทึก รายการ <SaveIcon/> </button>
								 <button onClick={()=>{
									 setselectedroom(null);
									 clerformroomtype();
								 }
								 
								 }>ยกเลิก </button>
								</div>

							</div>
						</div>
				</div>
			</div>
		</div>
	);
};
