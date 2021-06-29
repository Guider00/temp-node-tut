import {createroomprice , editroomprice ,deleteroomprice , queryroomprice } from './Schema/RoomPrice/sch_roomprice'

import { createBuilding, updateBuilding,deleteBuilding,queryBuildingByid,queryBuildings } from './Schema/Building/Building'

import { createFloor, updateFloor,deleteFloor,queryFloorByid,queryFloors } from './Schema/Floor/Floor'

import { createRoom ,  updateRoom , deleteRoom , queryRoomByid, queryRooms } from './Schema/Room/Room'

import { createMember ,  updateMember , deleteMember , queryMemberByid, queryMembers } from './Schema/Member/Member'

import { createMeterRoom ,  updateMeterRoom, deleteMeterRoom , queryMeterRoomByid, queryMeterRooms } from './Schema/MeterRoom/MeterRoom'

import { createPortmeter ,  updatePortmeter , deletePortmeter , queryPortmeterByid, queryPortmeters } from './Schema/PortMeter/PortMeter'



import fetchData from '../cores/axios/index'



export const API_queryMeterRoomByid = async(id)=>{
    let  res = await fetchData('POST','graphql',queryMeterRoomByid(id) )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_queryMeterRooms = async() =>{
    let  res = await fetchData('POST','graphql',queryMeterRooms() )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_createMeterRoom = async (data) => {
    let  res = await fetchData('POST','graphql',createMeterRoom(data) )
    if(!res.data) return null
    return res
}
export const API_updateMeterRoom = async (id,data) =>{
    let  res = await fetchData('POST','graphql',updateMeterRoom(id,data) )
    if(!res.data) return null
    return res
}
export const API_deleteMeterRoom = async (id) =>{
    let  res = await fetchData('POST','graphql',deleteMeterRoom(id) )
    if(!res.data) return null
    return res
}


export const API_queryPortmeterByid = async(id) =>{
    let  res = await fetchData('POST','graphql',queryPortmeterByid(id) )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_queryPortmeters = async()=>{
    let  res = await fetchData('POST','graphql',queryPortmeters() )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_createPortmeter  = async(data) =>{
    let  res = await fetchData('POST','graphql',createPortmeter(data) )
    if(!res.data) return null
    return res
}
export const API_updatePortmeter = async(id,data)=>{
    let  res = await fetchData('POST','graphql',updatePortmeter(id,data) )
    if(!res.data) return null
    return res
}
export const API_deletePortmeter = async(id)=>{
    let  res = await fetchData('POST','graphql',deletePortmeter(id) )
    if(!res.data) return null
    return res
}






export const API_queryMemberByid = async (id)=>{
    let  res = await fetchData('POST','graphql',queryMemberByid(id) )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_queryMembers = async () =>{
    let  res = await fetchData('POST','graphql',queryMembers() )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_createMember = async (data) =>{
    let  res = await fetchData('POST','graphql',createMember(data) )
    if(!res.data) return null
    return res
}
export const API_deleteMember = async (id) =>{
    let  res = await fetchData('POST','graphql',deleteMember(id) )
    if(!res.data) return null
    return res
}
export const API_updateMember = async (id,data) =>{

    let  res = await fetchData('POST','graphql',updateMember(id,data) )
    if(!res.data) return null
    return res
}


export const API_queryRoomByid = async (id) =>{
    let  res = await fetchData('POST','graphql',queryRoomByid(id) )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_queryRooms = async () =>{
    let  res = await fetchData('POST','graphql',queryRooms() )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_createRoom = async (data) =>{
    let  res = await fetchData('POST','graphql',createRoom(data) )
    if(!res.data) return null
    return res
}
export const API_deleteRoom = async (id) =>{
    let  res = await fetchData('POST','graphql',deleteRoom(id) )
    if(!res.data) return null
    return res
}
export const API_updateRoom = async (id,data) =>{
  
    let  res = await fetchData('POST','graphql',updateRoom(id,data) )
    if(!res.data) return null
    return res
}

export const API_queryFloorByid = async (id) =>{
    let  res = await fetchData('POST','graphql',queryFloorByid(id) )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_queryFloors = async () =>{
    let  res = await fetchData('POST','graphql',queryFloors() )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_createFloor = async (data) =>{
    let  res = await fetchData('POST','graphql',createFloor(data) )
    if(!res.data) return null
    return res
}
export const API_deleteFloor = async (id) =>{
    let  res = await fetchData('POST','graphql',deleteFloor(id) )
    if(!res.data) return null
    return res
}
export const API_updateFloor = async (id,data) =>{
  
    let  res = await fetchData('POST','graphql',updateFloor(id,data) )
    if(!res.data) return null
    return res
}

export const API_queryBuildingByid = async (id) =>{
    let  res = await fetchData('POST','graphql',queryBuildingByid(id) )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_queryBuildings = async () =>{
    let  res = await fetchData('POST','graphql',queryBuildings() )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_createBuilding = async (data) =>{
   
    let  res = await fetchData('POST','graphql',createBuilding(data) )
    if(!res.data) return null
    return res
}
export const API_deleteBuilding = async (id) =>{
    let  res = await fetchData('POST','graphql',deleteBuilding(id) )
    if(!res.data) return null
    return res
}
export const API_updateBuilding = async (id,data) =>{
    console.log(id,data)
    let  res = await fetchData('POST','graphql',updateBuilding(id,data) )
    if(!res.data) return null
    return res
}

export const API_queryroomprice = async () =>{
    let  res = await fetchData('POST','graphql',queryroomprice() )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_deleteroomprice = async (id) =>{
    let res  =   await  fetchData('POST','graphql',deleteroomprice(id) )
    if(!res.data) return null
    return res
}
export const API_createroomprice = async ( data ) =>{
    
    let req  =   await  fetchData('POST','graphql',createroomprice(data) )
    if(!req.data) return null
    return req
}
export const API_editroomprice =async (id,data) =>{
    let req  =   await  fetchData('POST','graphql',editroomprice(id,data) )
    if(!req.data) return null
    return req
}



