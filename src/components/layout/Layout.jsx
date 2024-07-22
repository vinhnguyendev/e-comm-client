import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
