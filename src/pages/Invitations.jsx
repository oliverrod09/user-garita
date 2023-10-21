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
  if (!auth) {
    return <Navigate to={"/"}></Navigate>;
  }
  useEffect(() => {
    getInvitations();
  }, []);

  async function getInvitations() {
    try {
      const url = `${back}/invitations/user`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
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
      <div className="flex gap-4 items-center py-6">
        <DrawerDash></DrawerDash>
        <p className="font-extrabold">Invitaciones</p>
      </div>
      <main className="w-11/12 mx-auto">
        <div className="flex flex-col gap-2">
          {user.map((inv, key) => (
            <CardInvitation key={key} inv={inv}></CardInvitation>
          ))}
        </div>
      </main>
    </>
  );
}

export default Invitations;
