import React, { useState, useCallback } from "react";
import { ItemBox } from "./ItemBox";
//import { style }

import { API_GET_Rooms } from "../../../API/Schema/Room/Room";
import { set } from "react-hook-form";
import Overview from "../../../components/Overview/Overview";

const ROOMS = [ Overview.MeterRooms ]

export const List = () => {
    
    const [reserve, setReserve] = useState(ROOMS)

    const moveListItemBox = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = reserve[dragIndex]
            const hoverItem = reserve[hoverIndex]
            
            //swap place of dragItem & hoverItem
            setReserve (reserve => {
                const updatedReserve = [...reserve]
                updatedReserve[dragIndex] = hoverItem
                updatedReserve[hoverIndex] = dragItem
                return updatedReserve
            })
        }, 
        [reserve],
    )

    return (
        <div style={stye}> {reserve.map((reserve, index) => (
            <ItemBox
            index={index}
            moveItemBox={moveListItemBox}
            />
        ))}

        </div>
    )

}
