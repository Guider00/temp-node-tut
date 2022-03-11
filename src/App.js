
import './App.css';

import { Menubar } from './components/Menubar/Menubar2';

import { RoomPrice } from './components/Setting/RoomPrice/RoomPrice';
import { RoomType } from './components/Setting/RoomType/RoomType'
import { Building } from './components/Setting/Building/Building';
import { Floor } from './components/Setting/Floor/Floor';
import { Member } from './components/Setting/Member/Member';

import { MeterRoom } from './components/Setting/MeterRoom/MeterRoom';

import { Portmeter } from './components/Setting/PortMeter/PortMeter';
import { Overviewmeter } from './components/Setting/Overviewmeter/Overviewmeter';
import { Address } from './components/Setting/Address/Address';

import { Realtimetable } from './components/Setting/Realtimetable/Realtimetable';
import { MQTToverview } from './components/Setting/MQTToverview/MQTToverview';



import { Overview } from './components/Overview/Overview'

import { Checkoutinform } from './components/Checkoutinform/Checkoutinform'

import { Reimbursement } from './components/Reimbursement/Reimbursement';

import { FormLogin } from './components/Login/Login'
import { FormSignup } from './components/Signup/Signup'


import { Profile } from './components/Profile/Profile'
import { Usermanagement } from './components/Adminsetting/Usermanagment'


import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";


import { useQuery ,  gql } from '@apollo/client';



import { Booking } from './components/Booking/Booking'
import { Checkin } from './components/Checkin/Checkin';
import { Checkout } from './components/Checkout/Checkout';
import { Contract } from './components/Contract/Contract';

import { Receipt } from './components/Receipt/Receipt';
import { Invoice } from './components/Invoice/Invoice';

import { Reportfinancial } from './components/Reports/Reportfinancial';
import { Reportuntility } from './components/Reports/Reportuntility';
import { Reportelectrical } from './components/Reports/electrical/Reportelectrical';
import { Reportwater } from './components/Reports/water/Reportwater';



import { CreateInvoic } from './components/CreateInvoice/CreateInvoice'

import { Note } from './components/Note/Note';


const API_GET_USER = gql`
query{
  getuser{
    _id
    id
    username
    email
    level
    lock_user
  }
}
`;

const _FormLogin = () => (
  <>
    <FormLogin></FormLogin>
  </>
)

const _FormSignup = () => (
  <>
    <FormSignup />

  </>
)


const _MeterRoom = () => (
  <>
    <MeterRoom></MeterRoom>
  </>
)

const Checkout_inform = () =>(
  <>
    <Checkoutinform></Checkoutinform>
  </>
)

const _Reimbursement = () =>(
  <>
    <Reimbursement></Reimbursement>
  </>
)

const _Setting_roomprice = () => (
  <>
    <RoomPrice></RoomPrice>
  </>
)
const _RoomType = () =>(
  <>
    <RoomType></RoomType>
  </>
)
const _Overview = () => (
  <>

    <Overview></Overview>
  </>
)
const _Building = () => (
  <>
    <Building />
  </>
)
const _Floor = () => (
  <>
    <Floor />
  </>
)
const _Member = () => (
  <>
    <Member />
  </>
)
const _Portmeter = () => (
  <>
    <Portmeter />
  </>
)
const _OverviewMeter = () => (
  <>
    <Overviewmeter />
  </>
)
const _Booking = () =>(
  <>
    <Booking></Booking>
  </>
)
const _Check_in = () =>(
  <>
      <Checkin></Checkin>
  </>
)
const _Check_out = () =>(
  <>
      <Checkout />
  </>
)
const _Contract = () =>(
  <>
      <Contract />
  </>
)
const _Receipt = () =>(
  <>
      <Receipt />
  </>
)
const _Invoice = () =>(
  <>
      <Invoice />
  </>
)
const _CreateInvoic =( ) =>(
  <>
    <CreateInvoic />
  </>
)
const _Address =() =>(
  <>
  <Address/>x
  </>
)
const _Report_financial = () =>(
  <>
    <Reportfinancial/>
  </>
)
const _Report_untility = () =>(
  <>
    <Reportuntility/>
  </>
)
const _Report_electrical = () =>(
  <> <Reportelectrical/> </>
)

const _Report_water = () =>(
  <> <Reportwater/> </>
)
const _MQTToverview =()=>(
  <> <MQTToverview/> </>
)
const _Realtimetable =()=>(
  <> <Realtimetable/> </>
)




const _Note =()=>(
  <>
    <Note/>
  </>
)




function App() {
  const { loading, error, data } = useQuery(API_GET_USER);
  console.log("user :" , data);
  // if(error){
  //   console.log(window.location.pathname)
  //   if(  window.location.pathname === '/login'  ){

  //   }else{
  //         window.location.href = '/login'
  //   }

  // }
  return (
    <BrowserRouter>
      {loading ? 'loading...':<>
      {(error) ?
        <>
          <Route exact path="/*" component={ _FormLogin } />
          <Route exact path="/signup" component={_FormSignup} />
        </>
      :
        <>
          <Menubar></Menubar>
          <Switch>
            <Route exact path="/">
              {error ? <FormLogin /> : <Redirect to="/home" />}
            </Route>
            <Route exact path="/home" component={_Overview} />
            <Route exact path="/building" component={_Building} />
            <Route exact path="/floor" component={_Floor} />
            <Route exact path="/member" component={_Member} />
            <Route exact path="/profilepriceroom" component={_Setting_roomprice} />
            <Route exact path="/roomtype" component={_RoomType} />
            <Route exact path="/meterroom" component={_MeterRoom} />
            <Route exact path="/portmeter" component={_Portmeter} />
            <Route exact path="/overviewmeter" component={_OverviewMeter} />
            <Route exact path="/Address" component={_Address} />
            <Route exact path="/checkoutinform" component={Checkout_inform} />
            <Route exact path="/Reimbursement" component={_Reimbursement} />
          

            <Route exact path="/booking" component={_Booking} />
            <Route exact path="/check_in" component={_Check_in} />
            <Route exact path="/check_out" component={_Check_out} />
             
            <Route exact path="/contract" component={_Contract} />
            <Route exact path="/receipt" component={_Receipt} />
            <Route exact path="/invoice" component={_Invoice} />
            <Route exact path="/createinvoice" component={_CreateInvoic} />
            <Route exact path="/report_financial" component={_Report_financial} />
            <Route exact path="/report_untility" component={_Report_untility}/>
            <Route exact path="/report_electrical" component={_Report_electrical}/>
            <Route exact path="/report_water" component={_Report_water}/>

            <Route exact path="/MQTToverview" component={_MQTToverview}/>
            <Route exact path="/Realtimetable" component={_Realtimetable}/>

            <Route exact path="/note" component={_Note} />


            {/*  ยังไม่ได้ทำ */}
            <Route exact path="/profile"  >
              <Profile></Profile>
            </Route>
            <Route exact path="/usermanagment">
              <Usermanagement></Usermanagement>
            </Route>

            <Route exact path="/overallnote" component={_OverviewMeter} />



            <Route exact path="/*" >
                <Redirect to="/home" />
            </Route>
          </Switch>
        </>
      }
    </>}
    </BrowserRouter>
  );
}

export default App;
