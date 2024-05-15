import { HiHome, HiViewGrid } from "react-icons/hi";
import { GoPackage } from "react-icons/go";
import { FaCar } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

export const SIDEBAR_LINKS = [
  {
    key: "home",
    lable: "Home",
    path: "/Home",
    icon: <HiHome />,
  },
  {
    key: "Vehicle",
    lable: "Vehicle",
    path: "/vehicle",
    icon: <FaCar />,
  },
  {
    key:"Packages",
    lable:"Packages",
    path:"/Packages",
    icon:<GoPackage/>

  },
  {
    key: "Trainers",
    lable: "Trainers",
    path: "/Trainer",
    icon: <FaChalkboardTeacher />,
  },
  {
    key: "Schedule",
    lable: "Schedule",
    path: "/Schedule",
    icon: <FaCalendarAlt />,
  },
  {
    key: "StudentProfile",
    lable: "Student Profile",
    path: "/studentprofile",
    icon: <PiStudentBold />,
  },
];
