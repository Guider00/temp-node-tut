import styles from './Contract.module.css';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
    API_GET_Contract,
    API_CREATE_Contract,
    API_DELETE_Contract,
    API_UPDATE_Contract
} from '../../API/Schema/Contract/Contract'
import {
     API_GET_RoomType 
} from '../../API/Schema/RoomType/RoomType'


import { API_UPDATE_Room ,API_GET_Rooms} from '../../API/Schema/Room/Room'
import {  export_Contract   } from '../../general_functions/pdf/export/export_pdf';


import  { FileUploader  }  from './FileUploader/FileUploader'

const filter_rooms = (rooms , formfilter ,getStart,getEnd) =>{
    let _filter_table = []
    if(rooms && formfilter){
        _filter_table = rooms.filter(room =>{
            if(room){
                if(formfilter.option_search === 'เลือกอาคารทั้งหมด' && getStart == 17356266000000 && getEnd == 19249722000000 ){
                    console.log('All')
                    return ( room.Contractnumber && room.Contractnumber.search(formfilter.text) !==-1) ||
                    ( room.RoomType && room.RoomType.search(formfilter.text) !==-1) ||
                    ( room.RoomName && room.RoomName.search(formfilter.text) !==-1) ||
                    ( room.RentType && room.RentType.search(formfilter.text) !==-1) ||
                    ( room.name && room.name.search(formfilter.text) !==-1) ||
                    ( room.surname && room.surname.search(formfilter.text) !==-1) ||
                    ( room.Check_in && room.Check_in.search(formfilter.text) !==-1) ||
                    ( room.Check_out && room.Check_out.search(formfilter.text) !==-1) ||
                    ( room.status && room.status.search(formfilter.text) !==-1) ||
                    (formfilter.text === '')
                }else if(formfilter.option_search === 'เลือกอาคารทั้งหมด' && formfilter.text === ''){
                    console.log('Date select')
                    return ( room.Check_out && (new Date(room.Check_out).getTime().toString()) > getStart && (new Date(room.Check_out).getTime().toString()) < getEnd)
                    
                        
                }else if(formfilter.option_search === 'เลือกอาคารทั้งหมด' ){
                    console.log('Date Text select')
                    if( room.Check_out && (new Date(room.Check_out).getTime().toString()) > getStart && (new Date(room.Check_out).getTime().toString()) < getEnd ){
                        return ( room.RoomType && room.RoomType.search(formfilter.text) !==-1) ||
                        ( room.RoomName && room.RoomName.search(formfilter.text) !==-1) ||
                        ( room.name && room.name.search(formfilter.text) !==-1) ||
                        ( room.surname && room.surname.search(formfilter.text) !==-1)
                    }       
                }
                
                
                else{
                    return false
                }
            }else{
                return false;
            }
        })
    }
    return _filter_table
}










export const Contract = () => {
    
    const getRooms = useQuery(API_GET_Rooms)


    const Contract = useQuery(API_GET_Contract);
  
    const [ deleteContract, mutationdeleteContract ] = useMutation(API_DELETE_Contract);
    const updateContract = useMutation(API_UPDATE_Contract);

    const query_RoomType = useQuery(API_GET_RoomType);

    const [ roomtypes , setroomtypes ] = useState([])
    const [ loadingpage, setloadingpage] = useState(false)
    const [ rooms , setrooms ] = useState([])
    const [building ,setbuilding] = useState([])
    const [filterrooms , setfilterrooms] = useState([]);
    const [ IDrooms , setIDrooms]=useState([]);
    const [dateRange,setdateRange] = useState([]);
    const [getStart , setgetStart] = useState({});
    const [getEnd , setgetEnd] = useState([]);
    const [minDate , setminDate] = useState([]);
    const [maxDate , setmaxDate] = useState([]);

    const [tbsortingstyle_newmetoold , settbsortingstyle_newmetoold] = useState(true);
    
    const [selectedcontract,setselectedcontract] = useState(null)

    const [defaultformfilter ,setdefaultformfilter] = useState({
        id: null,
        checkin_date: '01/01/2520',
        checkin_date_exp: '01/01/2580',
        option_search:'เลือกอาคารทั้งหมด',
        text:'',
        
    })
    const [ formfilter , setformfilter ] = useState({
        id: null,
        checkin_date: '01/01/2520',
        checkin_date_exp: '01/01/2580',
        option_search:'เลือกอาคารทั้งหมด',
        text:'',
        

    })

    const handlerUpdateContract = (contract) =>{
        try{
                updateContract({
                    	variables: {
                        }
                })

                
        }catch(e){
            console.log(e)
        }
    }


    const handlerDeleteContract = async (contract) =>{
        try{
            console.log(contract.id)
              let res = await  deleteContract({
                        	variables: { 
                                id:`${contract.id}`
                            }
                        })
                if(res && res.data){
                     Contract.refetch() //<<
                }else{
                    // <<
                }
        }catch(e){
            console.log(e)
        }
    }

    const hadleChangedformfilterTodefault = () =>{
        setformfilter(defaultformfilter)
        console.log("setdefault-formfilter",formfilter)
    }

    const handleChangedformfilter = (e) => {
        let _formfilter = formfilter ;
        console.log('e', e.target.value, e.target.id, _formfilter)

        if(e.target.id && _formfilter.hasOwnProperty(e.target.id)){
            if( e.target.id === "option_search" ){
                _formfilter[e.target.id] = e.target.value;
                setformfilter({..._formfilter})
                console.log('_formfilter',_formfilter)

            }else if(e.target.id === "checkin_date_exp"){
                _formfilter[e.target.id] = e.target.value;
                setformfilter({..._formfilter})
                setmaxDate(e.target.value)
                console.log('_formfilter',_formfilter)

                
            }else if(e.target.id === "checkin_date"){
                _formfilter[e.target.id] = e.target.value;
                setformfilter({..._formfilter})
                setminDate(e.target.value)
                console.log('_formfilter',_formfilter)

            }else if(e.target.id === "text"){
                let text = /[^0-9a-zA-Zก-๙]/ig;
                e.target.value = e.target.value.replace(text,'')
                _formfilter[e.target.id] = e.target.value;
                setformfilter({..._formfilter})
                console.log('_formfilter',_formfilter)

            }else{
                return false
            }

        }
        if(formfilter.checkin_date && formfilter.checkin_date_exp){
            let _checkin = new Date(formfilter.checkin_date).getTime().toString()
            let _checkout = new Date(formfilter.checkin_date_exp).getTime().toString()
            
            if(_checkin > _checkout){
                alert('Can not Checkin > Checkout')
                hadleChangedformfilterTodefault()
            }
            else{
                console.log('complete')
            }
            



        }
    }
    const Rooms_to_table = (Rooms) =>{
        let table = [];
            table = Rooms.map((data)=>{
                let _data = data;
                return{
                    building:
						data.floor && data.floor.building && data.floor.building.name
							? data.floor.building.name 
							: '---' 
                }
            })
        return table
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

            let _IDrooms = filterrooms.map((room)=> {
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
    
    
    

    const monthPage = () => {
        let monthButton = document.querySelector('#month')
        let dayButton = document.querySelector('#day')
        let inputD1 = document.getElementById('D1')
        let inputD2 = document.getElementById('D2')
        let inputD3 = document.getElementById('D3')
        let inputD4 = document.getElementById('D4')
        let inputD5 = document.getElementById('D5')
        let inputD6 = document.getElementById('D6')
        let inputD7 = document.getElementById('D7')
        let inputD8 = document.getElementById('D8')
        let inputD9 = document.getElementById('D9')
        let inputD10 = document.getElementById('D10')
        let inputD11 = document.getElementById('D11')
        let inputD12 = document.getElementById('D12')
        let inputD13 = document.getElementById('D13')

        let inputD14 = document.getElementById('D14')
        let inputD15 = document.getElementById('D15')
        let inputD16 = document.getElementById('D16')
        let inputD17 = document.getElementById('D17')
        let inputD18 = document.getElementById('D18')
        let inputD19 = document.getElementById('D19')
        let inputD20 = document.getElementById('D20')
        let inputD21 = document.getElementById('D21')
        let inputD22 = document.getElementById('D22')
        let inputD23 = document.getElementById('D23')
        let inputD24 = document.getElementById('D24')

        if(monthButton.checked == true){
            dayButton.checked = false
            inputD1.disabled=false;
            inputD2.disabled=false;
            inputD3.disabled=false;
            inputD4.disabled=false;
            inputD5.disabled=false;
            inputD6.disabled=false;
            inputD7.disabled=false;
            inputD8.disabled=false;
            inputD9.disabled=false;
            inputD10.disabled=false;
            inputD11.disabled=false;
            inputD12.disabled=false;
            inputD13.disabled=false;

            inputD14.disabled=true;
            inputD15.disabled=true;
            inputD16.disabled=true;
            inputD17.disabled=true;
            inputD18.disabled=true;
            inputD19.disabled=true;
            inputD20.disabled=true;
            inputD21.disabled=true;
            inputD22.disabled=true;
            inputD23.disabled=true;
            inputD24.disabled=true;
        }

    }

    const dayPage = () => {
        let monthButton = document.querySelector('#month')
        let dayButton = document.querySelector('#day')

        let inputD1 = document.getElementById('D1')
        let inputD2 = document.getElementById('D2')
        let inputD3 = document.getElementById('D3')
        let inputD4 = document.getElementById('D4')
        let inputD5 = document.getElementById('D5')
        let inputD6 = document.getElementById('D6')
        let inputD7 = document.getElementById('D7')
        let inputD8 = document.getElementById('D8')
        let inputD9 = document.getElementById('D9')
        let inputD10 = document.getElementById('D10')
        let inputD11 = document.getElementById('D11')
        let inputD12 = document.getElementById('D12')
        let inputD13 = document.getElementById('D13')
        

        let inputD14 = document.getElementById('D14')
        let inputD15 = document.getElementById('D15')
        let inputD16 = document.getElementById('D16')
        let inputD17 = document.getElementById('D17')
        let inputD18 = document.getElementById('D18')
        let inputD19 = document.getElementById('D19')
        let inputD20 = document.getElementById('D20')
        let inputD21 = document.getElementById('D21')
        let inputD22 = document.getElementById('D22')
        let inputD23 = document.getElementById('D23')
        let inputD24 = document.getElementById('D24')

        if(dayButton.checked == true){
            monthButton.checked = false
            inputD14.disabled=false;
            inputD15.disabled=false;
            inputD16.disabled=false;
            inputD17.disabled=false;
            inputD18.disabled=false;
            inputD19.disabled=false;
            inputD20.disabled=false;
            inputD21.disabled=false;
            inputD22.disabled=false;
            inputD23.disabled=false;
            inputD24.disabled=false;

            inputD1.disabled=true;
            inputD2.disabled=true;
            inputD3.disabled=true;
            inputD4.disabled=true;
            inputD5.disabled=true;
            inputD6.disabled=true;
            inputD7.disabled=true;
            inputD8.disabled=true;
            inputD9.disabled=true;
            inputD10.disabled=true;
            inputD11.disabled=true;
            inputD12.disabled=true;
            inputD13.disabled=true;
            
        }

    }

    


    

    useEffect(  () =>{        
        if(getRooms.data){  
            let Rooms = Rooms_to_table(getRooms.data.Rooms)
            let _building = building
            _building = [...new Set(Rooms.map(item => item.building))]
            setbuilding(_building)
        

            
            
        }
        if(formfilter){
            const startDate = new Date(formfilter.checkin_date)
            const startEnd = new Date(formfilter.checkin_date_exp)

            let _getStart = getStart
            _getStart = startDate.getTime().toString()
            setgetStart(_getStart)

            let _getEnd = getEnd
            _getEnd = startEnd.getTime().toString()
            setgetEnd(_getEnd)

            console.log('_getStart',_getStart)
            console.log('_getEnd',_getEnd)

        }

       
        setloadingpage(true);
    },[getRooms, loadingpage,formfilter])
    
   
   

    useEffect(() =>{
        if( Contract && Contract.data && Contract.data.Contracts){
            let _contract = rooms
            _contract = [...Contract.data.Contracts]
            setrooms([..._contract]);
            setfilterrooms([..._contract])
        }
         if(query_RoomType && query_RoomType.data && query_RoomType.data.RoomTypes){
            let _roomtypes = roomtypes
            _roomtypes = [...query_RoomType.data.RoomTypes]
            setroomtypes([..._roomtypes])
        }
        
        setloadingpage(true);

    },[loadingpage , Contract , query_RoomType])

   



    let head_table = ['','เลขที่สัญญา','ประเภทห้อง','ชื่อห้อง','ประเภทสัญญา','ชื่อผู้เช่า','นามสกุล','วันที่ขอสัญญา','สถานะ','ไฟล์เอกสารสัญญา','วันที่ปิดสัญญา']

    return (
        <>
            <div className={styles.container}>
                <div className={styles.zone1}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            <lable className={styles.contract}>รายการสัญญา</lable>
                        </div>
                        <div className={styles.dateinput}>
                            <label className={styles.date}>วันที่ :</label>
                            <input  id = 'checkin_date'type='date' min= "2015-01-01" max={maxDate} className={styles.inputdate} onChange={handleChangedformfilter}></input>
                            <label className={styles.to}>ถึง :</label>
                            <input id = 'checkin_date_exp' type='date' min= {minDate} className={styles.inputdate} onChange={handleChangedformfilter}></input>
                            <br/>
                            <label className={styles.selectAll} >เลือกทั้งหมด</label>
                            <input type = 'checkbox' className={styles.checkbox} name ="selectAll" id="select-all" onChange={selectAll}></input>
                            <label className={styles.building}>อาคาร :</label>
                            <select id = 'option_search' className={styles.select} onChange={handleChangedformfilter}>
                                <option> เลือกอาคารทั้งหมด </option>
                                { building.map((room)=> room ? (
                                    <option>{room}</option>
                                ) : null)
                                
                                }
                               
                            </select>
                        </div>
                        

                    </div>
                    <div className={styles.body}>
                        <div className={styles.filter}>
                            <input id = 'text' className={styles.input} onChange={handleChangedformfilter}></input>
                            <button className={styles.button} onClick={
                                async () => {
                                    let _filter_rooms = []
                                    _filter_rooms = filter_rooms(rooms, formfilter ,getStart , getEnd)
                                    setfilterrooms(_filter_rooms)
                                    console.log("_filter_rooms-1",_filter_rooms)
                                    
                                }
                            }>กรอง</button>
                            <button className={styles.button} onClick={hadleChangedformfilterTodefault}>ทั้งหมด</button>
                        </div>

                        <div className={styles.test}>

                        
                            <table className={styles.table}>
                                <thead className={styles.head}>
                                    <tr>
                                        <td onClick={
                                            ()=>{
                                                let _tbsortingstyle_newtoold = tbsortingstyle_newmetoold
                                                settbsortingstyle_newmetoold(!_tbsortingstyle_newtoold)
                                            }
                                            }>{tbsortingstyle_newmetoold?<ArrowDropDownIcon/>:<ArrowDropUpIcon/>}</td>
                                        <td>{head_table[1]}</td>
                                        <td>{head_table[2]}</td>
                                        <td>{head_table[3]}</td>
                                        <td>{head_table[4]}</td>
                                        <td>{head_table[5]}</td>
                                        <td>{head_table[6]}</td>
                                        <td>{head_table[7]}</td>
                                        <td>{head_table[8]}</td>
                                        <td>{head_table[9]}</td>
                                        <td>{head_table[10]}</td>

                                    </tr>
                                </thead>
                                {console.log("filterrooms",filterrooms,[...filterrooms].reverse())}
                                <tbody className={styles.body}>{
                                (tbsortingstyle_newmetoold ?  [...filterrooms].reverse():filterrooms ).map((item) => item ?
                                (   <tr 
                                        onClick={()=>{
                                            let _selectedcontract = selectedcontract
                                            _selectedcontract = item
                                            setselectedcontract({..._selectedcontract})
                                            console.log(item)
                                        }}
                                        style={{
														background:  (selectedcontract && selectedcontract.id === item.id) ? 'lightgray' : 'none'
										}}
                                    >
                                        <td>
                                            <input type='checkbox' name = "myCheckboxName" id="myCheckboxId"
                                            checked={ (IDrooms.findIndex(x=>x.id ===item.id) !== -1 )  ?true:false}
                                            onChange={(e)=>{
                                                const check = e.target.checked
                                                const id = item.id
                                                if(check){
                                                    let _IDrooms = IDrooms
                                                    _IDrooms = [..._IDrooms,item]
                                                    setIDrooms(_IDrooms)
                                                    console.log('_IDrooms',_IDrooms)

                                                }else{
                                                    let _IDrooms = IDrooms.filter(item => item.id !== id)
                                                    setIDrooms(_IDrooms)
                                                    console.log('_IDrooms',_IDrooms)
                                                }
                                                
                                            }}/>
                                        </td>
                                        <td>{ item && item.Contractnumber ?  item.Contractnumber  : "---"}</td>
                                        <td>{ item && item.Room && item.Room.RoomType.name ?  item.Room.RoomType.name :  "---"}</td>
                                        <td>{ item && item.Room && item.Room.name ? item.Room.name : "---"}</td>
                                        <td>{ item && item.Room && item.Room.checkin && item.Room.checkin.checkin_type ? item.Room.checkin.checkin_type  :"---"}</td>
                                        <td>{ item && item.Room && item.Room.members &&  item.Room.members.length>0  &&  item.Room.members[0].name ?  item.Room.members[0].name :"---"  }</td>
                                        <td>{ item && item.Room && item.Room.members &&  item.Room.members.length>0  &&  item.Room.members[0].lastname ?  item.Room.members[0].lastname :"---" }</td>
                                        <td>{ item && item.Room && item.Room.checkin &&  item.Room.checkin.checkin_date ? item.Room.checkin.checkin_date : "---"}</td>
                                        <td>{ item && item.status ? item.status :"---"}</td>
                                        <td>{ item && item.Room && item.Room.checkout &&  item.Room.checkout.checkout_date ?  item.Room.checkout.checkout_date : "---" }</td>

                                        <td>{ item && item.Room && item.Room.checkout &&  item.Room.checkout.checkout_date ?  item.Room.checkout.checkout_date : "---" }</td>

                                    </tr> 
                                    ) : null )}
                                    
                                            
            
                                </tbody>
                            </table>
                        </div>


                    </div>
                    <div className={styles.button}>
                        <button className={styles.print}
                          
                            onClick={async ()=>{
                                try{
                                  
                                    if( IDrooms && IDrooms.length > 0 ){
                                        export_Contract( IDrooms )
                                        // let res_s =  await Promise.all( await IDrooms.map(async  idroom=>{ 
                                        //     console.log(idroom)
                                         
                                        //     return idroom
                                        //  } ))
                                        // console.log('res_s',res_s)
                                        // if(res_s){
                                            
                                        // }
                                    }
                                }catch(e){
                                    console.log(e)
                                }
                            }}
                        >พิมพ์</button>
                    </div>

                </div>
                <div className={styles.zone2}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            <div className={styles.contract}>รายละเอียดสัญญา</div>
                        </div>
                    </div>
                    <div className={styles.subheader}>
                        <lable className={styles.subheadertext}>ชื่อประเภทห้อง :</lable>
                        <select className={styles.subheaderselect} 
                             value={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType &&
                            selectedcontract.Room.RoomType.name ?  selectedcontract.Room.RoomType.name :"" }
                        >
                            {console.log('roomtypes',roomtypes)}
                            {roomtypes.map(roomtype => <option>{roomtype && roomtype.name ?roomtype.name:"---"}</option>)

                            }

                        </select>

                    </div>
                    
                    <div className={styles.inputmonthandday}>
                        <h1 className={styles.line}></h1>
                        <div  className={styles.month}>
                            <lable className={styles.month}>รายเดือน :</lable>
                            <input id = 'month' type = 'radio'  className={styles.check} onChange={monthPage}
                                  checked = {selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType && selectedcontract.Room.RoomType.type && 
                                     selectedcontract.Room.RoomType.type  === "รายเดือน"?   true: false }
                            />
                            <div className={styles.input1}>
                                <lable className={styles.inputtext1}>ค่าเช่าห้อง :</lable>
                                <input id = 'D1' placeholder='0.00' className={styles.inputbox1}
                                 defaultValue={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType &&
                                     selectedcontract.Room.RoomType.monthlyprice ?  selectedcontract.Room.RoomType.monthlyprice :"" }
                                ></input>
                                <lable className={styles.inputtext2}>ค่าประกัน :</lable>
                                <input  id = 'D2' placeholder='0.00' className={styles.inputbox2}
                                defaultValue={selectedcontract && selectedcontract.Room &&  selectedcontract.Room.checkin &&
                                selectedcontract.Room.checkin.rental_deposit ? selectedcontract.Room.checkin.rental_deposit :""}
                                ></input>
                                <br/>
                                <lable className={styles.inputtext3}>ค่าเช่าล่วงหน้า :</lable>
                                <input id = 'D3' placeholder='0.00' className={styles.inputtext3}></input>
                            </div>
                            <lable className={styles.submonth}>ค่าสาธารณูปโภค</lable>
                            <div className={styles.input2}>
                                <lable className={styles.inputtext1}>คิดค่าใช้จ่าย</lable>
                                <lable className={styles.inputtext2}>อัตราบริการต่อหน่วย</lable>
                                <lable className={styles.inputtext3}>อัตราต่อขั้นต่ำ</lable>
                                <lable className={styles.inputtext4}>เหมาจ่าย</lable>
                                <br/>
                                <lable className={styles.inputtext5}>ไฟฟ้า :</lable>
                                <input id = 'D4' placeholder='0.00' className={styles.inputtext6} type = 'checkbox'
                                
                                />
                                {console.log('rate_electrical',selectedcontract)}
                                <input id = 'D5' placeholder='0.00' className={styles.inputbox1}  
                                  defaultValue={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType &&
                                   selectedcontract.Room.RoomType.rate_electrical ? selectedcontract.Room.RoomType.rate_electrical : ""}
                                ></input>
                              
                                <input id = 'D6' placeholder='0.00' className={styles.inputbox2}/>
                                <lable>บาท</lable>
                                <input id = 'D7' placeholder='0.00' className={styles.checkbox2} type = 'checkbox'/>
                                <input id = 'D8' placeholder='0.00' className={styles.inputbox3}
                                   defaultValue={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType &&
                                   selectedcontract.Room.RoomType.totalprice_electrical ? selectedcontract.Room.RoomType.totalprice_electrical : ""}
                                />
                                <lable>บาท</lable>
                                <br/>
                                <lable className={styles.inputtext7}>น้ำ :</lable>
                                <input id = 'D9' placeholder='0.00' className={styles.inputtext6} type = 'checkbox'/>
                                <input id = 'D10' placeholder='0.00' className={styles.inputbox1}
                                    defaultValue={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType &&
                                   selectedcontract.Room.RoomType.rate_water ? selectedcontract.Room.RoomType.rate_water : ""}
                                />
                                <input id = 'D11' placeholder='0.00' className={styles.inputbox2}></input>
                                <lable>บาท</lable>
                                <input id = 'D12' placeholder='0.00' className={styles.checkbox2} type = 'checkbox'/>
                                <input id = 'D13' placeholder='0.00' className={styles.inputbox3}
                                     defaultValue={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType &&
                                   selectedcontract.Room.RoomType.totalprice_water ? selectedcontract.Room.RoomType.totalprice_water : ""}
                                />
                                <lable>บาท</lable>
                            </div>
               
                        </div>
                        <h1 className={styles.line}></h1>
                        <div className={styles.day}>
                                <lable className={styles.day}>รายวัน :</lable>
                                <input id = 'day' type='radio' className={styles.check} onChange={dayPage}
                                    checked = {selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType && selectedcontract.Room.RoomType.type && 
                                     selectedcontract.Room.RoomType.type  === "รายวัน"?   true: false }
                                 
                                />
                                <div className={styles.input1}>
                                    <lable className={styles.inputtext1}>ค่าเช่าห้อง :</lable>
                                    <input id = 'D14' disabled = 'disabled' placeholder='0.00' className={styles.inputbox1}
                                        defaultValue={selectedcontract && selectedcontract.Room && selectedcontract.Room.RoomType &&
                                        selectedcontract.Room.RoomType.dailyprice ? selectedcontract.Room.RoomType.dailyprice : ""}
                                    />
                                </div>
                                <lable className={styles.subday}>ค่าสาธารณูปโภค</lable>
                                <div className={styles.input2}>
                                    <lable className={styles.inputtext1}>คิดค่าใช้จ่าย</lable>
                                    <lable className={styles.inputtext2}>อัตราบริการต่อหน่วย</lable>
                                    <lable className={styles.inputtext3}>อัตราต่อขั้นต่ำ</lable>
                                    <lable className={styles.inputtext4}>เหมาจ่าย</lable>
                                    <br/>
                                    <lable className={styles.inputtext5}>ไฟฟ้า :</lable>
                                    <input id = 'D15' disabled = 'disabled' placeholder='0.00' className={styles.inputtext6} type = 'checkbox'/>
                                    <input id = 'D16' disabled = 'disabled' placeholder='0.00' className={styles.inputbox1}></input>
                                    <input id = 'D17' disabled = 'disabled' placeholder='0.00' className={styles.inputbox2}></input>
                                    <lable>บาท</lable>
                                    <input id = 'D18' disabled = 'disabled' placeholder='0.00' className={styles.checkbox2} type = 'checkbox'/>
                                    <input id = 'D19' disabled = 'disabled' placeholder='0.00' className={styles.inputbox3}></input>
                                    <lable>บาท</lable>
                                    <br/>
                                    <lable className={styles.inputtext7}>น้ำ :</lable>
                                    <input id = 'D20' disabled = 'disabled' placeholder='0.00' className={styles.inputtext6} type = 'checkbox'/>
                                    <input id = 'D21' disabled = 'disabled' placeholder='0.00' className={styles.inputbox1}></input>
                                    <input id = 'D22' disabled = 'disabled' placeholder='0.00' className={styles.inputbox2}></input>
                                    <lable>บาท</lable>
                                    <input id = 'D23' disabled = 'disabled' placeholder='0.00' className={styles.checkbox2} type = 'checkbox'/>
                                    <input id = 'D24' disabled = 'disabled' placeholder='0.00' className={styles.inputbox3}></input>
                                    <lable>บาท</lable>
                                </div>
                                  <h1 className={styles.line}></h1>
                                <div className={styles.input3} >
                                    <FileUploader handleFile={(file)=>
                                         console.log('file',file)
                                    }/>
                                   
                                </div>
                                  
                                <div>
                                      <h1 className={styles.line}></h1>
                                </div>
                  
                                <div className={styles.buttonzone}>
                     
                                    <button className={styles.save}   disabled={(selectedcontract?false:true)} >
                                        <SaveIcon/>
                                        <br/>
                                        บันทึก
                                    </button>

                                
                                    
                                    <button className={styles.cancel} disabled={(selectedcontract?false:true)}
                                        onClick={()=>{  handlerDeleteContract(selectedcontract) }}
                                    >
                                        <CancelIcon/>
                                        <br/>
                                        ยกเลิกสัญญา
                                    </button>

                                </div>

                        </div>
                        

          

                        

                    </div>
                    

                </div>
               
            </div>
        </>
    )
}