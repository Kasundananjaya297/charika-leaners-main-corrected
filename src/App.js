import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Admin/Common/Layout";
import Home from "./Components/Admin/Home";
import StudentProfile from "./Components/Admin/StudentProfile";
import RegistrationForm1 from "./Components/Admin/Forms/RegistrationForm1";
import Login from "./Components/Login/Login";
import TrailPermit from "./Components/Admin/Forms/TrailPermit";
import TrialPermitView from "./Components/Admin/Preview/TrialPermitView";
import Medical from "./Components/Admin/Forms/Medical";
import AddVehicleType from "./Components/Admin/Forms/AddVehicleType";
import RegistrationForm1Edit from "./Components/Admin/Forms/RegistrationForm1Edit";
import TrailPermitEdit from "./Components/Admin/Forms/TrailPermitEdit";
import AddVehicleTypeEdit from "./Components/Admin/Forms/AddVehicleTypeEdit";
import PreviewMedical from "./Components/Admin/Preview/PreviewMedical";
import MedicalEdit from "./Components/Admin/Forms/MedicalEdit";
import Camera from "./Components/Admin/Common/Camera";
import Packages from "./Components/Admin/Packages";
import AddPackages from "./Components/Admin/Forms/AddPackages";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/studentprofile/Form1" element={<RegistrationForm1 />} />
          <Route path="/studentprofile/trail" element={<TrailPermit />} />
          <Route path = "/studentprofile/trailView" element={<TrialPermitView/>} />
          <Route path="/studentprofile/medical" element={<Medical/>}/>
          <Route path = "/studentprofile/trail/addtype" element={<AddVehicleType/>} />
          <Route path ="/studentprofile/Form1/edit" element={<RegistrationForm1Edit/>} />
          <Route path ="/studentprofile/trail/edit" element={<TrailPermitEdit/>} />
          <Route path="/studentprofile/trail/editVehicleType" element={<AddVehicleTypeEdit/>}/>
          <Route path ="/studentprofile/medical/view" element = {<PreviewMedical/>} />
          <Route path ="/studentprofile/medical/edit" element = {<MedicalEdit/>} />
          <Route path = "/studentprofile/Form1/camera" element = {<Camera/>} />
          <Route path="/Packages" element={< Packages/>} />
          <Route path = "/Packages/addPackage" element={<AddPackages/>} />
           {/*
          <Route path="/Form2" element={<Form2 />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
