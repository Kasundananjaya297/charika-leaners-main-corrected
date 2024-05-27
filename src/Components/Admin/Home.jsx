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
            <iframe title="Charika Leaners" width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=8fa44dac-4541-4e61-9e25-9a586ed1ff3c&autoAuth=true&embeddedDemo=true" frameborder="0" allowFullScreen="true">

            </iframe>
          </div>
        </div>
      </div>
  )

};

export default Home;
