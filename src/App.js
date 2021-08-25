
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


import { FormLogin } from './components/Login/Login'
import { FormSignup } from './components/Signup/Signup'


import { Profile } from './components/Profile/Profile'
import { Usermanagement } from './components/Adminsetting/Usermanagment'


import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";


import { useQuery,  gql, } from '@apollo/client';


import { Check_in } from './components/Check_in/Check_in';
import { Check_out } from './components/Check_out/Check_out';
import { Contract } from './components/Contract/Contract';


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

const _Setting_roomprice = () => (
  <>
    <RoomPrice></RoomPrice>
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

const _Check_in = () =>(
  <>
      <Check_in />
  </>
)
const _Check_out = () =>(
  <>
      <Check_out />
  </>
)
const _Contract = () =>(
  <>
      <Contract />
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
      {(loading) ? <div>'Loading...'</div> : 
      (error) ?
        <>
        <Route exact path="/*" component={_FormLogin} />
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
            <Route exact path="/meterroom" component={_MeterRoom} />
            <Route exact path="/portmeter" component={_Portmeter} />
            <Route exact path="/overviewmeter" component={_OverviewMeter} />

            <Route exact path="/check_in" component={_Check_in} />
            <Route exact path="/check_out" component={_Check_out} />
            <Route exact path="/contract" component={_Contract} />


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
    </BrowserRouter>
  );
}

export default App;
