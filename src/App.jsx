import AddMaterials from "./Pages/AddMaterials";
import CreateS_admin from "./Pages/CreateS_admin";
import CreateShipment from "./Pages/CreateShipment";
import Dashboard from "./Pages/Dashboard";
import EditS_admin from "./Pages/EditS_admin";
import ManageOfOrders from "./Pages/ManageOfOrders";
import ReportsAnalysis from "./Pages/ReportsAnalysis";
import RoleAuth from "./Pages/RoleAuth";
import RoutePlanning from "./Pages/RoutePlanning";
import S_adminLogin from "./Pages/S_adminLogin";
import SupplierManage from "./Pages/SupplierManage";
import UserLogin from "./Pages/UserLogin";
import VehicleManage from "./Pages/VehicleManage";
import SupplierUserLogin from "./Pages/SupplierLogin";
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
<BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/material" element={<AddMaterials/>} />
                <Route path="/CreateS_admin" element={<CreateS_admin/>} />
                <Route path="/shipment" element={<CreateShipment/>} />
                <Route path="/editSadmin" element={<EditS_admin/>} />
                <Route path="/ManageOrders" element={<ManageOfOrders/>} />
                <Route path="/Report" element={<ReportsAnalysis/>} />
                <Route path="/" element={<RoleAuth/>} exact/>
                <Route path="/itinerary" element={<RoutePlanning/>} />
                <Route path="/S_adminLogin" element={<S_adminLogin/>} />
                <Route path="/supplier" element={<SupplierManage/>} />
                <Route path="/login" element={<UserLogin/>} />
                <Route path="/vehicle" element={<VehicleManage/>} />
                <Route path="/supplierlogin" element={<SupplierUserLogin/>} />
            </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
