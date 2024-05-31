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
            <AdminHomeNavBar/>
            <iframe
                width="full"
                height="800"
                seamless
                src="http://172.16.16.103:8088/superset/dashboard/p/gvpjzl7QwAL/"

            >
            </iframe>

          </div>
        </div>
      </div>
  )

};

export default Home;
