import { useEffect, useState } from 'react';

import styles from './Checkin.module.css';
import { API_queryRooms, API_queryBuildings, API_updateMeterRoomkwh, API_updateMeterRoomwater } from '../../API/index';
import { Table } from "../../subcomponents/Table/Table"


import SearchIcon from '@material-ui/icons/Search';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaidIcon from '@mui/icons-material/Paid';
import DeleteIcon from '@material-ui/icons/Delete';

import  { TableRoomMember }  from './TableRoomMember/TableRoomMember'
import {  ModalSelectMember } from './ModalSelectMember/ModalSelectMember'
import { useQuery, useMutation } from '@apollo/client';

import { API_UPDATE_MemberInRoom, API_DELET_MemberInRoom } from '../../API/Schema/Room/Room';
import { API_UPDATE_Room ,API_GET_Rooms} from '../../API/Schema/Room/Room'
import { API_createMember , API_updateMember} from '../../API/Schema/Member/Member'

import { API_ADD_Invoice , API_UPDATE_Invoice } from '../../API/Schema/Invoice/Invoice'
import { API_CREATE_Checkin ,API_DELETE_Checkin , API_UPDATE_Checkin } from '../../API/Schema/Checkin/Checkin'
import { API_CREATE_Contract , API_DELETE_Contract , API_UPDATE_Contract } from '../../API/Schema/Contract/Contract'
import { API_CREATE_Receipt }  from '../../API/Schema/Receipt/Receipt'

import {  export_Receipt_pdf  , export_Contract , export_Invoice_pdf   } from '../../general_functions/pdf/export/export_pdf';

import { toYYMM  } from '../../general_functions/convert';
import CalendarPicker from '../../subcomponents/Calendar/Calendar.js';
import { Blocktext  } from '../../general_functions/regex/regex'



 // icon 

import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import EventNoteIcon from '@mui/icons-material/EventNote';

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

	const [ crateInvoice ] = useMutation(API_ADD_Invoice)
	const [ updateInvoice ] = useMutation(API_UPDATE_Invoice)

	const [ createCheckin ] = useMutation(API_CREATE_Checkin)

	const [ createContract] = useMutation(API_CREATE_Contract)

	const [ createReceipt ]  = useMutation(API_CREATE_Receipt) 

	const [ modalselectmember , setmodalselectmember ] = useState(false)


	


	const [ formcheckin , setformcheckin] = useState({
		id_contact:"",
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
		{
			label:"type_price",
			property:"type_price",
			form:{
				displayform:"checkbox",
				type: "checkbox",
				value:""
			}
		}
		
		]

	})
	const handlerchangetableoption = (e ,index) =>{
		if( (e && e.target && e.target.value !== null)   ){
			let _tableoption = tableoption
			if(e.target.name === 'price'||  e.target.name === 'name'){
				tableoption.body[index][e.target.name] =  e.target.value 

			}else if(e.target.name === 'calculate_mode'){ 
					if(e.target.type ==="checkbox"){
						tableoption.body[index][e.target.name]  = (e.target.checked)?"รายเดือน":"ครั้งเดียว"
					}else{
						tableoption.body[index][e.target.name] =  e.target.value 
					}
					
			}else if(e.target.name === 'type_price'){
					if(e.target.type ==="checkbox"){
						tableoption.body[index][e.target.name]  = (e.target.checked)?"ราคาไม่รวมvat":"ราคารวมvat"
					}else{
						tableoption.body[index][e.target.name] =  e.target.value 
					}
			}else if(e.target.name === 'selectvat'){
					if(e.target.type ==="checkbox"){
						tableoption.body[index][e.target.name]  = (e.target.checked)?"คิดvat":"ไม่คิดvat"
					}else{
						tableoption.body[index][e.target.name] =  e.target.value 
					}
			}
		
			
			settableoption({..._tableoption})
		}
	}
	//  function in file
	const  clearformcheckin  = () =>{
		setformcheckin({
				id_contact:"",
				checkinnumber:"",
				checkintype:"",
				checkin_date_exp:"",
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
		setreselectedroom(true)
		try{
			GET_Rooms.refetch() // << refect data room 
		}catch(e){

		}
		console.log('update reselect')

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
							taxnumber:_formmember.taxnumber,
							address:_formmember.address,
							tel:_formmember.tel,
							email:_formmember.email,
							carid:_formmember.carid,
							note:_formmember.note,
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
							taxnumber:_formmember.personalid,
							address:_formmember.address,
							tel:_formmember.tel,
							email:_formmember.email,
							carid:_formmember.carid,
							note:_formmember.note
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
							taxnumber:_formmember.taxnumber,
							address:_formmember.address,
							tel:_formmember.tel,
							email:_formmember.email,
							carid:_formmember.carid,
							note:_formmember.note

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

			e.target.value = Blocktext( e.target.id ,e.target.value)
			// if( e.target.id === 'name' || e.target.id === 'lastname' ){
			// 	let text = /[^0-9a-zA-Zก-๙ ]/ig;
            //     e.target.value = e.target.value.replace(text,'')
			// }else if( e.target.id === 'address'){
			// 	let text = /[^0-9\u0E00-\u0E7Fa-zA-Z' ./\n]/ig;
            //     e.target.value = e.target.value.replace(text,'')
			// }else{
				
			// }
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

	//Calendar


	const [defaultCalendar, setdefaultCalendar] = useState({
        isLoading: false
    });
	const [DateStart , setDateStart] = useState(null)
	const [DateEnd , setDateEnd] = useState(null)
	const[DateRange, setDateRange] = useState([])


	const handleCalendar = (isLoading) =>{
		setdefaultCalendar({
			isLoading:isLoading,
		})
	}

	const handleStart = (data) =>{
		setDateRange(data)
		console.log("DateRange",DateRange)
	}

	const CalendarDate = (selecteddate) =>{
		console.log('debug',selecteddate)
		
			if(selecteddate ){
				if(selecteddate.from === null  ){
					setDateStart('')
				}else{
					let iDay = parseInt(selecteddate.from.day, 10);
					let iMonth = parseInt(selecteddate.from.month, 10);
						
					if(iDay < 10 && iMonth < 10){
					let _DateStart = DateStart
					_DateStart = selecteddate.from.year + "-0" + selecteddate.from.month + "-0" + selecteddate.from.day
					setDateStart(_DateStart)
						
					}if(iDay < 10 && iMonth >= 10){
					let _DateStart = DateStart
					_DateStart = selecteddate.from.year + "-" + selecteddate.from.month + "-0" + selecteddate.from.day
					setDateStart(_DateStart)
		
					}if(iDay >= 10 && iMonth < 10){
					let _DateStart = DateStart
					_DateStart = selecteddate.from.year + "-0" + selecteddate.from.month + "-" + selecteddate.from.day
					setDateStart(_DateStart)

					}
				}
					
			}
			if(selecteddate ){
				if(selecteddate.to === null  ){
					setDateEnd('')
				}else{
							
					let iDay = parseInt(selecteddate.to.day, 10);
					let iMonth = parseInt(selecteddate.to.month, 10);
		
					if(iDay < 10 && iMonth < 10){
					let _DateEnd = DateEnd
					_DateEnd = selecteddate.to.year + "-0" + selecteddate.to.month + "-0" + selecteddate.to.day
					setDateEnd(_DateEnd)
							
					}if(iDay < 10 && iMonth >= 10){
					let _DateEnd = DateEnd
					_DateEnd = selecteddate.to.year + "-" + selecteddate.to.month + "-0" + DateRange.to.day
					setDateEnd(_DateEnd)
			
					}if(iDay >= 10 && iMonth < 10){
					let _DateEnd = DateEnd
					_DateEnd = selecteddate.to.year + "-0" + selecteddate.to.month + "-" + selecteddate.to.day
					setDateEnd(_DateEnd)
			
					}
				}
				
			}
			if(selecteddate && selecteddate.from === null && selecteddate.to === null)
			{

			}else{
					handleCalendar(false);
			}
		

	}

	//Calendar

	

	useEffect( ()=>{
		
		console.log('update Rooms',reselectedroom)
		console.log('api_roomsssssss',DateStart , DateEnd)
		if( GET_Rooms.data ){
			let start_date = DateStart  ? new Date(DateStart)  :new Date()  
			let end_date = DateEnd  ? new Date(DateStart)  :new Date()  
			start_date = start_date.getTime()
			end_date = end_date.getTime()
			console.log("debug",start_date, end_date)

			
		let Rooms = Rooms_to_table(GET_Rooms.data.Rooms)

		console.log('Rooms', Rooms);
		let _filter_rooms  =[]
		_filter_rooms = filter_rooms([...Rooms] , options_search)
		setrooms(_filter_rooms);
		setloading(true);

		}
		if(reselectedroom){
			if(selectedroom.id){

				
				let  updateroom = 	GET_Rooms.data.Rooms.find(room => room.id === selectedroom.id)
			
				let _selectedroom = selectedroom
					console.log('update new member');
					console.log(_selectedroom, updateroom)
				// อย่างลืมแก้ไขให้มีการ update พร้อมกัน //
				_selectedroom.data = updateroom // status checkin ,
				_selectedroom.members = updateroom.members // update member 
				setselectedroom({..._selectedroom})
				
			
				setreselectedroom(false)

				console.log('RoomType')

			}
		}
	
	},[GET_Rooms,loading ,DateStart , DateEnd])
	console.log('GET_Rooms',GET_Rooms)
	return (
		<div>	{defaultCalendar.isLoading && <CalendarPicker onCalendar={CalendarDate} start={handleStart} 
			selectedStartDate={ DateStart ? new Date( DateStart) : DateStart  }
          	selectedEndDate={ DateEnd ? new Date( DateEnd  ):  DateEnd  }
		/>}
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
												email:_member.email,
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
							<div  className={styles.input} >
								<div className={styles.zoneselect_checkincheckout}>
									<label> วันเที่ข้าพัก </label>
									<input 
									type='date' 
									name="input_searchdatecheckin" 
									value={DateStart}
									max={DateEnd}
									onChange={(e)=>{
										let { value } = e.target
										setDateStart( value )

									}}/>
									<label> วันที่เข้าย้ายออก </label>
									<input 
									type='date' 
									name="input_searchdatecheckout" 
									value={DateEnd}
									min={DateStart}
									onChange={(e)=>{
										let {value } = e.target
										setDateEnd( value )  
									}}
									/>
									<button onClick={()=>{
										setdefaultCalendar({
											isLoading:true
										})
									}}><EventNoteIcon/></button>
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
									.filter((room) => (room && room.status === 'จอง') || room.status === 'ห้องว่าง' || room.status === 'ย้ายเข้า')
									.map(
										(room, index) =>
											room ? (
												<tr
													onClick={() => {
														setselectedroom(room);
															console.log('ROOM_SELECTED',room)
															
															if(room && room.data && room.data.bookings && room.data.bookings.length > 0 ){
																if(room.data.members  && room.data.members.length > 0 && room.data.members[0] ){
																	setformmember({
																		id:"",
																		nametitle:"",
																		name: "",
																		lastname: "",
																		personalid:"",
																		email:"",
																		taxnumber:room.data.members[0].taxnumber,
																		address:room.data.members[0].address ,
																		tel:room.data.members[0].tel,
																		carid:"",
																		note:""
																	})
																}else{
																	setformmember({
																		id:"",
																		nametitle:"",
																		name:   room.data.bookings[0].customer_name ?room.data.bookings[0].customer_name :"",
																		lastname: room.data.bookings[0].customer_lastname ?room.data.bookings[0].customer_lastname :"",
																		personalid:"",
																		email:"",
																		taxnumber:"",
																		address: room.data.bookings[0].customer_address ?room.data.bookings[0].customer_address:"",
																		tel:room.data.bookings[0].customer_tel ?room.data.bookings[0].customer_tel:"",
																		carid:"",
																		note:""
																	})
																}
																

															}

															if( room && room.data && room.data.checkin && room.data.checkin.id){
																console.log('update checkin',room.data.checkin.id_contact)
																setformcheckin({
																	id_contact:room.data.checkin.id_contact,
																	checkin_date:room.data.checkin.checkin_date ,
																	checkin_date_exp:room.data.checkin.checkin_date_exp ,
																	checkin_type:room.data.checkin.checkin_type  ?  room.data.checkin.checkin_type  : "",
																	rental_period:room && room.data  && room.data.hasOwnProperty('bookings')  && room.data.bookings.length > 0 && 
																				room.data.bookings[0].checkin_date &&  room.data.bookings[0].checkin_date_exp  ?
																				DiffDate(new Date(Number(room.data.bookings[0].checkin_date)) , new Date(Number(room.data.bookings[0].checkin_date_exp))): "",
																	rental_deposit: room.data.checkin.rental_deposit  ?  room.data.checkin.rental_deposit  : "",
																	rental_period_day: "",
																	branch:room.data.checkin.branch,
																})

															}else{
																setformcheckin({
																	id_contact:"",
																	checkin_date:room && room.data  && room.data.hasOwnProperty('bookings')  && room.data.bookings.length > 0 && 
																				room.data.bookings[0].checkin_date ? formatDate(new Date(Number(room.data.bookings[0].checkin_date)) ) :"2021-12-08" ,
																	checkin_date_exp:room && room.data  && room.data.hasOwnProperty('bookings')  && room.data.bookings.length > 0 && 
																				room.data.bookings[0].checkin_date ? formatDate(new Date(Number(room.data.bookings[0].checkin_date_exp)) ) :"2021-12-08" ,			
																	checkin_type:room && room.data  && room.data.hasOwnProperty('bookings')  && room.data.bookings.length > 0 && 
																				room.data.bookings[0].checkin_type ?  room.data.bookings[0].checkin_type : "",
																	rental_period:room && room.data  && room.data.hasOwnProperty('bookings')  && room.data.bookings.length > 0 && 
																				room.data.bookings[0].checkin_date &&  room.data.bookings[0].checkin_date_exp  ?
																				DiffDate(new Date(Number(room.data.bookings[0].checkin_date)) , new Date(Number(room.data.bookings[0].checkin_date_exp))): "",
																	rental_deposit: room && room.data  && room.data.hasOwnProperty('bookings')  && room.data.bookings.length > 0 && 
																					room.data.bookings[0].deposit ? room.data.bookings[0].deposit :"",
																	rental_period_day: room && room.data  && room.data.hasOwnProperty('bookings')  && room.data.bookings.length > 0 && 
																				room.data.bookings[0].checkin_date &&  room.data.bookings[0].checkin_date_exp  ?
																				DiffDate(new Date(Number(room.data.bookings[0].checkin_date)) , new Date(Number(room.data.bookings[0].checkin_date_exp))): "",
																	branch:"",
																})
															}
															

														
													
													
													

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
															
															if(room && room.data && room.data.checkin && room.data.checkin.Checkinoption !== null ){
																console.log('room.data',room.data.checkin.Checkinoption)
																if(room.data.checkin.Checkinoption && room.data.checkin.Checkinoption.length > 0){
																	let _body = room.data.checkin.Checkinoption.map(obj =>{
																		return {name:obj.name,price:obj.price ,
																			calculate_mode :obj.calculate_mode,
																			selectvat:obj.selectvat,
																			type_price:obj.type_price};
																		});
																		
																	_tableoption.body  = [..._body]
																}	
															}else{
																 // ดึงข้อมูลจาก รายการเบิ้องต้นจากประเภทห้อง
																_tableoption.body = [...room.data.RoomType.listoptionroom].map(data =>{
																	return ( {...data , ...{type_price:"ราคาไม่รวมvat"}, ...{calculate_mode:"รายเดือน"}})
																})
																
															}
															
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
									<input type="text" value={formcheckin.id_contact}  id="id_contact"  onChange={handlechangeformcheckin}/>
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
									<label>วันครบกำหนดสัญญา</label>
								</div>
								<div className={styles.input}>
									<input  type="date" value={formcheckin.checkin_date_exp}   id="checkin_date_exp" onChange={handlechangeformcheckin}/>
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
									<input  value={formcheckin.branch} type="text" id="branch"   onChange={handlechangeformcheckin}  />
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
								    <textarea
									 cols="25"
									 rows="3"
									 type="text"  id="address" value={formmember.address}   onChange={handlechangeformmember} />
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
									<TableRoomMember  data={  JSON.parse(JSON.stringify (selectedroom)) } 
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
										if(_member && _member.id){
											setformmember(  
												{
												id:_member.id,
												nametitle:_member.nametitle,
												name:_member.name,
												lastname:_member.lastname,
												personalid:_member.personalid,
												taxnumber:_member.taxnumber,
												address:_member.address,
												email:_member.email,
												tel:_member.tel,
												carid:_member.carid,
												note:_member.note
											} )
											setmodeformmember('edit')
										}
										
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
										  onChange={handlerchangeformroomtype}
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
										<input type="text" id="rate_electrical" 
										value={formroomtype.rate_electrical} 
										 onChange={handlerchangeformroomtype}
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
										onChange={handlerchangeformroomtype}
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
										onChange={handlerchangeformroomtype}
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
										onChange={handlerchangeformroomtype}
										></input>
									</div>
								</div>
								 {/* ตรางรายละเอียดห้องพัก */}
								<div className={styles.zonetablelist}>
										 <div className={styles.menutablelist}> 
											<button onClick={()=> {
												let _tableoption = tableoption
												_tableoption.disableedit = true
												_tableoption.body = [..._tableoption.body , {name:"",price:"0",type_price:"ราคาไม่รวมvat", calculate_mode:"รายเดือน"}]
												settableoption({..._tableoption})
											}}>เพิ่มรายการ</button>
											<button onClick={()=>{
												let _tableoption = tableoption
												_tableoption.disableedit = !tableoption.disableedit
												settableoption({...tableoption})
											}}> { !tableoption.disableedit ? "แก้ไขรายการ" : "บันทึกรายการ" }</button>
										 </div>
										 <div className={styles.tablelist} >
											<table>
												<thead> 
													<tr>
														{tableoption.topic.map(topic =>
														<th>{topic}</th>
														
														)}
														<th>รายการรายเดือน</th>
														<th>รูปแบบราคาไม่รวมvat</th>
														<th>ภาษี</th>
														{ tableoption.disableedit ? <th></th>:null }
														
													</tr>
												</thead>
												<tbody>
													{tableoption.body.map( (data,index) =>
													<tr>
														<td><input type="text" value={data.name}   name="name" onChange={(e)=>handlerchangetableoption(e,index)}
														disabled={ !tableoption.disableedit }/></td>
														<td><input  type="text"value={data.price}  name="price" onChange={(e)=>handlerchangetableoption(e,index)}  disabled={ !tableoption.disableedit }/></td>
														<td><input type='checkbox'  checked={ (data.calculate_mode === "รายเดือน"? true:false)  }  name="calculate_mode"
															onClick={(e)=>handlerchangetableoption(e,index)}
														 /> </td>
														<td><input type='checkbox'  checked={ (data.type_price === "ราคาไม่รวมvat"? true:false)  }  name="type_price"
															onClick={(e)=>handlerchangetableoption(e,index)}
														 /></td>
														 <td><input type='checkbox'  checked={ (data.selectvat === "ไม่คิดvat"? false:true)  }  name="selectvat"
															onClick={(e)=>handlerchangetableoption(e,index)}
														 /></td> 
														{ (tableoption && tableoption.disableedit) ? <td><button onClick={()=>{
															let _tableoption  =tableoption
															_tableoption.body.splice(index, 1)
															settableoption({..._tableoption})
														}}> <DeleteIcon/> </button></td>:null }
													</tr>
													)}
												</tbody>
											</table>
										 </div>
										 {/* <Table Data={tableoption}
										 onClickDelete={()=>{console.log('delete')}}
										 onClickEdit={()=>{console.log('edit')}}
										  /> */}
								</div>
							
							
								<div className={styles.rowmenu}>
									<button 
									disabled={ (selectedroom === null) }
									onClick={ async ()=>{ 
									  // ส่ง table option ไปบันทึกไว้ใน ห้อง 
									// upload Room status
									console.log('บันทึกรายการ',tableoption)
									console.log('formcheckin',formcheckin)
						
									 /// สร้าง checkin  //
									try{
											console.log('tableoption.body',JSON.parse(JSON.stringify(tableoption.body)));
										let _res_createCheckin = await createCheckin({
												variables:{
												input:{
													id_contact: formcheckin.id_contact,
													checkin_date : formcheckin.checkin_date,
													checkin_date_exp : formcheckin.checkin_date_exp,
													checkin_type: formcheckin.checkin_type,
													rental_deposit: formcheckin.rental_deposit,
												
													number_day_rent: formcheckin.number_day_rent,
													branch: formcheckin.branch,
													Checkinoption: [...tableoption.body.map(item=>{
														return ({name: item.name,
																	price: item.price,
																	calculate_mode:item.calculate_mode,
																	selectvat:item.selectvat,
																	type_price: item.type_price})
																})]
												}
											}
										})
												
										if(_res_createCheckin && _res_createCheckin.data)
											{
												
												let _idcheckin = _res_createCheckin.data.createCheckin.id
												let _room = selectedroom
												if(_room && _room.id){
													let _res = await updateRoom({
															variables: {
																id: _room.id,
																input: {
																
																	checkinid:_idcheckin
																}
															}
														});
													if(_res && _res.data){
														try{
															refetch_roomMember()
														}catch(e){
															console.log(e)
														}
													}
												}
											}
									}catch(e){
										console.log(e)
									}
									// End create check in  // 

									 
					
									
									
								 	
								} }>บันทึก รายการ <SaveIcon/> </button>
								
								 <button onClick={ async ()=>{
									 //ลบ รายการ invoices
									let _room = selectedroom
									try{
										if(_room && _room.id && _room.data &&  _room.data.checkinInvoice){
											let _res = await updateRoom({
													variables: {
														id: _room.id,
														input: {
															checkinInvoiceid:null,
															checkinid:null
														}
													}
												});
											if(_res && _res.data){
												try{
														GET_Rooms.refetch() 
													}catch(e){
														console.log(e)
													}

											}else{
												console.log('communication Error ')
											}

										}
									}catch(e){
										console.log(e)
									}
									console.log(_room)
									 setselectedroom(null);
									 clerformroomtype();
								 }
								 
								 }>ยกเลิก </button>
								</div>

								<div className={styles.rowmenu} style={{float:"right"}}>
								
									<button disabled={ 
										 	selectedroom &&  selectedroom.data && selectedroom.data.checkin ? false : true
										}
										onClick={async ()=>{
										if(selectedroom && selectedroom.data && selectedroom.data.checkin){
										console.log('Export Contract',selectedroom)
												/// สร้าง Contract // 
											try{
												let _room = selectedroom
												if(_room && _room.id){
													let _res = await createContract({
															variables:{
															input:{
																roomid:_room.id
															}
														}
													})
														
													if(_res && _res.data)
													{
														
														let _idcontract = _res.data.createContract.id
														let _room = selectedroom
														if(_room && _room.id){
															let _res = await updateRoom({
																	variables: {
																		id: _room.id,
																		input: {
																			contractid:_idcontract
																		}
																	}
																});
																if(_res && _res.data){
																	try{
																				refetch_roomMember()
																		}catch(e){
																			console.log(e)
																		}

																}else{
																	console.log('communication Error ')
																}
														}
													}
												}
											}catch(e){
												console.log(e)
											}

											// End create Contract // 
											export_Contract()


									

										}
								
										// ดึงข้อมูลจาก checkin-list ไป สร้างใบแจ้งหนี้
									}}> ออกเอกสารสัญญา <ReceiptIcon/></button>
									
									<button 
										disabled={ 
										 	selectedroom &&  selectedroom.data && selectedroom.data.Contract &&
											 selectedroom.data.Contract.id ? false : true
										}
									 onClick={async ()=>{

										// create Invoice //
										let _tableoption = tableoption
										let _updatetableoption   = _tableoption.body.map(obj  =>{
											return ({name:obj.name , price:obj.price,  number_item:"1", selectvat:obj.selectvat, type_price:obj.type_price})
										})
										let _room = selectedroom
										const now =	new Date()
											try{
												if(_room && _room.id){
													let _res = await crateInvoice({
														variables:{
															input:{
																roomid:_room.id,
																status:"รอการชำระเงิน",
																monthlybilling : now,
																lists:[..._updatetableoption]
															}
														}
													})
													
													if(_res && _res.data && _res.data.addInvoice && _res.data.addInvoice.id){ 
																// สร้างใบแจ้งหนี้สำเร็จ //
															
																let _idreceipt = _res.data.addInvoice.id
															
																
																	 _res = await updateRoom({
																			variables: {
																				id: _room.id,
																				input: {
																			
																					checkinInvoiceid:_idreceipt
																				}
																			}
																		});
																		if(_res && _res.data){
																		try{
																				console.log('_updatetableoption',_updatetableoption)
																				export_Invoice_pdf(selectedroom , [..._updatetableoption],toYYMM(now) )
																				refetch_roomMember()
																			}catch(e){
																				console.log(e)
																			}

																		}else{
																			console.log('communication Error ')
																		}
																
													}
												}else{
													console.error('ไม่ได้เลือกห้อง')
												} // check select Room 

												
											}catch(e){
												console.log(e)
											}
											// End create Invoice // 
										
										

										
											// ดึงข้อมูลจาก checkin-list ไป สร้างใบแจ้งหนี้
									}}>สร้างใบแจ้งหนี้ <PaidIcon/></button>

									 
									<button   
										disabled={ 
										 	selectedroom &&  selectedroom.data && selectedroom.data.checkinInvoice ? false : true
										}
										onClick={async ()=>{
										// เปลี่ยน สถานะ ใบแจ้งหนี้  เป็นชำระเงิน
										console.log("เปลี่ยนสถาะนะใบแจ้งหนี้ ",selectedroom)
										if(selectedroom && selectedroom.data && selectedroom.data.checkinInvoice && selectedroom.data.checkinInvoice.id){
											try{
												let _res =  await updateInvoice({
													variables: {
															id: selectedroom.data.checkinInvoice.id,
															input: {
																status:"สำเร็จ"
															}
														}
												})
												if(_res && _res.data){
													console.log('update กำชำระเงินสำเร็จ')
													try{
															refetch_roomMember()
														}catch(e){
															console.log(e)
													}

															
												}

											}catch(e){

											}

										}
									
										 // update Invoice  status เป็นชำระเงิน
									}}>ชำระเงิน <PaidIcon/></button>
									  
									<button  
									  	disabled={ 
										 	selectedroom &&  selectedroom.data && selectedroom.data.checkinInvoice 
											&& selectedroom.data.checkinInvoice.status === 'สำเร็จ' ? false : true
										}
										onClick={async ()=>{
											// ดึงข้อมูลใบแจ้งหนี้ ที่ชำระเงินแล้ว มาสร้างใบเสร็จ
											// สร้างใบเสร็จ // 
											try{
												let _room = selectedroom
												if(_room && _room.id){
													let _res = await createReceipt({
															variables:{
															input:{
																status:"รอการพิมพ์",
																invoiceid:selectedroom.data.checkinInvoice.id
															}
														}
													})
													if(_res && _res.data && _res.data.createReceipt.id){ 
															// สร้างใบแจ้งหนี้สำเร็จ //
														
															let _idreceipt = _res.data.createReceipt.id
															let _room = selectedroom
															if(_room && _room.id){
																let _res = await updateRoom({
																		variables: {
																			id: _room.id,
																			input: {
																				status:"มีคนอยู่",
																				checkinReceiptid:_idreceipt
																			}
																		}
																	});
																if(_res && _res.data){
																	try{
																			refetch_roomMember()
																			
																		}catch(e){
																			console.log(e)
																		}

																}else{
																	console.log('communication Error ')
																}
															}
													}
												}
											}catch(e){
												console.log(e)
											}
											// End Recipte // 
										
											console.log('selectedroom',selectedroom)
											let _tableoption = tableoption
											let _updatetableoption   = _tableoption.body.map(obj  =>{
												return ({name:obj.name , price:obj.price ,type_price:obj.type_price})
											})
											export_Receipt_pdf({
												customer_name : selectedroom.data.members[0].name,
												customer_lastname : selectedroom.data.members[0].lastname,
												customer_address :  selectedroom.data.members[0].address,
												Room : {...selectedroom.data}
											},'checkin',[..._updatetableoption] )

											try{
												refetch_roomMember()
											}catch(e){
												console.log(e)
											}}
										}
									> ออกใบเสร็จ  <ReceiptIcon/></button>
								</div>
								

							</div>
						</div>
				</div>
			</div>
		</div>
	);
};
