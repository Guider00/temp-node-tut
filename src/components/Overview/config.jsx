

export  const  Inputconfig = () => {
  return({
    topic:["#","อาคาร","ชั้น","ห้อง"],
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
          options:[{value:"จอง",label:"จอง"},{value:"ย้ายเข้า",label:"ย้ายเข้า"},{value:"ย้ายออก",label:"ย้ายออก"},{value:"ห้องว่าง",label:"ห้องว่าง"},{value:"มีคนอยู่",label:"มีคนอยู่"} ],
          value:""
              } 
        },
      { 
        label:"ผู้อยู่อาศัย",
        property:"member",
          form:{
          status:"disable",
          displayform:"select",
          options:[{value:"1",label:"1"}],
          value:""
              } 
        },
      { 
        label:"ชนิด",
        property:"type",
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