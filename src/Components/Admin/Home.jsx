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
  return <div>This is home</div>;
};

export default Home;
