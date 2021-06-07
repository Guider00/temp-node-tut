import logo from './logo.svg';
import './App.css';

import { Menubar } from './components/Menubar/Menubar';

import { RoomPrice } from './components/Setting/RoomPrice/RoomPrice';
import { Overview } from './components/Overview/Overview' 

import { BrowserRouter ,Switch , Route  } from "react-router-dom";



const _Setting_roomprice =() =>(
  <>
    <Menubar></Menubar>
    <RoomPrice></RoomPrice>
  </>
)
const _Overview =() =>(
  <>
      <Menubar></Menubar>
      <Overview></Overview>
  </>
)


function App() {
  return (
    <BrowserRouter>
    <Switch>
       <Route exact path="/home" component={_Overview} />
       <Route exact path="/profilepriceroom" component={_Setting_roomprice} />
       <Route exact path="/*" component={_Overview} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
