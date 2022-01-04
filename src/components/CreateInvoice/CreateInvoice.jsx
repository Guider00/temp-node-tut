import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import styles from './CreateInvoice.module.css';
import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { API_queryRooms} from '../../API/index';


const filter_rooms = (rooms , options_search) =>{
    let _filter_table = []
    if(rooms  &&  options_search){
        _filter_table = rooms.filter(room =>{
                if(room){
                    if(options_search.keyword === 'ทั้งหมด'){
                        console.log("all")
                        return (room.room && room.room.search(options_search.text) !== -1 ) ||
                        (room.building && room.building.search(options_search.text) !== -1 ) || 
                        (room.floor && room.floor.search(options_search.text) !== -1 ) ||
                        (room.RoomType && room.RoomType.search(options_search.text) !== -1 ) ||
                        (room.status && room.status.search(options_search.text) !== -1 ) ||
                        (options_search.text === '')	
                        ;
                    }else if (options_search.keyword === 'ห้อง'){                      
                        return (room.room.search(options_search.text) !== -1 )||
                        (options_search.text === '')	
                    }else if (options_search.keyword === 'อาคาร'){
                        return (room.building.search(options_search.text) !== -1 )||
                        (options_search.text === '')	
                    }else if( options_search.keyword === 'ชั้น' ){
                        return (room.floor.search(options_search.text) !== -1 )	||
                        (options_search.text === '')	
                    }else if( options_search.keyword === 'ประเภทห้อง'){
                        return (room.RoomType && room.RoomType.search(options_search.text) !== -1 )	||
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

    const [ options_search  ,setoptions_search] = useState({
		text:"",
		keyword:"ทั้งหมด"
	})
    const [rooms , setrooms] = useState([]);
    const [filterrooms , setfilterrooms] = useState([]);
    const [ loadingpage, setloadingpage ] = useState(false);


    const getRooms = async () => {
        return new Promise(async (resolve, reject) => {
            
            let res = await API_queryRooms();
            console.log("get-first-res",res)
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
    

    useEffect(
        () => {
            async function fetchData() {
                let Rooms = await getRooms();
                setrooms(Rooms);
                setfilterrooms(Rooms);
            }
            console.log('rooms',rooms)
            fetchData();
            setloadingpage(true);
        },
        [ loadingpage ]
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
        
        if(myCheckboxMain.checked == true){
            for (var x=0; x<myCheckboxNameLen; x++){
                myCheckboxName[x].checked=true;
                }

        }
        
        else{
            for (var x=0; x<myCheckboxNameLen; x++){
                myCheckboxName[x].checked=false;
                }

        }
        
        
        

        

    }
   
    
    

  

    let header_table = ["","อาคาร","ชั้น","ประเภทห้อง","ห้อง","ประเภทการเช่า"]
    let sim_table = [{"":"","อาคาร":"อาคารเอ","ชั้น":"01","ประเภทห้อง":"ห้องแอร์","ชื่อห้อง":"101","ประเภทการเช่า":"รายเดือน"},{"":"","อาคาร":"อาคารเอ","ชั้น":"01","ประเภทห้อง":"ห้องแอร์","ชื่อห้อง":"101","ประเภทการเช่า":"รายเดือน"}]
    return (
        <div className = {styles.zone}>
            {/* {createInvoices.map(item => {
                return (<p>
                    {item.id}
                    {item.room_type}
                    </p>)
                    }
                )} */}
            <div className = {styles.bigbox}>
                <div className = {styles.flex}>
                    <lable className = {styles.head}>ออกใบแจ้งหนี้</lable>
                    <div className = {styles.topic}> รอบบิล <input type = "date"></input>
                </div>
                </div>
                <div className = {styles.normalbox}>
                    
                    <div className = {styles.displaybox}>
                        <div className = {styles.display1}>       
                            <div className = {styles.topic}>รูปแบบออกใบแจ้งหนี้</div>
                        </div>
                        <div className = {styles.radio} >
                            
                            

                            <div className = {styles.radio1}>
                            <input type = "radio" id = 'D1' name = 'D1' checked = 'true' onChange={supPage}></input>
                            <lable>ออกตามรอบบิล</lable>
                            </div>
                            <div className = {styles.radio2}>
                            <input type = "radio" id = 'D2' name = 'D2'  onChange={mainPage}></input>
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
                                <input type = "date" name = 'D3' disabled = 'disabled'></input>
                                <p></p>
                                <input type = "date" name = 'D3' disabled = 'disabled'></input>
                                <p></p>
                                <input type = "checkbox" name = 'D3' disabled = 'disabled'></input>
                                <p></p>
                                <input type = "text" name = 'D3' disabled = 'disabled'></input>
                            </div>
                        </div>
                            
                    </div>
                    <div className = {styles.mainbox}>
                        <div className = {styles.topic}>
                            <div>รายการผู้เช่า</div>
                        </div>
                        <div  className = {styles.text}>
                            <div className = {styles.flex}>
                                <input className = {styles.checkbox}  type = "checkbox" name ="selectAll" id="select-all" onChange={selectAll} ></input>
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
                                                    <td width={'20px'} ><input type='checkbox' name = "myCheckboxName" id="myCheckboxId"/></td>
                                                    <td width={'60px'} >{room.building ? room.building : '---'}</td>
                                                    <td width={'60px'} >{room.floor ? room.floor : '---'}</td>
                                                    <td width={'80px'} >{room.RoomType ? room.RoomType : '---'}</td>
                                                    <td width={'60px'}>{room.room ? room.room : '---'}</td>
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
                    <button className = {styles.button}>
                        <i><CreateRoundedIcon/></i>
                        <div>ออกใบแจ้งหนี้</div>
                    </button>
                    <button className = {styles.button}>
                        <i><CancelRoundedIcon/></i>
                        <div>ยกเลิก</div>
                </button>
            </div>
                
            </div>



            








            
            
        </div>
    )
}