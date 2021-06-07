import styls from './Table.module.css'

import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';

import SettingsIcon from '@material-ui/icons/Settings';


export const  Table = ({Data,onClickDelete , onClickEdit , maxWidth}) =>{
    return(
        <>
            {
            Data ?
             <div className={styls.div}> 
               <table className={styls.table}>
                   
                
                       
                    <tbody >
                        
                         <tr>
                        { Data.topic.map( (ele,index) =>

                        index<4?( <th key={`tbl_${index}`} >{ele}</th> ):null
                         ) }
                         <th></th>
                         </tr>
                         
                        { Data.body.map( (ele,row_index) => 
                        
                        <tr>
                             {
                          
                            Object.keys(ele).map( (key,index)=>
                                 key === 'id' || key === 'data' ? null: 
                                <>
                                   <td  key={`tbl_${key}_index`}>
                                       <div>
                                            <input value={ele[key] } type="text"/>
                                        </div>
                                       
                                     </td>
                                </>
                            )

                            } 
                             <td key={row_index}>
                                    <div>
                                        <button onClick={()=>{ 
                                            onClickDelete?
                                            onClickDelete(ele['id']) : console.log('delete',ele['id'])
                                        }  }   ><Delete/>
                                        </button>

                                        <button onClick={()=>{ 
                                           
                                            onClickEdit?
                                            onClickEdit(ele['id'],ele['data']) : console.log('edit',ele['id'])
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
