import {useState, useContext} from "react";
import { DrawerDash } from "../components/DrawerDash";
import { ContextMain } from "../context/ContextMain";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { auth } = useContext(ContextMain)


  if (!auth) {
    return <Navigate to={"/"}></Navigate>
  }
  return (
    <>
      <main className="min-h-screen bg-black/90 pb-1">
        <div className="flex gap-4 items-center py-6 bg-white">
          <DrawerDash></DrawerDash>
          <p className="font-extrabold">Dashboard</p>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
