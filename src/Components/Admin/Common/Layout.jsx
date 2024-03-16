import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  const location = useLocation();
  const isVisible = !(
    location.pathname.includes("/Form1") ||
    location.pathname.includes("/Form2") ||
    location.pathname.includes("/Login") ||
    location.pathname.includes("/trail")||
    location.pathname.includes("/trailView")||
    location.pathname.includes("/medical")
  );

  return (
    <div className="flex bg-neutral-100 h-screen w-screen">
      {isVisible && <Sidebar />}
      <div className="flex-1 w-screen h-screen">
        <div>{<Outlet />}</div>
        {/*Used to add other dyanamic components */}
      </div>
    </div>
  );
}
