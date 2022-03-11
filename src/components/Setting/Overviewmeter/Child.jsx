import {  useState ,useImperativeHandle ,forwardRef} from 'react';

export const Child = forwardRef((props, ref) => {

  // The component instance will be extended
  // with whatever you return from the callback passed
  // as the second argument
  const [data , setdata] = useState("")
  useImperativeHandle(ref, () => ({

    getAlert() {
      alert("getAlert from Child");
    },
    getdata(){
        return  (data)
    }
  }));

  return <><input value={data} onChange={(e)=>{setdata(e.target.value)}}/>
  </>;
});
