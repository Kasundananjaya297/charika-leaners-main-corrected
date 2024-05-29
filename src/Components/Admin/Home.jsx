import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHomeNavBar from "./Common/AdminHomeNavBar";

const Home = () => {
  const nav = useNavigate();

  useEffect(() => {
    let role = sessionStorage.getItem("role");
    console.log("role: " + role);
    if (!(role === "ADMIN" && sessionStorage.getItem("token") !== null)) {
      nav("/");
    }
  }, [nav]);

  return (
      <div className="flex flex-col h-dvh mb-2">
        <div className="flex flex-col overflow-y-scroll  h-full">
          <div className="flex flex-col">
            <AdminHomeNavBar />
            <iframe title="Charika Leaners" width="1140" height="541.25" src="http://172.16.16.103:5001/public/dashboards/qIZieKzbNkU40XSP59BCunSDjjBfroi0sBJkCKHK?org_slug=default?refresh=30">
            </iframe>
          </div>
        </div>
      </div>
  )

};

export default Home;
