import { useState,useEffect } from 'react';
import { API_GET_Address } from '../../API/Schema/Address/Address';
import { useQuery } from '@apollo/client';




export const AddressData = () =>{

    const Address = useQuery(API_GET_Address);
     //address
    const [defaultData , setdefaultData] = useState({
        idAddress:"",
        name:"",
        code:"",
        tel:"",
        no:"",
        province:"",
        road:"",
        village:"",
        boundary:"",
        district:"",
        alley:"",
    })
 
 
 
    useEffect(()=>{
    if(Address && Address.data && Address.data.Addresss){
            if(Address && Address.data &&  Address.data.Addresss.length > 0 ){
 
                let _defaultData = defaultData
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
                setdefaultData(_defaultData)
            }

         }
         console.log("defaultData",defaultData) 
     },[ Address , defaultData])
 
     //address

     return{defaultData}

}
