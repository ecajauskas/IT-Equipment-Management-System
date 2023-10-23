import Register from './components/Register'
import Login from './components/Login'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.min.css';
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Home from './components/Home';
import AddComputer from "./computers/AddComputer";
import EditComputer from './computers/EditComputer';
import ViewComputer from './computers/ViewComputer';
import ComputerList from './computers/ComputerList';
import AddEquipment from './equipment/AddEquipment';
import EditEquipment from './equipment/EditEquipment';
import EquipmentList from './equipment/EquipmentList';
import ViewOffice from './offices/ViewOffice';
import OfficeList from './offices/OfficeList';
import AddOffice from './offices/AddOffice';
import EditOffice from './offices/EditOffice';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import UserList from './components/UserList';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='login' element={<Login />} />
        <Route element={<><NavBar /><RequireAuth allowedRoles={("USERADMIN")} /></>}>
          <Route path='/' element={<Home />} />
          <Route path='unauthorized' element={<Unauthorized />} />
          <Route path='*' element={<Missing />} />

          <Route exact path="/computerlist/:pagenumber" element={<ComputerList />} />
          <Route exact path="/viewcomputer/:id" element={<ViewComputer />} />

          <Route exact path="/equipmentlist/:pagenumber" element={<EquipmentList />} />

          <Route exact path="/viewoffice/:officeid/:officenumber" element={<ViewOffice />} />
          <Route exact path="/officelist" element={<OfficeList />} />

          <Route exact path="/userlist" element={<UserList />}></Route>
        </Route>
        <Route element={<><NavBar /><RequireAuth allowedRoles={("ADMIN")} /></>}>
          <Route path='register' element={<Register />} />
          <Route exact path="/addcomputer/:officenumber" element={<AddComputer />} />
          <Route exact path="/editcomputer/:id" element={<EditComputer />} />

          <Route exact path="/:typeofdevice/addequipment/:computerid" element={<AddEquipment />} />
          <Route exact path="/editequipment/:id" element={<EditEquipment />} />

          <Route exact path="/addoffice" element={<AddOffice />} />
          <Route exact path="/editoffice/:id" element={<EditOffice />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
