import styles from "./Address.module.css"
import { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
    API_GET_Address,
    API_ADD_Address,
    API_DELETE_Address,
    API_UPDATE_Address
} from '../../../API/Schema/Address/Address'


import { useQuery, useMutation } from '@apollo/client';


export const Address = () => {

    const [images, setImages] = useState([]);
    const [imageURLs, setimageURLs] = useState([]);


    const [postid, setpostid] = useState("");
    const [postname, setpostname] = useState("");
    const [posttel, setposttel] = useState("");
    const [postno, setpostno] = useState("");
    const [postvillage, setpostvillage] = useState("");
    const [postroad, setpostroad] = useState("");
    const [postdistrict, setpostdistrict] = useState("");
    const [postalley, setpostalley] = useState("");
    const [postboundary, setpostboundary] = useState("");
    const [postprovince, setpostprovince] = useState("");
    const [postcode, setpostcode] = useState("");
    const [address, setaddress] = useState([])


    const [ addAddress, mutationaddAddress] = useMutation(API_ADD_Address)
    const [ updateAddress, mutationupdateAddress ] = useMutation(API_UPDATE_Address)
    const [ deleteAddress, mutationdeleteAddress ] = useMutation(API_DELETE_Address)
    const Address = useQuery(API_GET_Address);

    

    

    const savePage = () => {
        let saveButton = document.querySelector('#D1')
        let inputBox = document.getElementsByName('D3')
        let inputBoxLen = inputBox.length

        console.log(inputBoxLen)

        

        if(saveButton.click){
            
            for (var x=0; x<inputBoxLen; x++){
                inputBox[x].disabled=true;
            }
            console.log("save page")

            }
        
        




    }

    const editPage = () => {

        
        let editButton = document.querySelector('#D2')
        let inputBox = document.getElementsByName('D3')
        let inputBoxLen = inputBox.length

        

        

        if(editButton.click){
            
            for (var x=0; x<inputBoxLen; x++){
                inputBox[x].disabled=false;
            }
            console.log("edit page")

            }
        




    }
    const clearPage = async () => {

        let inputBox = document.getElementsByName('D3')
        let inputBoxLen = inputBox.length
        if(Address && Address.data  ){

            

            for (var x=0; x<inputBoxLen; x++){
                inputBox[x].disabled=false;
                
                

                
                
            }
            
            


            try{
                
            
                   
                    let _res = await deleteAddress({
                        variables: {
                        }
                    });
                    
                    inputBox[0].value="";
                    inputBox[1].value="";
                    inputBox[2].value="";
                    inputBox[3].value="";
                    inputBox[4].value="";
                    inputBox[5].value="";
                    inputBox[6].value="";
                    inputBox[7].value="";
                    inputBox[8].value="";
                    inputBox[9].value="";

                    
                    let blank= ("")
                    setpostname([blank])
                    setpostcode([blank])
                    setposttel([blank])
                    setpostno([blank])
                    setpostalley([blank])
                    setpostdistrict([blank])
                    setpostvillage([blank])
                    setpostprovince([blank])
                    setpostboundary([blank])
                    setpostroad([blank])
                    
                    

                    
                    console.log(_res)
                    console.log("clear-page")
                

               

            } catch(error){
                console.log(error.message)
            }        

        }
       
        
    }




    const checkData = async () =>{
        if(Address && Address.data &&  Address.data.Addresss.length == 0 ){
            // console.log('No-data')
             
            try{
                console.log('AddressLEN' , Address.length)
                
                let _res = await addAddress({
                    

                    variables: {
                    input:{
                        name:`${postname}`,
                        tel:`${posttel}`,
                        no:`${postno}`,
                        village:`${postvillage}`,
                        road:`${postroad}`,
                        district:`${postdistrict}`,
                        alley:`${postalley}`,
                        boundary:`${postboundary}`,
                        province:`${postprovince}`,
                        code:`${postcode}`,
                        }
                    }
                });
                console.log(_res)
                savePage();

            } catch(error){
                console.log(error.message)
            }        
            

        }
        if(Address && Address.data &&  Address.data.Addresss.length > 0 ){
            // console.log('Have-data-1212')


            try{
                console.log('AddressLEN2' , Address.length)
                
                let _res = await updateAddress({
                    

                    variables: {
                        id:`${postid}`,

                    input:{
                        name:`${postname}`,
                        tel:`${posttel}`,
                        no:`${postno}`,
                        village:`${postvillage}`,
                        road:`${postroad}`,
                        district:`${postdistrict}`,
                        alley:`${postalley}`,
                        boundary:`${postboundary}`,
                        province:`${postprovince}`,
                        code:`${postcode}`,
                        }
                    }
                });
                console.log(_res)
                savePage();

            } catch(error){
                console.log(error.message)
            }        

        }

    }


  


    




    // id
    // name
    // tel
    // no
    // village
    // road
    // district
    // alley
    // boundary
    // province
    // code
    
    
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
                let inputBox = document.getElementsByName('D3')
                let inputBoxLen = inputBox.length
                for (var x=0; x<inputBoxLen; x++){
                    inputBox[x].disabled=true;
                    
                }

                let name  = Address.data.Addresss[0].name
                let code = Address.data.Addresss[0].code
                let id = Address.data.Addresss[0].id
                let tel = Address.data.Addresss[0].tel
                let no = Address.data.Addresss[0].no
                let province = Address.data.Addresss[0].province
                let road = Address.data.Addresss[0].road
                let village = Address.data.Addresss[0].village
                let boundary = Address.data.Addresss[0].boundary
                let district  = Address.data.Addresss[0].district
                let alley = Address.data.Addresss[0].alley

                setpostid([id])
                setpostname([name])
                setpostcode([code])
                setposttel([tel])
                setpostno([no])
                setpostalley([alley])
                setpostdistrict([district])
                setpostvillage([village])
                setpostprovince([province])
                setpostboundary([boundary])
                setpostroad([road])

                
                
                
                
                // console.log(name,address,id,tel,no,province,road,village,boundary,district,code,alley)

            }
            
            
        }
        else{
            Address.refetch()
        }
    },[Address]

  
    
   )




    
    
    return (
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
                        <label className={styles.text}>ชื่อบริษัท</label>
                        <input name = "D3" className={styles.input}
                        value={postname}
                        onChange={(e)=>{ setpostname( e.target.value ) }}
                        ></input>
                    </div>
                    <div  className={styles.inputstyle}>
                        <label className={styles.text}>เบอร์โทร</label>
                        <input  name = "D3"  className={styles.input}
                        value={posttel}
                        onChange={(e)=>{ setposttel( e.target.value ) }}
                        ></input>
                    </div>
                    <div  className={styles.inputstyle}>
                        <label className={styles.text}>เลขที่</label>
                        <input  name = "D3"  className={styles.input}
                        value={postno}
                        onChange={(e)=>{ setpostno( e.target.value ) }}
                        ></input>
                    </div >
                    <div  className={styles.inputstyle}>
                        <label className={styles.text}>หมู่บ้าน</label>
                        <input name = "D3"  className={styles.input}
                        value={postvillage}
                        onChange={(e)=>{ setpostvillage( e.target.value ) }}
                        ></input>
                    </div>
                    <div  className={styles.inputstyle}>
                        <label className={styles.text}>ถนน</label>
                        <input name = "D3"  className={styles.input}
                        value={postroad}
                        onChange={(e)=>{ setpostroad( e.target.value ) }}
                        ></input>
                    </div>
                    <div  className={styles.inputstyle}>
                        <label className={styles.text}>ตรอก/ซอย</label>
                        <input name = "D3"  className={styles.input}
                        value={postalley}
                        onChange={(e)=>{ setpostalley( e.target.value ) }}
                        ></input>
                    </div>
                    <div  className={styles.inputstyle}>
                        <label className={styles.text}>ตำบล/แขวง</label>
                        <input name = "D3"  className={styles.input}
                        value={postdistrict}
                        onChange={(e)=>{ setpostdistrict( e.target.value ) }}
                        ></input>
                    </div>
                    <div  className={styles.inputstyle}>
                        <label className={styles.text}>อำเภอ/เขต</label>
                        <input name = "D3"  className={styles.input}
                        value={postboundary}
                        onChange={(e)=>{ setpostboundary( e.target.value ) }}
                        ></input>
                    </div>
                    <div  className={styles.inputstyle}>
                        <label className={styles.text}>จังหวัด</label>
                        <input name = "D3"  className={styles.input}
                        value={postprovince}
                        onChange={(e)=>{ setpostprovince( e.target.value ) }}
                        ></input>
                    </div>
                    <div  className={styles.inputstyle}>
                        <label className={styles.text}>รหัสไปรษณี</label>
                        <input name = "D3"  className={styles.input} 
                        value={postcode}
                        onChange={(e)=>{ setpostcode( e.target.value ) }}
                        ></input>
                    </div>
                
                


            </div>
            <div className={styles.save}>
                <button id="D1" onClick={checkData} className={styles.savestyle}>SAVE</button>
                <button id="D2" className={styles.savestyle} onClick={editPage}>EDIT</button>
                <button id="D4" type="reset" className={styles.savestyle} onClick={clearPage}>CLEAR</button>

            </div>
            
        </div>
    )
}