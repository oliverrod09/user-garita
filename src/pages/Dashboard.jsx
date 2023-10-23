import React from "react";
import { DrawerDash } from "../components/DrawerDash";

function Dashboard() {
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
