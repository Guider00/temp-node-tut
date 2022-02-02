import { useState } from "react"

export const filter_rooms = (rooms , options_search) =>{
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



export const Change = () =>{

    

    const [filterrooms , setfilterrooms] = useState([]);
    const [IDrooms , setIDrooms] = useState([]);

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

    return {disabled,handleChangeRadio,handleChange,filterrooms,setfilterrooms,IDrooms,setIDrooms}

}
