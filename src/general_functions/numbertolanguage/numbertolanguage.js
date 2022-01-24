

export const  numbertothailanguage = (number) =>{
  
        if(number === 0 || ( number &&  typeof number==='number' ) ){
            const num = ['ศูนย์', 'หนึ่ง', 'สอง', 'สาม', 'สี', 'ห้า', 'หก', "เจ็ด", "แปด", "เก้า",];
            const pos = ['หน่วย', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'เเสน', 'ล้าน','สิบล้าน','ร้อยล้าน','พันล้าน','หมื่นล้าน','แสนล้าน'];
            const string_number = number.toString() 
     
            let bef_dp = ""
            let after_db = ""
            let resulte  =""
            let bef_res = ""

            let aft_res =""
            if(  ( string_number ).indexOf('.') !== -1  ){
                     // ตั้งเอาเฉพาะตัวเลข 
                bef_dp = string_number.slice( 
                  (( string_number ).indexOf('-') !== -1 ) ? 1 : 0
                 ,( string_number ).indexOf('.') 
                 )

                after_db = string_number.slice( ( string_number ).indexOf('.')+1 , string_number.length)
            }else{
                // ตั้งเอาเฉพาะตัวเลข 
                 bef_dp = string_number.slice(   (( string_number ).indexOf('-') !== -1 ) ? 1 : 0  , string_number.length)
            }
              
              [...bef_dp].reverse().map( (chr,index,arry) => {
                if(index === 0){
                        //<< หลักหน่วย
                    if( parseInt(chr) !== 0 ){
                        if(parseInt(chr) === 1  &&  arry.length >= (index+2)  && arry[index+1] !== '0'  ){
                            bef_res =   'เอ็ด' + bef_res // หลัง 10 ไม่เท่ากับ 0 แล้วหลักหน่วย เท่ากับ 1 
                        }else{
                            bef_res =   num[parseInt(chr)] + bef_res   // << 
                        }
                        
                    }else if(  parseInt(chr) === 0  &&  arry.length === 1 ) {
                         bef_res = 'ศูนย์'
                    }
                }else{
                     //<< หลักสิบขึ้นไป
                    if( parseInt(chr) !== 0 ){
                        bef_res =     num[parseInt(chr)]  + pos[index] + bef_res
                    }
                }
               
            });
 
            if(after_db !== ""){
                [...after_db].map( (chr,index,arry) => {
                    aft_res = aft_res +  num[parseInt(chr)]
                })
            }
           
            resulte =  (
             (( ( string_number ).indexOf('-') !== -1 ) ? "ลบ":"") +
                 bef_res +
             (( ( string_number ).indexOf('.') !== -1 ) ? "จุด":"") + 
              aft_res ).replace("สองสิบ", "ยี่สิบ")
           resulte = resulte.replace("หนึ่งสิบ", "สิบ");

            console.log('ทดสอบ ',number,resulte)


            return resulte;
        }
        return null
}