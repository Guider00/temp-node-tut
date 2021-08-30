import {createroomprice , editroomprice ,deleteroomprice , queryroomprice } from './Schema/RoomPrice/sch_roomprice'

import { createBuilding, updateBuilding,deleteBuilding,queryBuildingByid,queryBuildings } from './Schema/Building/Building'

import { createFloor, updateFloor,deleteFloor,queryFloorByid,queryFloors } from './Schema/Floor/Floor'

import { createRoom ,  updateRoom , deleteRoom , queryRoomByid, queryRooms } from './Schema/Room/Room'

import { createMember ,  updateMember , deleteMember , queryMemberByid, queryMembers } from './Schema/Member/Member'

import { createMeterRoom ,  updateMeterRoom, deleteMeterRoom , queryMeterRoomByid, queryMeterRooms } from './Schema/MeterRoom/MeterRoom'

import { createPortmeter ,  updatePortmeter , deletePortmeter , queryPortmeterByid, queryPortmeters } from './Schema/PortMeter/PortMeter'

import { createNote , updateNote ,deleteNote , queryNoteByid, queryNotes } from './Schema/Note/Note'


import fetchData from '../cores/axios/index'

const PATH = 'graphqlexpress'
const METHOD = 'POST'

export const API_queryMeterRoomByid = async(id)=>{
    let  res = await fetchData(METHOD,PATH,queryMeterRoomByid(id) )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_queryMeterRooms = async() =>{
    let  res = await fetchData(METHOD,PATH,queryMeterRooms() )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_createMeterRoom = async (data) => {
 
    let  res = await fetchData(METHOD,PATH,createMeterRoom(data) )
    if(!res.data) return null
    return res
}
export const API_updateMeterRoom = async (id,data) =>{
    let  res = await fetchData(METHOD,PATH,updateMeterRoom(id,data) )
    if(!res.data) return null
    return res
}
export const API_deleteMeterRoom = async (id) =>{
    let  res = await fetchData(METHOD,PATH,deleteMeterRoom(id) )
    if(!res.data) return null
    return res
}


export const API_queryPortmeterByid = async(id) =>{
    let  res = await fetchData(METHOD,PATH,queryPortmeterByid(id) )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_queryPortmeters = async()=>{
    let  res = await fetchData(METHOD,PATH,queryPortmeters() )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_createPortmeter  = async(data) =>{
    let  res = await fetchData(METHOD,PATH,createPortmeter(data) )
    if(!res.data) return null
    return res
}
export const API_updatePortmeter = async(id,data)=>{
    let  res = await fetchData(METHOD,PATH,updatePortmeter(id,data) )
    if(!res.data) return null
    return res
}
export const API_deletePortmeter = async(id)=>{
    let  res = await fetchData(METHOD,PATH,deletePortmeter(id) )
    if(!res.data) return null
    return res
}






export const API_queryMemberByid = async (id)=>{
    let  res = await fetchData(METHOD,PATH,queryMemberByid(id) )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_queryMembers = async () =>{
    let  res = await fetchData(METHOD,PATH,queryMembers() )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_createMember = async (data) =>{
    let  res = await fetchData(METHOD,PATH,createMember(data) )
    if(!res.data) return null
    return res
}
export const API_deleteMember = async (id) =>{
    let  res = await fetchData(METHOD,PATH,deleteMember(id) )
    if(!res.data) return null
    return res
}
export const API_updateMember = async (id,data) =>{

    let  res = await fetchData(METHOD,PATH,updateMember(id,data) )
    if(!res.data) return null
    return res
}


export const API_queryRoomByid = async (id) =>{
    let  res = await fetchData(METHOD,PATH,queryRoomByid(id) )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_queryRooms = async () =>{
    let  res = await fetchData(METHOD,PATH,queryRooms() )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_createRoom = async (data) =>{
    let  res = await fetchData(METHOD,PATH,createRoom(data) )
    if(!res.data) return null
    return res
}
export const API_deleteRoom = async (id) =>{
    let  res = await fetchData(METHOD,PATH,deleteRoom(id) )
    if(!res.data) return null
    return res
}
export const API_updateRoom = async (id,data) =>{
  
    let  res = await fetchData(METHOD,PATH,updateRoom(id,data) )
    if(!res.data) return null
    return res
}

export const API_queryFloorByid = async (id) =>{
    let  res = await fetchData(METHOD,PATH,queryFloorByid(id) )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_queryFloors = async () =>{
    let  res = await fetchData(METHOD,PATH,queryFloors() )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_createFloor = async (data) =>{
    let  res = await fetchData(METHOD,PATH,createFloor(data) )
    if(!res.data) return null
    return res
}
export const API_deleteFloor = async (id) =>{
    let  res = await fetchData(METHOD,PATH,deleteFloor(id) )
    if(!res.data) return null
    return res
}
export const API_updateFloor = async (id,data) =>{
  
    let  res = await fetchData(METHOD,PATH,updateFloor(id,data) )
    if(!res.data) return null
    return res
}

export const API_queryBuildingByid = async (id) =>{
    let  res = await fetchData(METHOD,PATH,queryBuildingByid(id) )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_queryBuildings = async () =>{
    let  res = await fetchData(METHOD,PATH,queryBuildings() )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_createBuilding = async (data) =>{
   
    let  res = await fetchData(METHOD,PATH,createBuilding(data) )
    if(!res.data) return null
    return res
}
export const API_deleteBuilding = async (id) =>{
    let  res = await fetchData(METHOD,PATH,deleteBuilding(id) )
    if(!res.data) return null
    return res
}
export const API_updateBuilding = async (id,data) =>{
    console.log(id,data)
    let  res = await fetchData(METHOD,PATH,updateBuilding(id,data) )
    if(!res.data) return null
    return res
}
 //** API Roomprice  */
export const API_queryroomprice = async () =>{
    let  res = await fetchData(METHOD,PATH,queryroomprice() )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_deleteroomprice = async (id) =>{
    let res  =   await  fetchData(METHOD,PATH,deleteroomprice(id) )
    if(!res.data) return null
    return res
}
export const API_createroomprice = async ( data ) =>{
    
    let req  =   await  fetchData(METHOD,PATH,createroomprice(data) )
    if(!req.data) return null
    return req
}
export const API_editroomprice =async (id,data) =>{
    let req  =   await  fetchData(METHOD,PATH,editroomprice(id,data) )
    if(!req.data) return null
    return req
}


/**  Note API application  */

export const API_queryNotes = async () =>{
    let  res = await fetchData(METHOD,PATH,queryNotes() )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}

export const API_queryNoteByid = async (id) =>{
    let  res = await fetchData(METHOD,PATH,queryNoteByid(id) )
    if(!res.data) return null
    res.data = res.data.data;
    return res
}
export const API_createNote = async ( data ) =>{
    
    let req  =   await  fetchData(METHOD,PATH,createNote(data) )
    if(!req.data) return null
    return req
}

export const API_deleteNote = async (id) =>{
    let res  =   await  fetchData(METHOD,PATH,deleteNote(id) )
    if(!res.data) return null
    return res
}

export const API_updateNote =async (id,data) =>{
    let req  =   await  fetchData(METHOD,PATH,updateNote(id,data) )
    if(!req.data) return null
    return req
}





