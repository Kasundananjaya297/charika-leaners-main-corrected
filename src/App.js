import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Admin/Common/Layout";
import Home from "./Components/Admin/Home";
import StudentProfile from "./Components/Admin/StudentProfile";
import RegistrationForm1 from "./Components/Admin/Forms/RegistrationForm1";
import Login from "./Components/Login/Login";
import TrailPermit from "./Components/Admin/Forms/TrailPermit";
import TrialPermitView from "./Components/Admin/Preview/TrialPermitView";
import Medical from "./Components/Admin/Forms/Medical";

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
          {/*
          <Route path="/Form2" element={<Form2 />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
