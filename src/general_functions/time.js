export const DiffDate = (date1 , date2) =>{
   const Difference_In_Time = date2.getTime() - date1.getTime();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24) ;
   return Math.ceil( Difference_In_Days )
}