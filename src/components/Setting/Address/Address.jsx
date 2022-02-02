import styles from "./Address.module.css"
import { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Dialog from './Dialog.js'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
    API_GET_Address,
    API_ADD_Address,
    API_DELETE_Address,
    API_UPDATE_Address
} from '../../../API/Schema/Address/Address'

import {
    API_GET_Receiptnumber,
    API_ADD_Receiptnumber,
    API_DELETE_Receiptnumber,
    API_UPDATE_Receiptnumber
} from '../../../API/Schema/Receiptnumber/Receiptnumber'


import { useQuery, useMutation } from '@apollo/client';

import { HandleForm , Disabled} from "./function";




export const Address = () => {

    const [images, setImages] = useState([]);
    const [imageURLs, setimageURLs] = useState([]);
    const [address, setaddress] = useState([]);
    const [ReceiptNumber , setReceiptNumber] = useState({})
    const [ addAddress, mutationaddAddress] = useMutation(API_ADD_Address)
    const Address = useQuery(API_GET_Address);
    const [ addReceiptnumber, mutationaddReceiptnumber] = useMutation(API_ADD_Receiptnumber)
    const Receiptnumber = useQuery(API_GET_Receiptnumber)
    const [defaultDialog, setdefaultDialog] = useState({
        message:"Save it?",
        isLoading: false,
        type:"",
    });
    const handleDialog = (message , isLoading ,type) =>{
        setdefaultDialog({
            message:message,
            isLoading:isLoading,
            type:type,
        })
    }

   



    

    

    

    

    const checkData = async (choose) =>{
        
        if(choose && defaultDialog.type === '1' ){
            if(Receiptnumber && Receiptnumber.data && Receiptnumber.data.Receiptnumbers.length > 0 ){
                
                
                try{
                    
                    
                    let _res = await addReceiptnumber({
                        
    
                        variables: {
                        input:{
                            receipt_number:`${defaultData.receipt}`,
                            invoice_number:`${defaultData.invoice}`,
                            reimbursement_number:`${defaultData.reimbursement}`,
                            booking_number:`${defaultData.booking}`,
                            bill_number:`${defaultData.bill}`,
                            account_number:`${defaultData.accNo}`,
                            bill_date:`${defaultData.billDate}`,
                            }
                        }
                    });
                    console.log(_res)
                    let tempDisabled = {...disableReceipt , disabled : true}
                    setDisableReceipt(tempDisabled)
    
                } catch(error){
                    console.log(error.message)
                }        
                
    
            }
            handleDialog('',false)
            setDisabledReceipt(true)

        }else if(choose && defaultDialog.type === '2' ){

            if(Address && Address.data &&  Address.data.Addresss.length > 0 ){
                try{

                    
                    let _res = await addAddress({
                        
    
                        variables: {
                        input:{
                            name:`${defaultAddress.name}`,
                            tel:`${defaultAddress.tel}`,
                            no:`${defaultAddress.no}`,
                            village:`${defaultAddress.village}`,
                            road:`${defaultAddress.road}`,
                            district:`${defaultAddress.district}`,
                            alley:`${defaultAddress.alley}`,
                            boundary:`${defaultAddress.boundary}`,
                            province:`${defaultAddress.province}`,
                            code:`${defaultAddress.code}`,
                            }
                        }
                    });
                    console.log(_res)
                    let tempDisabled = {...disableReceipt , disabled2 : true}
                    setDisableReceipt(tempDisabled)
    
                } catch(error){
                    console.log(error.message)
                }        
                
    
            }
            handleDialog('',false)
            setDisabledAddress(true)


        }else if(choose && defaultDialog.type === '3'){
            handleDialog('',false)


        }else{
            handleDialog('',false)

        }
         
       
        

    }
   

    

    //handleForm
    //validate

    const { handleOnchangeReceipt,handleOnchangeAddress,formErrorsAddress,formErrors,defaultData,setdefaultData ,defaultAddress,setdefaultAddress  } = HandleForm();
    const {handleClick , disableReceipt , setDisableReceipt , disabledAddress ,disabledReceipt,setDisabledReceipt,setDisabledAddress} = Disabled();
    

   

   


    

    


    useEffect(()=>{
        if(Receiptnumber && Receiptnumber.data && Receiptnumber.data.Receiptnumbers){
            let _ReceiptNumber = ReceiptNumber
            _ReceiptNumber = Receiptnumber.data.Receiptnumbers
            setReceiptNumber(_ReceiptNumber);
            if(Receiptnumber && Receiptnumber.data && Receiptnumber.data.Receiptnumbers.length > 0){


                let _defaultData = defaultData
                _defaultData['receipt'] = Receiptnumber.data.Receiptnumbers[0].receipt_number
                _defaultData['bill'] = Receiptnumber.data.Receiptnumbers[0].bill_number
                _defaultData['invoice'] = Receiptnumber.data.Receiptnumbers[0].invoice_number
                _defaultData['reimbursement'] = Receiptnumber.data.Receiptnumbers[0].reimbursement_number
                _defaultData['booking'] = Receiptnumber.data.Receiptnumbers[0].booking_number
                _defaultData['id'] = Receiptnumber.data.Receiptnumbers[0].id
                _defaultData['accNo'] = Receiptnumber.data.Receiptnumbers[0].account_number
                _defaultData['billDate'] = Receiptnumber.data.Receiptnumbers[0].bill_date
                setdefaultData(_defaultData)

            }
        }
       
        
        
    },[Receiptnumber])
    


    useEffect(() =>{
        if(images.length < 1) return;
        const newImgeUrls = [];
        images.forEach(image => newImgeUrls.push(URL.createObjectURL(image)));
        setimageURLs(newImgeUrls);
    }, [images])

    function onImageChange(e) {
        setImages([...e.target.files]);
        
    }

    useEffect( () =>{
        

        if(Address && Address.data && Address.data.Addresss){
            let _address = address
            _address = [...Address.data.Addresss]
            setaddress([..._address])

            
            
            if(Address && Address.data &&  Address.data.Addresss.length > 0 ){

                

                let _defaultData = defaultAddress
                _defaultData['name'] = Address.data.Addresss[0].name
                _defaultData['code'] = Address.data.Addresss[0].code
                _defaultData['id'] = Address.data.Addresss[0].id
                _defaultData['tel'] = Address.data.Addresss[0].tel
                _defaultData['no'] = Address.data.Addresss[0].no
                _defaultData['province'] = Address.data.Addresss[0].province
                _defaultData['road'] = Address.data.Addresss[0].road
                _defaultData['village'] = Address.data.Addresss[0].village
                _defaultData['boundary'] = Address.data.Addresss[0].boundary
                _defaultData['district'] = Address.data.Addresss[0].district
                _defaultData['alley'] = Address.data.Addresss[0].alley
                setdefaultAddress(_defaultData)
                
            }
            console.log('defaultAddressdefaultAddress',defaultAddress)           
            
        }
        else{
            Address.refetch()
        }
    },[Address]

  
    
   )



    
    return (
        <div >
            <div className={styles.container}>
            <div className={styles.header} >Company Address</div>
            
            <div className={styles.imgbox}>
                
                
                    <div className={styles.content}>
                        <div className={styles.icon}>
                            <img id ="img"src="" alt=""></img>
                            
                            <i className={styles.icon1} hidden><CloudUploadIcon className={styles.icon2}/> </i>
                            <i className={styles.icon1}>{imageURLs.map(imageSrc => (
                                <img className={styles.icon3} src={imageSrc}/>
                            ))}
                            </i>
                            
                            
                        </div>
                        
                    </div>
                    
            </div>
            <div className={styles.uploadbox}>
                <input  id="upload" type="file" accept="image/*" className={styles.upload} onChange={onImageChange}></input>
            </div>
            <div className={styles.inputbox}>
                
                    
                        <div className={styles.inputstyle}>
                            <lable className={styles.text}>ชื่อบริษัท</lable>
                            <input className={styles.input}
                            id='name'
                            name='name'  
                            disabled ={disableReceipt.disabled2}
                            value={defaultAddress.name}
                            style={formErrorsAddress.name === undefined ?{borderColor : 'black'} : {borderColor : 'red'}}
                            onChange={handleOnchangeAddress}
                            />
                            <lable className={styles.error}>{formErrorsAddress.name}</lable>           
                        </div>
                        <div className={styles.inputstyle}>
                            <lable className={styles.text}>เบอร์โทร</lable>
                            <input className={styles.input}
                            id='tel'
                            name='tel'  
                            disabled ={disableReceipt.disabled2}
                            value={defaultAddress.tel}
                            style={formErrorsAddress.tel === undefined ?{borderColor : 'black'} : {borderColor : 'red'}}
                            onChange={handleOnchangeAddress}
                            />
                            <lable className={styles.error}>{formErrorsAddress.tel}</lable>           
                        </div>
                        <div className={styles.inputstyle}>
                            <lable className={styles.text}>เลขที่</lable>
                            <input className={styles.input}
                            id='no'
                            name='no'  
                            disabled ={disableReceipt.disabled2}
                            value={defaultAddress.no}
                            style={formErrorsAddress.no === undefined ?{borderColor : 'black'} : {borderColor : 'red'}}
                            onChange={handleOnchangeAddress}
                            />
                            <lable className={styles.error}>{formErrorsAddress.no}</lable>           
                        </div>
                        <div className={styles.inputstyle}>
                            <lable className={styles.text}>ถนน</lable>
                            <input className={styles.input}
                            id='road'
                            name='road'  
                            disabled ={disableReceipt.disabled2}
                            value={defaultAddress.road}
                            style={formErrorsAddress.road === undefined ?{borderColor : 'black'} : {borderColor : 'red'}}
                            onChange={handleOnchangeAddress}
                            />
                            <lable className={styles.error}>{formErrorsAddress.road}</lable>           
                        </div>
                        <div className={styles.inputstyle}>
                            <lable className={styles.text}>หมู่บ้าน</lable>
                            <input className={styles.input}
                            id='village'
                            name='village'  
                            disabled ={disableReceipt.disabled2}
                            value={defaultAddress.village}
                            style={formErrorsAddress.village === undefined ?{borderColor : 'black'} : {borderColor : 'red'}}
                            onChange={handleOnchangeAddress}
                            />
                            <lable className={styles.error}>{formErrorsAddress.village}</lable>           
                        </div>
                        <div className={styles.inputstyle}>
                            <lable className={styles.text}>ตรอก/ซอย</lable>
                            <input className={styles.input}
                            id='alley'
                            name='alley'  
                            disabled ={disableReceipt.disabled2}
                            value={defaultAddress.alley}
                            style={formErrorsAddress.alley === undefined ?{borderColor : 'black'} : {borderColor : 'red'}}
                            onChange={handleOnchangeAddress}
                            />
                            <lable className={styles.error}>{formErrorsAddress.alley}</lable>           
                        </div>
                        <div className={styles.inputstyle}>
                            <lable className={styles.text}>ตำบล/แขวง</lable>
                            <input className={styles.input}
                            id='boundary'
                            name='boundary'  
                            disabled ={disableReceipt.disabled2}
                            value={defaultAddress.boundary}
                            style={formErrorsAddress.boundary === undefined ?{borderColor : 'black'} : {borderColor : 'red'}}
                            onChange={handleOnchangeAddress}
                            />
                            <lable className={styles.error}>{formErrorsAddress.boundary}</lable>           
                        </div>
                        <div className={styles.inputstyle}>
                            <lable className={styles.text}>อำเภอ/เขต</lable>
                            <input className={styles.input}
                            id='district'
                            name='district'  
                            disabled ={disableReceipt.disabled2}
                            value={defaultAddress.district}
                            style={formErrorsAddress.district === undefined ?{borderColor : 'black'} : {borderColor : 'red'}}
                            onChange={handleOnchangeAddress}
                            />
                            <lable className={styles.error}>{formErrorsAddress.district}</lable>           
                        </div>
                        <div className={styles.inputstyle}>
                            <lable className={styles.text}>จังหวัด</lable>
                            <input className={styles.input}
                            id='province'
                            name='province'  
                            disabled ={disableReceipt.disabled2}
                            value={defaultAddress.province}
                            style={formErrorsAddress.province === undefined ?{borderColor : 'black'} : {borderColor : 'red'}}
                            onChange={handleOnchangeAddress}
                            />
                            <lable className={styles.error}>{formErrorsAddress.province}</lable>           
                        </div>
                        <div className={styles.inputstyle}>
                            <lable className={styles.text}>เลขไปรษณีย์</lable>
                            <input className={styles.input}
                            id='code'
                            name='code'  
                            disabled ={disableReceipt.disabled2}
                            value={defaultAddress.code}
                            style={formErrorsAddress.code === undefined ?{borderColor : 'black'} : {borderColor : 'red'}}
                            onChange={handleOnchangeAddress}
                            />
                            <lable className={styles.error}>{formErrorsAddress.code}</lable>           
                        </div>
                        
                    
            </div>
            <div className={styles.save}>
                <button disabled={disabledAddress} 
                id="D1" 
                className={disabledAddress === false? styles.savestyle : styles.saveDisabled}
                onClick={()=>{
                    if( Object.keys(formErrorsAddress).length === 0 ){
                        setdefaultDialog({
                            message:"Are you sure you want to save address?",
                            isLoading:true,
                            type:"2",
                            
                        })

                    }else{
                        setdefaultDialog({
                            message:"Please check your address again?",
                            isLoading:true,
                            type:"3",
                            
                        })

                    }
                    
                    
                }} >SAVE</button>
                <button 
                id="D2" 
                name="edit-address"
                className={styles.savestyle} 
                onClick={handleClick}>EDIT</button>
                <button 
                id="D4" 
                type="reset" 
                name="clearPage-address"
                className={styles.savestyle} 
                onClick={handleClick}>CLEAR-ALL</button>

            </div>
            </div>
            <div className={styles.containernumber}>
                <div className={styles.header}>Receipt Number</div>
                <div className={styles.inputbox}>
                    <div className={styles.inputstyle}>
                        
                        <lable className={styles.text}>รหัสใบเสร็จ</lable>
                        <input  className={styles.input} 
                        name = 'receipt'
                        id = 'receipt'
                        disabled = {disableReceipt.disabled}
                        value={defaultData.receipt}
                        style={formErrors.receipt === undefined ?{borderColor : 'black'} : {borderColor : 'red'}}
                        onChange={handleOnchangeReceipt}
                        />
                        <lable className={styles.error}>{formErrors.receipt}</lable>
                        <button className={styles.deleteOne} 
                        onClick={()=>{
                            let _defaultData = defaultData
                            let inputBox = document.getElementsByName('receipt')
                            let e = ''
                            inputBox[0].disabled=false;
                            setDisabledReceipt(false)
                            _defaultData['receipt'] = e
                            setdefaultData({..._defaultData})
                            
                        }}><DeleteOutlineIcon/></button>

                    </div>
                    <div className={styles.inputstyle}>
                        
                        <lable className={styles.text}>รหัสใบกำกับภาษี</lable>
                        <input  className={styles.input}
                        name = 'invoice' 
                        id = 'invoice'
                        disabled = {disableReceipt.disabled}
                        value={defaultData.invoice}
                        style={formErrors.invoice === undefined ?{borderColor : 'black'} : {borderColor : 'red'}}
                        onChange={handleOnchangeReceipt}
                        />
                        <lable className={styles.error}>{formErrors.invoice}</lable>
                        <button className={styles.deleteOne} 
                        onClick={()=>{
                            let _defaultData = defaultData
                            let inputBox = document.getElementsByName('invoice')
                            let e = ''
                            inputBox[0].disabled=false;
                            setDisabledReceipt(false)
                            _defaultData['invoice'] = e
                            setdefaultData({..._defaultData})
                            
                        }}><DeleteOutlineIcon/></button>


                    </div>
                    <div className={styles.inputstyle}>
                        
                        <lable className={styles.text}>รหัสใบคืนเงินประกัน</lable>
                        <input  className={styles.input} 
                        name = 'reimbursement'
                        id = 'reimbursement'
                        disabled = {disableReceipt.disabled}
                        value={defaultData.reimbursement}
                        style={formErrors.reimbursement === undefined ?{borderColor : 'black'} : {borderColor : 'red'}}
                        onChange={handleOnchangeReceipt}
                        />
                        <lable className={styles.error}>{formErrors.reimbursement}</lable>
                        <button className={styles.deleteOne} 
                        onClick={()=>{
                            let _defaultData = defaultData
                            let inputBox = document.getElementsByName('reimbursement')
                            let e = ''
                            inputBox[0].disabled=false;
                            setDisabledReceipt(false)
                            _defaultData['reimbursement'] = e
                            setdefaultData({..._defaultData})
                            
                        }}><DeleteOutlineIcon/></button>


                    </div>
                    <div className={styles.inputstyle}>
                        
                        <lable className={styles.text}>รหัสใบจอง</lable>
                        <input  className={styles.input} 
                        name = 'booking'
                        id = 'booking'
                        disabled = {disableReceipt.disabled}
                        value={defaultData.booking}
                        style={formErrors.booking === undefined ?{borderColor : 'black'} : {borderColor : 'red'}}
                        onChange={handleOnchangeReceipt}
                        />
                        <lable className={styles.error}>{formErrors.booking}</lable>
                        <button className={styles.deleteOne}  
                        onClick={()=>{
                            let _defaultData = defaultData
                            let inputBox = document.getElementsByName('booking')
                            let e = ''
                            inputBox[0].disabled=false;
                            setDisabledReceipt(false)
                            _defaultData['booking'] = e
                            setdefaultData({..._defaultData})
                            
                        }}><DeleteOutlineIcon/></button>


                    </div>
                    
                    <div className={styles.inputstyle}>
                        
                        <lable className={styles.text}>รหัสใบแจ้งหนี้</lable>
                        <input  className={styles.input} 
                        name = 'bill'
                        id = 'bill'
                        disabled = {disableReceipt.disabled}
                        value={defaultData.bill}
                        style={formErrors.bill === undefined ?{borderColor : 'black'} : {borderColor : 'red'}}
                        onChange={handleOnchangeReceipt}
                        />
                        <lable className={styles.error}>{formErrors.bill}</lable>
                        <button className={styles.deleteOne} 
                        onClick={()=>{
                            let _defaultData = defaultData
                            let inputBox = document.getElementsByName('bill')
                            let e = ''
                            inputBox[0].disabled=false;
                            setDisabledReceipt(false)
                            _defaultData['bill'] = e
                            setdefaultData({..._defaultData})
                            

                        }}
                        ><DeleteOutlineIcon/></button>
                        


                    </div>

                    <div className={styles.inputstyle}>
                        
                        <lable className={styles.text}>เลขที่บัญชี</lable>
                        <input  className={styles.input} 
                        name = 'accNo'
                        id = 'accNo'
                        disabled = {disableReceipt.disabled}
                        value={defaultData.accNo}
                        style={formErrors.accNo === undefined ?{borderColor : 'black'} : {borderColor : 'red'}}
                        onChange={handleOnchangeReceipt}
                        />
                        <lable className={styles.error}>{formErrors.accNo}</lable>
                        <button className={styles.deleteOne} 
                        onClick={()=>{
                            let _defaultData = defaultData
                            let inputBox = document.getElementsByName('accNo')
                            let e = ''
                            inputBox[0].disabled=false;
                            setDisabledReceipt(false)
                            _defaultData['accNo'] = e
                            setdefaultData({..._defaultData})
                            

                        }}
                        ><DeleteOutlineIcon/></button>
                        


                    </div>
                    <div className={styles.inputstyle}>
                        
                        <lable className={styles.text}>วันที่คิดรอบบิล</lable>
                        <input  className={styles.billDate} 
                        name = 'billDate'
                        id = 'billDate'
                        type='date'
                        disabled = {disableReceipt.disabled}
                        value={defaultData.billDate}
                        style={formErrors.billDate === undefined ?{borderColor : 'black'} : {borderColor : 'red'}}
                        onChange={handleOnchangeReceipt}
                        />
                        <lable className={styles.error}>{formErrors.billDate}</lable>
                        <button className={styles.deleteOne} 
                        onClick={()=>{
                            let _defaultData = defaultData
                            let inputBox = document.getElementsByName('billDate')
                            let e = ''
                            inputBox[0].disabled=false;
                            setDisabledReceipt(false)
                            _defaultData['billDate'] = e
                            setdefaultData({..._defaultData})
                            

                        }}
                        ><DeleteOutlineIcon/></button>
                        


                    </div>
                </div>
                <div className={styles.save}>
                <button id = "D6" 
                className={disabledReceipt == false ? styles.savestyle : styles.saveDisabled} 
                disabled = {disabledReceipt}
                onClick={()=>{
                   if( Object.keys(formErrors).length === 0 ){
                    setdefaultDialog({
                        message:"Are you sure you want to save receipt?",
                        isLoading:true,
                        type:"1",
                        
                    })

                   }else{
                    setdefaultDialog({
                        message:"Please check your receipt number ?",
                        isLoading:true,
                        type:"3",
                        
                    })

                   }
                   
                    
                    
                }}>SAVE</button>
                <button  
                id = "D7" 
                name = 'edit-receipt'
                className={styles.savestyle} 
                onClick={handleClick}>EDIT</button>
                <button  
                id = "D8" 
                name = 'clearPage-receipt'
                className={styles.savestyle} 
                onClick={handleClick}>CLEAR-ALL</button>
                
                </div>
                
                
                
            </div> 
            {defaultDialog.isLoading && <Dialog onDialog={checkData} message = {defaultDialog.message}/>}
            
            
            
            
            
        </div>
    )
}