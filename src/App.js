
import './App.css';

import { Menubar } from './components/Menubar/Menubar';

import { RoomPrice } from './components/Setting/RoomPrice/RoomPrice';
import { Building } from './components/Setting/Building/Building';
import { Floor } from './components/Setting/Floor/Floor';
import { Member } from './components/Setting/Member/Member';

import { MeterRoom } from './components/Setting/MeterRoom/MeterRoom';

import { Portmeter } from './components/Setting/PortMeter/PortMeter';
import { Overviewmeter } from './components/Setting/Overviewmeter/Overviewmeter';



import { Overview } from './components/Overview/Overview' 


import { BrowserRouter ,Switch , Route  } from "react-router-dom";


const _MeterRoom =() =>(
  <>
    <MeterRoom></MeterRoom>
  </>
)

const _Setting_roomprice =() =>(
  <>
    <RoomPrice></RoomPrice>
  </>
)
const _Overview =() =>(
  <>
     
      <Overview></Overview>
  </>
)
const _Building =() =>(
  <>
     <Building/>
  </>
)
const _Floor =() =>(
  <>
     <Floor/>
  </>
)
const _Member =() =>(
  <>
     <Member/>
  </>
)
const _Portmeter =() =>(
  <>
    <Portmeter/>
  </>
)
const _OverviewMeter =() =>(
  <>
    <Overviewmeter/>
  </>
)



function App() {
  return (
    <BrowserRouter>
     <Menubar></Menubar>
    <Switch>

       <Route exact path="/home" component={_Overview} />
       <Route exact path="/building" component={_Building} />
       <Route exact path="/floor" component={_Floor} />
       <Route exact path="/member" component={_Member} />
       <Route exact path="/profilepriceroom" component={_Setting_roomprice} />
       <Route exact path="/meterroom" component={_MeterRoom} />
       <Route exact path="/portmeter" component={_Portmeter} />
       <Route exact path="/overviewmeter" component={_OverviewMeter} />

        {/*  ยังไม่ได้ทำ */}
       <Route exact path="/overallnote" component={_OverviewMeter} />
       


       <Route exact path="/*" component={_Overview} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
