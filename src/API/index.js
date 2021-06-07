import {createroomprice , editroomprice ,deleteroomprice , queryroomprice } from './Schema/RoomPrice/sch_roomprice'
import fetchData from '../cores/axios/index'


export const API_queryroomprice = async () =>{
    let  req = await fetchData('POST','graphql',queryroomprice() )
    if(!req.data) return null
    req.data = req.data.data;
    return req
}

export const API_deleteroomprice = async (id) =>{
    let req  =   await  fetchData('POST','graphql',deleteroomprice(id) )
    if(!req.data) return null
    return req
}

export const API_createroomprice = async ( data ) =>{
    
    let req  =   await  fetchData('POST','graphql',createroomprice(data) )
    if(!req.data) return null
    return req
}
export const API_editroomprice =async (id,data) =>{
    let req  =   await  fetchData('POST','graphql',editroomprice(id,data) )
    return req
}

