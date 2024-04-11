import { HiHome, HiViewGrid } from "react-icons/hi";
import { GoPackage } from "react-icons/go";
import { FaCar } from "react-icons/fa";

export const SIDEBAR_LINKS = [
  {
    key: "home",
    lable: "Home",
    path: "/Home",
    icon: <HiHome />,
  },
  {
    key:"Packages",
    lable:"Packages",
    path:"/Packages",
    icon:<GoPackage/>

  },
  {
    key: "StudentProfile",
    lable: "Student Profile",
    path: "/studentprofile",
    icon: <HiViewGrid />,
  },
  {
    key: "Vehicle",
    lable: "Vehicle",
    path: "/vehicle",
    icon: <FaCar />,
  }
];
