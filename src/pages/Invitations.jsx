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
  const [invs, setInvs] = useState([]);
  const [filterInvLen, setFilterInvLen] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
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
        setInvs(data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const pagesInv = () => {
    if (search.length === 0) {
      return invs.slice(currentPage, currentPage + 5);
    }
    const filterInv = invs.filter((inv) => {
      return (
        inv.name.toLowerCase().includes(search) ||
        inv.description.toLowerCase().includes(search)
      );
    });
    // setFilterInvLen(filterInv.length)
    return filterInv.slice(currentPage, currentPage +5)
  };

  const nextPage = () => {
    const filterInv = invs.filter((inv) => {
      return (
        inv.name.toLowerCase().includes(search) ||
        inv.description.toLowerCase().includes(search)
      );
    });
    if (filterInv.length>currentPage+5) {
      setCurrentPage(currentPage + 5);
    }  
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 5);
    }
  };

  function searchInv(e) {
    setCurrentPage(0);
    setSearch(e.target.value);
    //    const inputValue = e.target.value.toLowerCase();
    //    const filterInv = invs.filter((inv) => {
    //      return (
    //        inv.name.toLowerCase().includes(inputValue) ||
    //        inv.description.toLowerCase().includes(inputValue)
    //      );
    //    });
    //    setFilterInv(filterInv);
  }

  return (
    <>
      <main className="min-h-screen bg-black/90 pb-1">
        <div className="flex gap-4 items-center py-6 px-4 bg-white">
          <DrawerDash></DrawerDash>
          <p className="font-extrabold">Invitaciones</p>
        </div>
        <div className="w-10/12 mx-auto">
          <input
            type="text"
            onChange={searchInv}
            value={search}
            placeholder="Buscar"
            className="my-4 w-full rounded-lg border-0 p-2 text-center"
          />
        </div>
        <div className="flex gap-4 w-max mx-auto">
          <button
            onClick={prevPage}
            className="bg-black border-white border-2 text-white p-3 rounded-lg"
          >
            anteriores
          </button>
          <button
            onClick={nextPage}
            className="bg-black border-white border-2 text-white p-3 rounded-lg"
          >
            siguientes
          </button>
        </div>
        <div className="w-11/12 mx-auto my-4">
          <div className="flex flex-col gap-2">
            {pagesInv().map((inv, key) => (
              <CardInvitation key={key} inv={inv}></CardInvitation>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Invitations;
