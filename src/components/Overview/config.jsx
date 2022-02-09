
export const option_status_room = [
  {value:"ห้องว่าง",label:"ห้องว่าง"},{value:"จอง",label:"จอง"}
  ,{value:"ย้ายเข้า",label:"ย้ายเข้า"},{value:"ย้ายออก",label:"แจ้งย้ายออก"}
  ,{value:"มีคนอยู่",label:"มีคนอยู่"},{value:"ปรับปรุง",label:"ปรับปรุง"}
   ] 
export  const  Inputconfig = () => {
  return({
    topic:["#","อาคาร","ชั้น","ห้อง","มิตเตอร์"],
    inputs:[
        {
          label:"ห้อง",
          property:"name",
        form:{
          status:"disable",
          validate:"",
          validate_type:"text",
          displayform:"textbox",
          type:"text" ,
          value:""
        } 
      },
      { label:"อาคาร",
        property:"building",
      form:{
        status:"enable",
        validate:"",
        validate_type:"",
        displayform:"select",
        options:[{value:"1",label:"1"}],
        value:""
          } 
      },
      { 
      label:"ชั้น",
      property:"floor",
        form:{
        status:"disable",
        displayform:"select",
        options:[{value:"1",label:"1"}],
        value:""
            } 
      },
      { 
        label:"สถานะ",
        property:"status",
          form:{
          status:"disable",
          displayform:"select",
          options:option_status_room,
          value:""
              } 
        },
      { 
        label:"ผู้อยู่อาศัย",
        property:"member",
          form:{
          status:"disable",
          displayform:"select",
          options:[{value:"",label:"---"}],
          value:""
              } 
      },
      { 
        label:"ชนิด",
        property:"RoomType",
          form:{
          status:"enable",
          displayform:"select",
          options:[{value:"",label:"---"}],
          value:""
              } 
      },
      { 
        label:"มิตเตอร์",
        property:"meterroom",
          form:{
          status:"enable",
          displayform:"select",
          options:[{value:"1",label:"1"}],
          value:""
              } 
      },



    ]
  })
}

export const drowdownmenuroomconfig  =
      [
        {label:"ย้ายเข้า" , link:"check_in" },
        {label:"ย้ายออก" , link:"check_out" },
        {label:"จองห้อง" , link:"booking"},
        {label:"ยกเลิกการจอง" , link:""},
        {label:"แจ้งย้ายออก" , link:""},
        {label:"ยกเลิกการย้ายออก" , link:""},
        {label:"มิตเตอร์" , link:""},
        {label:"ออกใบแจ้งหนี" , link:""},
        {label:"ชำระเงิน" , link:""}
      ]
    