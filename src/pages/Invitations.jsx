import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { back } from "../const/urls";
import { ContextMain } from "../context/ContextMain";
import { DrawerDash } from "../components/DrawerDash";
import CardInvitation from "../components/CardInvitation";

function Invitations() {
  const [user, setUser] = useState([]);
  const [expirationStatus, setExpirationStatus] = useState("");
  const { auth } = useContext(ContextMain);

  useEffect(() => {
    getInvitations();
  }, []);

  if (!auth) {
    return <Navigate to={"/"}></Navigate>;
  }
  async function getInvitations() {
    try {
      const url = `${back}/invitations/user`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      // if (auth) {
        
      // }
      const response = await axios.get(url, config);

      if (response.status == 200) {
        console.log(response.data);
        const data = response.data;
        setUser(data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main className="min-h-screen bg-black/90 pb-1">
        <div className="flex gap-4 items-center py-6 bg-white">
          <DrawerDash></DrawerDash>
          <p className="font-extrabold">Invitaciones</p>
        </div>
        <div className="w-11/12 mx-auto my-4">
          <div className="flex flex-col gap-2">
            {user.map((inv, key) => (
              <CardInvitation key={key} inv={inv}></CardInvitation>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Invitations;
