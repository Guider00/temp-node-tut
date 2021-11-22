

import { useEffect, useState } from "react"

import { Input } from "../../../subcomponents/Input/Input"
// import { Select } from "../../../subcomponents/Select/select"
import { Table } from "../../../subcomponents/Table/Table"
import { Topic } from '../../../subcomponents/Topic/Topic'
import { EndButton } from "../../../subcomponents/EndButton/EndButton"
import { Loader } from "../../../subcomponents/loader/loader"

import Add from '@material-ui/icons/Add';

import styles from "./RoomType.module.css"


export const RoomType = () => {
    const [_id,setid] = useState("");
    const [_name,setname] = useState("");
    const [_type, setrent_type] = useState("รายเดือน");

    const [_monthlyprice,setmonthlyprice] = useState("");
    const [_forehandrent,setforehandrent] = useState("");
    const [_insurance,setinsurance] = useState("");

    const [_dayilyprice,setdayilyprice] = useState("");

    const [_type_price_electrical, settype_price_electrical] = useState("ตามหน่วยการใช้งาน");

    const [_unit_electrical,setunit_electrical] = useState('');
    const [_rate_electrical,setrate_electrical] = useState('');


    const [_totalprice_electrical,settotalprice_electrical] = useState('');

    const [_type_price_water, settype_price_water] = useState("ตามหน่วยการใช้งาน");

    const [_unit_water,setunit_water] = useState('');
    const [_rate_water,setrate_water] = useState('');

    const [_totalprice_water,settotalprice_water] = useState('');

    const [_load,setload] = useState(false);
    const [_inital,setinitial] = useState(false);

    const [_showedit,setshowedit] = useState(false);


    return (
        <div>
            
        </div>
    )
}