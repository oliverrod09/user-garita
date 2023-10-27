import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { back } from "../const/urls";
import { ContextMain } from "../context/ContextMain";
import { DrawerDash } from "../components/DrawerDash";
import CardInvitation from "../components/CardInvitation";
import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
} from "@heroicons/react/24/outline";

function Invitations() {
  const [user, setUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
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
      const response = await axios.get(url, config);

      if (response.status === 200) {
        const data = response.data;
        setUser(data);
        setFilteredUser(data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  

  function searchInv(e) {
    const inputValue = e.target.value.toLowerCase();
    const filterInv = user.filter((inv) => {
      return (
        inv.name.toLowerCase().includes(inputValue) ||
        inv.description.toLowerCase().includes(inputValue)
      );
    });
    setFilteredUser(filterInv);
  }

  return (
    <>
      <main className="min-h-screen bg-black/90 pb-1">
        <div className="flex gap-4 items-center py-6 bg-white">
          <DrawerDash></DrawerDash>
          <p className="font-extrabold">Invitaciones</p>
        </div>
        <div className="w-10/12 mx-auto">
          <input
            type="text"
            onChange={searchInv}
            placeholder="Buscar"
            className="my-4 w-full rounded-lg border-0 p-2 text-center"
          />
        </div>
        <div className="w-11/12 mx-auto my-4">
          <div className="flex flex-col gap-2">
            {filteredUser.map((inv, key) => (
              <CardInvitation key={key} inv={inv}></CardInvitation>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Invitations;
