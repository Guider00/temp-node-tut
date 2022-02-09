
import styles from './Receipt.module.css';
import { useEffect, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { API_GET_Receipt,API_CREATE_Receipt,API_DELETE_Receipt,API_UPDATE_Receipt} from '../../API/Schema/Receipt/Receipt'
import { useQuery , useMutation } from '@apollo/client';
import { set } from 'mongoose';



import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

import {  export_Receipt_pdf  , export_Receipts_pdf , export_taxinvoice_pdf ,export_taxinvoices_pdf   } from '../../general_functions/pdf/export/export_pdf';

import {handlerCreateRecipt , handlerCancelRecipt ,list_to_show} from './function'
import {  toYYMM , toYYMMDD  ,getlaststring  } from '../../general_functions/convert';
export const Receipt = () => {

    const Receipt = useQuery(API_GET_Receipt,)
    console.log('Receipt',Receipt)
    
    const [receipt , setreceipt] = useState([])
    const [IDrooms , setIDrooms] = useState([])
    const [selectrooms , setselectrooms] = useState([])

    const [ createReceipt ]  = useMutation(API_CREATE_Receipt) 

    const [ deleteReceipt ] =  useMutation(API_DELETE_Receipt)

    const [ updateReceipt ] = useMutation(API_UPDATE_Receipt)
    

    const Inputdatenow = ()=>{
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        let today = year + "-" + month + "-" + day;
        
        return today
    }
    const lengthdate = (Inputdate1 , Inputdate2) =>{
        const start_date =  new Date(Inputdate1) 
        const end_date =  new Date(Inputdate2) 
        const diffTime = Math.abs(start_date.getTime() - end_date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays
    }
    /** ---------------  */

    const [ formsearch, setformsearch  ] = useState({
         startdate :Inputdatenow(),
         enddate:Inputdatenow(),
         lenghthdispaly:"",
         duedate:""

    })
    const [ formreceiptinformation , setreceiptinformation] = useState({
        monthlybilling:"",
        status:"",
        editmode:false,
        note:"",
        lists:[]
    })

    const handleChangeformsearch =(e) =>{
        let _formsearch = formsearch
		if (e.target.id && _formsearch.hasOwnProperty(e.target.id) ) {
			_formsearch[e.target.id] = e.target.value;  //<< set value by ID 
            if(e.target.id === 'startdate' )
            {
                _formsearch.lenghthdispaly  = lengthdate (e.target.value,_formsearch.enddate)
            }else if( e.target.id === 'enddate' ){
                 _formsearch.lenghthdispaly  = lengthdate (_formsearch.startdate,e.target.value)
            }
			setformsearch({ ..._formsearch });
		}
    }
    const handlerChangereceiptinformation =(e)=>{
        if(e && e.target){
            let{ name , value } = e.target
            let _selectrooms = JSON.parse(JSON.stringify(selectrooms))
            console.log(`value ${name}`,_selectrooms ,)
           if( _selectrooms.hasOwnProperty(name)){
               if(name === 'editmode' ){
                    _selectrooms[name] = !_selectrooms[name]
               }else{
                   
                    _selectrooms[name] = value
               }
               setselectrooms(_selectrooms)
           }

        }
    }
    const handlerchangelist =(e ,index)=>{
        let  _selectroom = JSON.parse( JSON.stringify(selectrooms))
        if(e.target.name === 'name'){
          // console.log(e.target.value)
        }else if(e.target.name === 'number_item'){
            // validate data 
        }else if(e.target.name === 'price'){
            // validate data 
        }
        _selectroom.lists[index][e.target.name] = e.target.value
        setselectrooms(_selectroom)
    }

    const handlerDeletereceipt = async (receipt) =>{
  
            try{
              
                Promise.all(IDrooms).then(  IDrooms =>{
                    IDrooms.map(async IDroom =>{
                        console.log('IDroom.id',IDroom)
                        let _res =  await deleteReceipt({
                                        variables: {
                                        id: IDroom.id,
                                        }
                                    })
                        if(_res && _res.data){
                            console.log("ลบข้อมูลสำเร็จ receipt ")
                            setIDrooms([]) // << clear ID Room 
                            Receipt.refetch();
                        }else{
                            console.error("ไม่สามารถลบ receipt ")
                        }
                    })
                })

            }catch(e){
                console.error(" catch  Deletereceipt ")
            }
        
    }
    const handlerSavereceipt = async  (receipt)=>{
        if(receipt){    
            try{
                let _res = await updateReceipt({
                                                    variables: {
                                                        id: receipt.id,
                                                        input: {
                                                            lists:receipt.lists.map(option =>({name :option.name ,price:option.price,number_item:option.number_item, vat:option.vat ,type_price:option.type_price ,selectvat:option.selectvat }) )
                                                        }
                                                    }
                                            })
                if(_res && _res.data){
                    console.log('บันทึกสำเร็จ')
                     // re
            
                     Receipt.refetch();
               
                }else{
                    console.error('ไม่สามารถบันทึกค่า receipt')
                }
            }catch(e){
                console.error("catch Saverecipt",e)
            }
        }else{
            console.error('input receipt ไม่ถูกต้อง')
        }
    }

    const [tbsortingstyle_newmetoold , settbsortingstyle_newmetoold] = useState(true);
    const handlerchangesortingstyle =() =>{
         let _tbsortingstyle_newtoold = tbsortingstyle_newmetoold
         settbsortingstyle_newmetoold(!_tbsortingstyle_newtoold)
    }

    const building = () =>{


    }
    const status = () =>{

    }
    const detail = () => {



    }
    const round = () => {



    }

    useEffect(()=>{

        if(Receipt && Receipt.data && Receipt.data.Receipts){
            let _receipt = receipt
            _receipt = Receipt.data.Receipts
            setreceipt(_receipt)
            
            console.log("_receipt_receipt_receipt",_receipt)

        }

        

    },[Receipt,Receipt.data])





    let header_table = ["","เลขที่ใบเสร็จ","เลขที่ใบแจ้งหนี้","วันที่ออกบิล","ชื่อห้อง","ชื่อผู้จอง","สถานะ","สถานะการพิมพ์","รอบบิล"]
    let sim_table = [{"เลือก":"","เลขที่ใบเสร็จ":"PEM12345678910","เลขที่ใบแจ้งหนี้":"DEV12345678910","วันที่ออกบิล":"1/2/2021","ชื่อห้อง":"205","ชื่อผู้จ..":"","สถานะ":"ปกติ","สถานะการพิมพ์":"พิมพ์แล้ว","รอบบิล":"02/2022"}]

    let header_table2 = ["รายการ","ชื่อรายการใช้จ่าย","จำนวน","จำนวนเงิน","ราคา","ภาษีมูลค่าเพิ่ม","จำนวนเงิน","ภาษี"]
    let sim_table2 = [{"รายการ":"1","ชื่อรายการใช้จ่าย":"ค่าเช่าห้อง","จำนวน":"1","จำนวนเงิน":"300.00","ราคา":"205","ภาษีมูลค่าเพิ่ม":"1","จำนวนเงิน2":"200.00"}]


    return (
        <>
        
            <div className={styles.main}>
                
          
                <div className={styles.zone1}>
                    <div className={styles.formtableInvoice} >
                        <div className={styles.card}>
                            <div className={styles.cardheader}>
                                <label> ตารางใบเสร็จ</label>
                            </div>

                            <div className={styles.cardbody}>
                                <div className={styles.row} >
                                    <label> วันที่ </label>
                                    <input className ={styles.spaceonerem} id="startdate" type="date" value={formsearch.startdate} onChange={handleChangeformsearch}></input>

                                    <label className ={styles.spaceonerem}> ถึง </label>
                                    <input className ={styles.spaceonerem} id="enddate" type="date"  value={formsearch.enddate} onChange={handleChangeformsearch} ></input>
                                    <label className ={styles.spaceonerem}> แสดงผล </label>
                                    <input className ={styles.spaceonerem}  id="lenghthdispaly" value={formsearch.lenghthdispaly} onChange={handleChangeformsearch} ></input>
                                </div>
                                <div>
                                    <label> รอบบิล </label>
                                    <input className ={styles.spaceonerem} id="duedate" type="date"  value={formsearch.duedate} onChange={handleChangeformsearch} ></input>
                                   
                                </div>
                                <p>
                                    <lable >อาคาร</lable>
                                    <input className ={styles.Building} id="building" value ={formsearch.building} onChange={handleChangeformsearch} ></input>
                                </p>

                                <table className ={styles.table}>

                                    <thead className ={styles.header}>
                                        <tr >
                                            <td onClick={handlerchangesortingstyle}> {tbsortingstyle_newmetoold?<ArrowDropDownIcon/>:<ArrowDropUpIcon/>}  </td>
                                            <td>{header_table[1]}</td>
                                            <td>{header_table[2]}</td>
                                            <td>{header_table[3]}</td>
                                            <td>{header_table[4]}</td>
                                            <td>{header_table[5]}</td>
                                            <td>{header_table[6]}</td>
                                            <td>{header_table[7]}</td>
                                            <td>{header_table[8]}</td>
                                        </tr>
                                    </thead>
                                    <tbody className ={styles.body}>
                                        { ( tbsortingstyle_newmetoold? receipt :  [...receipt].reverse() ).map( (data) =>
                                        <tr onClick={()=>{

                                            let _selectrooms = selectrooms
                                            _selectrooms = data
                                            _selectrooms = {..._selectrooms , editmode :false}
                                            setselectrooms(_selectrooms)
                                            console.log(_selectrooms)
                        
                                            
                                            
                                        }} style={{
                                            background: selectrooms.id === data.id ? 'lightgray' : 'none'
                                        }}>
                                            <td>    
                                                <input type="checkbox" 
                                                name = "myCheckboxName" 
                                                id="myCheckboxId" 
                                                 checked={ (IDrooms.findIndex(x=>x.id === data.id) !== -1 )  ?true:false}

                                                onChange={(e)=>{
                                                  const checked = e.target.checked
                                                    const id = data.id
                                                    if(checked){
                                                        let _IDrooms = IDrooms
                                                        _IDrooms = [..._IDrooms,data]
                                                        setIDrooms(_IDrooms)
                                                        console.log("check",_IDrooms)

                                                        
                                                    }
                                                    else{
                                                        let _IDrooms = IDrooms.filter(item => item.id !== id)
                                                        setIDrooms(_IDrooms)
                                                        console.log('uncheck',_IDrooms)
                                                    }

                                                }}
                                                ></input>
                                            </td>
                                            {console.log('data.Invoice',data)}
                                            <td width={'100px'}>{data.id ?  getlaststring( data.id , 8) : "---"}</td>
                                            <td width={'120px'}  onClick={()=>{
                                               
                                            }} >{ data.Invoice && data.Invoice.id ? getlaststring( data.Invoice.id ,8): "---"}</td>
                                            <td width={'100px'}>{  data.duedate ? toYYMMDD(data.duedate) : "---"}</td>

                                            <td width={'100px'}>{ data.Invoice && data.Invoice.Room &&  data.Invoice.Room.name ? data.Invoice.Room.name : "---"}</td>
                                            <td width={'50px'}>{ data.Invoice &&  data.Invoice.Room &&  data.Invoice.Room.members &&  data.Invoice.Room.members[0]   && data.Invoice.Room.members[0].name ? data.Invoice.Room.members[0].name : "---"}</td>
                                            <td width={'50px'}>{ data.status ? data.status : "---"}</td>

                                            <td width={'50px'}>{ data.printstatus ? data.printstatus : "---"}</td>
                                            
                                            <td width={'60px'}>{ data.monthlybilling ? toYYMM(data.monthlybilling) : "---"}</td>
                                                
                                            </tr>
                                            )
                                            }                
                                        </tbody>
                                    </table>

                        
                                
                                <div className={styles.button}>
                                    <button className={styles.press} 
                                        onClick={()=>{
                                            try{
                                            export_Receipts_pdf(IDrooms)
                                            }catch(e){
                                                console.error("cath erro ไม่สามารถสร้าง Receipts")
                                            }
                                        }}
                                    > พิมพ์ใบเสร็จที่เลือก   <LocalPrintshopIcon/> </button>
                                    <button className={styles.press}
                                        onClick={()=>{
                                            try{
                                            export_taxinvoices_pdf(IDrooms)
                                            }catch(e){
                                                console.error("cath erro ไม่สามารถสร้าง taxinvoices")
                                            }
                                        }}
                                    > พิมพ์ใบกำกับภาษีที่เลือก <LocalPrintshopIcon/> </button>
                                    <button className={styles.press} onClick={ async ()=>{
                                                        try{
                                                                
                                                            
                                                                    let _res = await createReceipt({
                                                                            variables:{
                                                                            input:{
                                                                                status:"รอการพิมพ์",
                                                                                invoiceid:"",
                                                                            }
                                                                        }
                                                                    })
                                                                    if(_res && _res.data){
                                                                        console.log('สร้างใบเสร็จสำเร็จ')
                                                                        Receipt.refetch();
                                                                    }else{
                                                                        console.error('ไม่สามารถสร้างใบเสร็จได้')
                                                                    }
                                                            
                                                                
                                                            }catch(e){
                                                                console.log(e)
                                                            }
                                            }} >สร้างใบเสร็จ <NoteAddIcon/></button>
                                    <button className={styles.press} onClick={()=>handlerDeletereceipt()} >ยกเลิกใบเสร็จ <DeleteIcon/></button>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
                
                <div className={styles.zone2} >
                    <div className={styles.formdetailsInvoice}>
                        <div className={styles.card}>
                            <div className={styles.cardheader}>
                                <label> ข้อมูลใบเสร็จ</label>
                            </div>
                            <div className = {styles.topzone}>
                                <div className = {styles.top}>
                                    <div className = {styles.text1} >ชื่อ</div>
                                    <div className = {styles.input1}>
                                        <input></input>
                                    </div>
                                </div>
                                <div className = {styles.top}>
                                    <div className = {styles.text1} >นามสกุล</div>
                                    <div className = {styles.input1}>
                                        <input></input>
                                    </div>
                                </div>
                                <div className = {styles.top}>
                                    <div className = {styles.text1} >บัตรประชาชน</div>
                                    <div className = {styles.input1}>
                                        <input></input>
                                    </div>
                                </div>
                                <div className = {styles.top}>
                                    <div className = {styles.text1} >เลขประจำตัวผู้เสียภาษี</div>
                                    <div className = {styles.input1}>
                                        <input></input>
                                    </div>
                                </div>
                                <div className = {styles.top}>
                                    <div className = {styles.text1} >ที่อยู่ตามบัตรประชาชน</div>
                                    <div className = {styles.input1}>
                                        <input></input>
                                    </div>
                                </div>
                                
                            
                            </div>
                            
                            <div className={styles.cardbody}>
                                <p className={styles.row} >
                                    <label > รอบบิล </label> 
                                    {console.log('_selectrooms',selectrooms)}
                                    <input className ={styles.spaceonerem} name="monthlybilling" type="date" value={ selectrooms ? toYYMMDD(selectrooms.monthlybilling) :""} 
                                    disabled={!selectrooms.editmode}

                                    onChange={handlerChangereceiptinformation}></input>
                                    
                                </p>
                                <p>
                                <label> สถานะใบเสร็จ </label>
                                <input className ={styles.spaceonerem} name = "status" 
                                 disabled={!selectrooms.editmode}
                                 value={selectrooms.status} 
                                 onChange={handlerChangereceiptinformation} ></input>
                                </p>
                                <p>
                                <label>รายละเอียดใบเสร็จ</label>
                                <input  name="note" 
                                disabled={!selectrooms.editmode}
                                value={selectrooms.note} 
                                onChange={handlerChangereceiptinformation}
                                className={styles.text}/>

                                </p>

                                <div className={styles.header}>รายการใบแจ้งหนี้</div>
                                <div className={styles.zonetable}>
                                    <table  className={styles.table}>

                                        <thead className ={styles.header}>
                                            <tr >
                                                <td>{header_table2[0]}</td>
                                                <td>{header_table2[1]}</td>
                                                <td>{header_table2[2]}</td>
                                                <td>{header_table2[3]}</td>
                                                <td>{header_table2[4]}</td>
                                                <td>{header_table2[5]}</td>
                                                <td>{header_table2[6]}</td>
                                                <td>{header_table2[7]}</td>
                                                { selectrooms.editmode ? <td> </td> : null}
                                                
                                            </tr>
                                        </thead>
                                        <tbody className ={styles.body}>
                                            { selectrooms && selectrooms.lists ? selectrooms.lists.map( (list ,index) =>
                                            <tr>
                                                
                                                <td>{index+1}</td>
                                                <td>
                                                    <input className={styles.inputtext}
                                                    type='text' name="name" onChange={(e)=>handlerchangelist(e,index)}  
                                                        disabled={!selectrooms.editmode}       
                                                        value={ list && list.name ?  list.name : ""}/>
                                                </td>
                                                <td>
                                                    <input className={styles.inputtext}
                                                    type='text' name="number_item" onChange={(e)=>handlerchangelist(e,index)}    
                                                        disabled={!selectrooms.editmode}       
                                                        value={ list && list.number_item ?  list.number_item : 1} />
                                                </td>
                                                <td>
                                                    <input className={styles.inputtext}
                                                    type='text' name="price" onChange={(e)=>handlerchangelist(e,index)}    
                                                        disabled={!selectrooms.editmode}       
                                                        value={ list && list.price ?  list.price : 1} />
                                                </td>
                                                <td>{list_to_show(list).price}</td>
                                                <td>{list_to_show(list).vat}</td>
                                                <td>{list_to_show(list).total}</td>
                                                
                                            
                                                <td>    
                                                    <input type="checkbox" name = "myCheckboxName" id="myCheckboxId"
                                                    onChange={(e)=>{
                                                                let _receipt =  JSON.parse (JSON.stringify( selectrooms))
                                                                _receipt.lists[index].selectvat = _receipt.lists[index].selectvat === 'คิดvat' ? "ไม่คิดvat": 'คิดvat'
                                                                setselectrooms(_receipt)
                                                            }}
                                                    checked={list && list.selectvat && list.selectvat === 'คิดvat' ? true : false}
                                                    ></input>
                                                </td>
                                                { selectrooms.editmode ?  
                                                        <td>    
                                                            <button 
                                                            onClick ={async ()=>{
                                                                let _receipt =  JSON.parse (JSON.stringify( selectrooms ))
                                                            
                                                                _receipt.lists.splice(index,1)
                                                            setselectrooms(_receipt)
                                                            }}
                                                            ><DeleteIcon style={{
                                                                'maxHeight': "1rem",
                                                                'maxWidth': "1rem"
                                                            }}/></button>
                                                        </td>: null
                                                    }
                                            </tr>
                                            ) :null
                                            }                
                                        </tbody>
                                    </table>
                                </div>

                                <div className={styles.button}>
                                        <button className={styles.press}
                                         name="addlist"
                                         disabled={!selectrooms.editmode} 
                                         onClick={()=>{
                                             let _selectrooms = JSON.parse(JSON.stringify(selectrooms));
                                             if(Array.isArray(_selectrooms.lists) ){
                                                 _selectrooms.lists = [...selectrooms.lists ,{name:"",number_item:"1",price:"0",vat:"7" ,selectvat:"คิดvat"}]
                                             }
                                                setselectrooms(_selectrooms)
                                         }}
                                         >เพิ่ม</button>
                                    
                                </div>
                                <div className = {styles.result}>
                                        <p>
                                            <label>รวม : </label>
                                            <input></input>
                                            <label> บาท</label>
                                            
                                        </p>
                                        <p>
                                            <label>ภาษีมูลค่าเพิ่ม 7.00% : </label>
                                            <input></input>
                                            <label> บาท</label>

                                        </p>
                                        <p>
                                            <label>รวมยอดเงินสุทธิ : </label>
                                            <input></input>
                                            <label> บาท</label>


                                        </p>



                                </div>
                                <div className={styles.menu}>
                                        <button className = {styles.editbutton} name="editmode" onClick={handlerChangereceiptinformation}>
                                         { selectrooms.editmode ?<>
                                         ยกเลิก<CancelIcon /></>
                                         :<>แก้ไข<EditIcon /></> }
                                        </button>
                                        <button className = {styles.savebutton} name="savereceiptinformation"
                                        onClick={()=>{handlerSavereceipt(selectrooms)} }
                                        >บันทึก <SaveIcon/> </button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
            
                </div>
            
            </div>
        </>
    )
}