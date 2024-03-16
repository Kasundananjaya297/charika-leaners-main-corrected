import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcPortraitMode } from "react-icons/fc";
import { SIDEBAR_LINKS } from "../../Const/Navigation";
import classNames from "classnames";
import { HiOutlineLogout } from "react-icons/hi";
import Swal from "sweetalert2";

const linkClassname =
  "flex items-center gap-2 font-light px-3 py-2 no-underline hover:no-underline hover:bg-neutral-700 hover:text-white active:bg-neutral-600 active:text-white rounded-sm text-base";

export default function Sidebar() {
  const nav = useNavigate();
  useEffect(() => {
    let role = sessionStorage.getItem("role");
    console.log("role: " + role);
    if (!(role === "ADMIN" && sessionStorage.getItem("token") !== null)) {
      nav("/");
    }
  }, [nav]);

  const handleLogOut = () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "Log Out",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
      cancelButtonAriaLabel: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        nav("/");
      }
    });
  };
  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
      <div className="flex items-center gap-4 px-1 py-4">
        <FcPortraitMode fontSize={30} />
        <span className="text-neutral-100 text-lg">Admin</span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-y-0.5">
        {SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div
        className={classNames(linkClassname, "text-red-500", "cursor-pointer")}
        onClick={handleLogOut}
      >
        <span className="text-xl">
          <HiOutlineLogout />
        </span>
        Logout
      </div>
    </div>
  );
}
function SidebarLink({ item }) {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={classNames(
        linkClassname,
        pathname === item.path
          ? "text-white bg-neutral-700"
          : "text-neutral-400"
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.lable}
    </Link>
  );
}
