import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
          <div className="flex flex-wrap">
            Admin home
          </div>
        </div>
      </div>
  )

};

export default Home;
