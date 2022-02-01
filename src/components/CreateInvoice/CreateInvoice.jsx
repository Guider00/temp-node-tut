import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import styles from './CreateInvoice.module.css';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { API_queryRooms} from '../../API/index';
import { API_GET_Invoice,API_ADD_Invoice,API_DELETE_Invoice,API_UPDATE_Invoice} from '../../API/Schema/Invoice/Invoice'
import { API_GET_Rooms , API_UPDATE_Room } from '../../API/Schema/Room/Room'


 // new fileter room 
const filter_rooms = (rooms , options_search) =>{
    let _filter_table = []
    if(rooms  &&  options_search){
        _filter_table = rooms.filter(room =>{
                if(room){
                    if(options_search.keyword === 'ทั้งหมด'){
                        console.log("all")
                        return (room.name && room.name.search(options_search.text) !== -1 ) ||
                        (room.floor.building && room.floor.building.name.search(options_search.text) !== -1 ) || 
                        (room.floor && room.floor.name.search(options_search.text) !== -1 ) ||
                        (room.RoomType && room.RoomType.name.search(options_search.text) !== -1 ) ||
                        (room.status && room.status.search(options_search.text) !== -1 ) ||
                        (options_search.text === '')	
                        ;
                    }else if (options_search.keyword === 'ห้อง'){                      
                        return (room.name.search(options_search.text) !== -1 )||
                        (options_search.text === '')	
                    }else if (options_search.keyword === 'อาคาร'){
                        return (room.floor.building.name.search(options_search.text) !== -1 )||
                        (options_search.text === '')	
                    }else if( options_search.keyword === 'ชั้น' ){
                        return (room.floor.name.search(options_search.text) !== -1 )	||
                        (options_search.text === '')	
                    }else if( options_search.keyword === 'ประเภทห้อง'){
                        return (room.RoomType && room.RoomType.name.search(options_search.text) !== -1 )	||
                        (options_search.text === '')		
                    }else if(options_search.keyword === 'ชื่อผู้อยู่อาศัย'){
                         return (room && room.Member && room.Member.length > 0  && room.Member[0].name.search(options_search.text) !== -1 )	||
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



export const CreateInvoic = () =>{

    const [ Invoices , setInvoices] = useState([])
    const [ options_search  ,setoptions_search] = useState({
		text:"",
		keyword:"ทั้งหมด"
	})
    const [rooms , setrooms] = useState([]);
    const [filterrooms , setfilterrooms] = useState([]);
    const [ loadingpage, setloadingpage ] = useState(false);
    const [IDrooms , setIDrooms] = useState([]);
    const [addInvoice ,mutationaddInvoice ] = useMutation(API_ADD_Invoice);
    const [deleteInvoice ,mutationdeleteInvoice ] = useMutation(API_DELETE_Invoice);
    const [date , setdate ] = useState([]);

    const invoices = useQuery(API_GET_Invoice)
    const GET_Rooms = useQuery(API_GET_Rooms)














    const getRooms = async () => {
        return new Promise(async (resolve, reject) => {
            
            let res = await API_queryRooms();
            let table = [];
            if (res && res.status === 200) {
                table = res.data.rooms.map((data) => {
                    let _data = data;
                    return {
                        id: data.id,
                        building:
                            data.floor && data.floor.building && data.floor.building.name
                                ? data.floor.building.name
                                : '---',
                        floor: data.floor ? data.floor.name : '---',
                        RoomType : data.RoomType ? data.RoomType.name : '---',
                        room : data.name ? data.name : '---',
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
    

   
    const handleChange = (e) =>{
        const {name , checked } = e.target
        if(name === 'selectAll'){
            let tempRoom = filterrooms.filter((room) => (room && room.status === 'จอง') || room.status === 'มีคนอยู่').map((room)=>{
                return{...room , isChecked:checked}
            })
            setfilterrooms(tempRoom)
            let data = tempRoom.filter(item => item.isChecked === true)
            setIDrooms(data)

        }else{
            let tempRoom = filterrooms.map((room)=> room.id === name ?{...room , isChecked: checked} : room)
            setfilterrooms(tempRoom)
            let data = tempRoom.filter(item => item.isChecked === true)
            setIDrooms(data)
        }
        console.log("IDrooms",IDrooms)


    }




    const [disabled , setDisabled] = useState({
        disabled : true ,
        D1 : true , 
        D2 : false
    })
    
    const handleChangeRadio = (e) =>{
        const { name } = e.target
        if(name === 'D1'){
            let D2 = {...disabled , D1 : true , D2 : false , disabled : true}
            setDisabled(D2)
            
        }
        if(name === 'D2'){
            let D1 = {...disabled , D1 : false , D2 : true , disabled : false}
            setDisabled(D1)
            
            
        }
        
        
        
    }

    useEffect(
	 ()=>{	
        if( GET_Rooms.data ){
		let Rooms = GET_Rooms.data.Rooms
        
		console.log('Rooms', Rooms);
	//	let _filter_rooms  =[]
	//	_filter_rooms = filter_rooms([...Rooms] , options_search)
		setrooms(Rooms);
        setfilterrooms(Rooms);
		setloadingpage(true);

		}
     },
    [GET_Rooms ]    
    );

   


    

    

    const mainPage = () =>{
        let enablePage = document.querySelector('#D2')
        let disablePage = document.querySelector('#D1')
        let dataPage = document.getElementsByName('D3')
        let dataPageLen = dataPage.length

        
        if(enablePage.checked == true ){
            disablePage.checked = false
            for (var x=0; x<dataPageLen; x++){
                dataPage[x].disabled=false;
            }
           
        }


    }
    const supPage = () =>{
        let enablePage = document.querySelector('#D2')
        let disablePage = document.querySelector('#D1')
        let dataPage = document.getElementsByName('D3')
        let dataPageLen = dataPage.length
        

       if(disablePage.checked == true){
            enablePage.checked = false
            for (var x=0; x<dataPageLen; x++){
                dataPage[x].disabled=true;
            }
            

        }




    }


    const selectAll = () =>{
        let myCheckboxId = document.querySelector('#myCheckboxId')
        let myCheckboxMain = document.querySelector('#select-all');
        let myCheckboxName = document.getElementsByName('myCheckboxName');
        let myCheckboxNameLen = myCheckboxName.length
        
        if(myCheckboxMain.checked == true  ){
            for (var x=0; x<myCheckboxNameLen; x++){
                myCheckboxName[x].checked=true;
                
                }

            let _IDrooms = filterrooms.filter((room) => (room && room.status === 'จอง') || room.status === 'มีคนอยู่').map((room)=> {
                return {...room}
            })
            setIDrooms(_IDrooms);
            console.log("IDrooms-if",_IDrooms)

        }
      
        
        else{
            for (var x=0; x<myCheckboxNameLen; x++){
                myCheckboxName[x].checked=false;
                }
            
            let _IDrooms = IDrooms.filter(item => item !== item)
            setIDrooms(_IDrooms)
            console.log("IDrooms-else",_IDrooms)

            

        }

  

    }
   

    
    

  

    let header_table = ["","อาคาร","ชั้น","ประเภทห้อง","ห้อง","ประเภทการเช่า"]
    let sim_table = [{"":"","อาคาร":"อาคารเอ","ชั้น":"01","ประเภทห้อง":"ห้องแอร์","ชื่อห้อง":"101","ประเภทการเช่า":"รายเดือน"},{"":"","อาคาร":"อาคารเอ","ชั้น":"01","ประเภทห้อง":"ห้องแอร์","ชื่อห้อง":"101","ประเภทการเช่า":"รายเดือน"}]
    return (
        <div className = {styles.zone}>
           
            <div className = {styles.bigbox}>
            
                <div className = {styles.flex}>
                    <lable className = {styles.head}>ออกใบแจ้งหนี้</lable>
                    <div className = {styles.topic}> รอบบิล 
                        <input type = "date" onChange={
                            (e)=>{
                                let _date = date
                                _date =  e.target.value
                                setdate(_date)
                            }
                        }/>
                    </div>
                </div>

                <div className = {styles.normalbox}>
                    
                    <div className = {styles.displaybox}>
                        <div className = {styles.display1}>       
                            <div className = {styles.topic}>รูปแบบออกใบแจ้งหนี้</div>
                        </div>
                        <div className = {styles.radio} >
                            
                            

                            <div className = {styles.radio1}>
                            <input type = "radio" id = 'D1' name = 'D1' checked = {disabled.D1} onChange={handleChangeRadio}/>
                            <lable>ออกตามรอบบิล</lable>
                            </div>
                            <div className = {styles.radio2}>
                            <input type = "radio" id = 'D2' name = 'D2' checked = {disabled.D2} onChange={handleChangeRadio}/>
                            <lable>กำหนดเอง</lable>
                            </div>

                        </div>
                        <div className = {styles.day}>
                            รายเดือน
                        </div>
                        <div className = {styles.flex}>
                            <div className = {styles.lablebox}>
                                <p>วันที่คิดรอบบิล</p>
                                <p >วันที่ครบกำหนดชำระ</p>
                                <p >กรณีไม่พักเป็นเดือน</p>
                                <p>คิดค่าเช่า</p>
                            </div>
                            <div className = {styles.inputbox} >
                                <input type = "date" name = 'D3' disabled = {disabled.disabled}></input>
                                <p></p>
                                <input type = "date" name = 'D3' disabled = {disabled.disabled}></input>
                                <p></p>
                                <input type = "checkbox" name = 'D3' disabled = {disabled.disabled}></input>
                                <p></p>
                                <input type = "text" name = 'D3' disabled = {disabled.disabled}></input>
                            </div>
                        </div>
                            
                    </div>
                    <div className = {styles.mainbox}>
                        <div className = {styles.topic}>
                            <div>รายการผู้เช่า</div>
                        </div>
                        <div  className = {styles.text}>
                            <div className = {styles.flex}>
                                <input className = {styles.checkbox}  type = "checkbox" name ="selectAll" id="select-all" onChange={handleChange} ></input>
                                <div className = {styles.all} >เลือกทั้งหมด </div>

                            </div>
        
                            <p className = {styles.flex}>
                                <input  className = {styles.select}
                                type="text"
                                value={options_search.text}

                                onChange={(e) => {
                                    let _options_search = options_search
                                    _options_search.text = e.target.value 
                                    setoptions_search({..._options_search})
                                }}
                                
                                
                                />
                                
                                <select className={styles.buttonmain}
                                        value={ options_search.keyword } 
                                        onChange={ (e)=>{
										let _options_search = options_search
										_options_search.keyword = e.target.value 
										setoptions_search({..._options_search})
                                        console.log(options_search)
									}}

									>
                                    <option>ทั้งหมด</option>
                                    <option>ห้อง</option>
                                    <option>อาคาร</option>
                                    <option>ชั้น</option>
                                    <option>ประเภทห้อง</option>
                                </select> 
                                <button className= {styles.buttonmain}

                                onClick={ async () => {
                                        
                                            let _filter_rooms  =[]
                                            _filter_rooms = filter_rooms(rooms , options_search)

                                            setfilterrooms(_filter_rooms);
                                            console.log("filter",rooms);
                                            console.log("option",options_search)
									}}>กรอง</button>
                            </p>


                        </div>
                        <table className ={styles.table}>
                            <thead className ={styles.header}>
                                <tr >
                                    <td>{header_table[0]}</td>
                                    <td>{header_table[1]}</td>
                                    <td>{header_table[2]}</td>
                                    <td>{header_table[3]}</td>
                                    <td>{header_table[4]}</td>
                                    <td>{header_table[5]}</td>
                                </tr>
                            </thead>
                            <tbody className ={styles.body}>

                            {filterrooms.filter((room) => (room && room.status === 'จอง') || room.status === 'มีคนอยู่').map(
                                        (room) =>
                                            room ? (
                                                <tr>
                                                    <td width={'20px'} ><input 
                                                    type='checkbox' 
                                                    name = {room.id}
                                                    id="myCheckboxId"
                                                    checked = {room.isChecked}
                                                    onChange={handleChange}
                                                    /></td>
                                                    <td width={'60px'} >{room.floor && room.floor.building ? room.floor.building.name : '---'}</td>
                                                    <td width={'60px'} >{room.floor ? room.floor.name : '---'}</td>
                                                    <td width={'80px'} >{room.RoomType ? room.RoomType.name : '---'}</td>
                                                    <td width={'60px'}> {room.name ? room.name : '---'}</td>
                                                    <td width={'80px'} >{room.status ? room.status : '---'}</td>
                                                    
                                                </tr>
                                            ) : null
                                    )}





                            </tbody>
                            
                         
                            




                        </table>
                        <div className = {styles.detail}>
                            ออกใบแจ้งหนี้ : คือการออกใบแจ้งหนี้ให้ผู้เช่าทราบก่อนถึงวันชำระ 
                            สามารถออกได้ตามรอบบิลและกำหนดเอง(กรีณีมีการพักไม่เต็มเดือน)
                            และสามารถเลือกใบแจ้งหนี้ได้ทั้งหมดพร้อมกันได้



                        </div>

                    </div>
                    
                    



                    



                </div>
                
                <div className={styles.lastbutton}>
                    <button className = {styles.button} onClick={ ()=>{
                        console.log('IDrooms',IDrooms)
                        IDrooms.map(async (room) =>{

                            try{
                                
                                let _res = await addInvoice({
                                    variables: {
                                        input:{
                                            lists: room.checkin.Checkinoption.map(option =>{
                                                if(option.calculate_mode === 'ครั้งเดียว' ){
                                                    return null
                                                }else{
                                                    return {name :option.name ,price:option.price,number_item:option.number_item, type_price:option.type_price ,selectvat:option.selectvat }
                                                }

                                            }).filter(item=>item),
                                          
                                            roomid: `${room.id}`,
                                            monthlybilling: `${ date === '' ? Date.now() : date}`,
                                            
                                        }
                                        
                                    }
                                });
                                
                                if(_res.data){
                                        console.log("สร้างใบแจ้งหนี้สำเร็จ",room.id)
                                        
                                }else{
                                    console.log(_res)
                                     console.error("ไม่สามารถสร้างใบแจ้งหนี้ได้")
                                }
                           
                                
    
                            }catch(error){
                                console.log(error)
                            }
                            



                        })
                        
                    }}>
                        <i><CreateRoundedIcon/></i>
                        <div>ออกใบแจ้งหนี้</div>
                    </button>
                    <button className = {styles.button} onClick={
                        ()=>{ 
                            let myCheckboxMain = document.querySelector('#select-all');
                            let myCheckboxName = document.getElementsByName('myCheckboxName');
                            let myCheckboxNameLen = myCheckboxName.length 
                            for (var x=0; x<myCheckboxNameLen; x++){
                                myCheckboxName[x].checked=false;
                                myCheckboxMain.checked=false;
                                }
                            
                            let _IDrooms = IDrooms.filter(item => item !== item)
                            setIDrooms(_IDrooms)
                            console.log("IDrooms-else",_IDrooms)

                            let _date = date
                            _date =  '00-00-0000'
                            setdate(_date)
                        }
                    }>
                        <i><CancelRoundedIcon/></i>
                        <div>ยกเลิก</div>
                </button>
                </div>
                
            </div>



            








            
            
        </div>
    )
}