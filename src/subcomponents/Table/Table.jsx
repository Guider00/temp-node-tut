import styls from './Table.module.css'

import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';

import SettingsIcon from '@material-ui/icons/Settings';
import { useState, useEffect } from "react";


export const  Table = ({Data,onClickDelete , onClickEdit , maxWidth}) =>{

    const [page_index,setpage_index] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
      useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
      }, []); // Empty array ensures that effect is only run on mount
      console.log(Data.body)
      
    return(
        <>
           
            {
            Data  && Data.topic && Data.body?
             <div className={styls.div}> 
               <table className={styls.table}>
             
                
                       
                    <tbody >
                         <tr>
                             <th>#</th>
                        { Data.topic.map( (ele,index) => (  index >=  page_index*(width > 800? (6) : (4))     &&  index <=  (width > 800? (6) : (4))- 1 + (page_index*(width > 800? (6) : (4)))    ) ?( <th key={`tbl_${index}`} >{ele}</th> ):null) }


                         <th>
                            <div>
                            {
                                   ( Data.topic.length > (width > 800? (6) : (4)) ) ?
                                   
                                   <button   disabled={(page_index === 0)}  onClick={()=>{
                                       if(page_index > 0){
                                        let _page_index = page_index -1
                                       setpage_index(_page_index)
                                       }
                                    }}> {`<<`} </button>:null
                            }
                            { 
                                ( Data.topic.length > (width > 800? (6) : (4)) ) ?
                                <button   disabled={( (Data.topic.length)/((page_index+1)*(width > 800? (6) : (4)))   < 1 )}  onClick={()=>{
                             
                                   let _page_index = page_index +1
                                    setpage_index(_page_index)
                                 }}> {`>>`} </button>:null
                            }

                            </div>
                         </th>
                              {/*
                                |   #   | name           | name2          | ....
                                |   1   | body[property] | body[property] | ....
                                |   2   | body[property] | body[property] | ....
                            */}
                         </tr>
                         
                        { Data.body.map( (ele_body,row_index) => 
             
                              <tr key={`${ele_body['id']}_${row_index}`}>
                              {Data.showindex? 
                              <td key={`Data.showindex ${row_index}`}> <div>{row_index+1}</div></td>:null
                               }
                             {
                                  
                             Data.inputs.map( (input,index)=>
                             (  index >=  page_index*(width > 800? (6) : (4))     &&  index <=   ((page_index+1)*(width > 800? (6) : (4)))-1    ) ?

                          
                                <>
                                   <td  key={`tbl_${input.property}_index`}>
                                        <div>
                                             <input value={ele_body[input.property] } type="text"/> 
                                        </div>
                                       
                                     </td>
                                </>
                                :null


                            )

                            } 
                             <td key={row_index}>
                                    <div>
                                        <button onClick={()=>{ 
                                            onClickDelete?
                                            onClickDelete(ele_body['id']) : console.log('delete',ele_body['id'])
                                        }  }   ><Delete/>
                                        </button>

                                        <button onClick={()=>{ 
                                           
                                            onClickEdit?
                                            onClickEdit(ele_body['id'],ele_body['data']) : console.log('edit',ele_body['id'])
                                        }  }     ><SettingsIcon/></button>
                                    </div>
                                   
                                  
                            </td> 
                        </tr>
                        
                        ) } 

                        
                    </tbody> 
                </table>
                </div>
            : null
            }
        </>
    )
}
export default Table
