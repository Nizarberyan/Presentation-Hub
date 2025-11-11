import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const RootLayout: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <Nav />
    <main>
      <Outlet />
    </main>
  </div>
);

export default RootLayout;
