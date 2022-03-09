import {  useState } from 'react';

export const filter_rooms = (rooms , formfilter ,getStart,getEnd) =>{
    let _filter_table = []
    if(rooms && formfilter){
        _filter_table = rooms.filter(room =>{
            if(room){
                if(formfilter.option_search === 'เลือกอาคารทั้งหมด' && getStart === 17356266000000 && getEnd === 19249722000000 ){
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
            return null ;
        })
    }
    return _filter_table
}


export const Rooms_to_table = (Rooms) =>{
    let table = [];
        table = Rooms.map((data)=>{
            let _data = data;
            console.log('data',_data)
            return{
                building:
                    data.floor && data.floor.building && data.floor.building.name
                        ? data.floor.building.name 
                        : '---' 
            }
        })
    return table
}



export const ChangeRadio = () =>{

    const [disabled , setDisabled] = useState({
        disabledMonth : false ,
        disabledDay : true ,
    })
    
    const handleChangeRadio = (e) =>{
        const { name , checked } = e.target
        if(name === 'month' && checked === true){
            let month = {...disabled ,  disabledMonth : false , disabledDay : true}
            setDisabled(month)
            
        }
        if(name === 'day' && checked === true){
            let day = {...disabled ,  disabledMonth : true , disabledDay : false}
            setDisabled(day)
            
            
        }
        
        
        
    }

    return { handleChangeRadio , disabled}

}


export const FormFilter = () =>{


    const [defaultformfilter] = useState({
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
    }

    return { handleChangedformfilter , formfilter , hadleChangedformfilterTodefault ,setformfilter}



}


