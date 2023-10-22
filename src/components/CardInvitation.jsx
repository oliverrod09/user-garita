import {useContext} from "react";
import { Link } from "react-router-dom";
import { ContextMain } from "../context/ContextMain";

function CardInvitation({inv}) {
  const {formatDate} = useContext(ContextMain)

  const expire = formatDate(inv.expiresAt)
  const create = formatDate(inv.createdAt)


  return (
    <Link
      to={`/invitation/${inv.id}`}
      className="w-full bg-white border-2 rounded-md flex items-center gap-4 py-4 duration-200 hover:bg-blue-gray-100"
    >
      <span></span>
      <div className="flex gap-2">
        <p className="font-bold">{inv.name}</p>
        <p className="hidden md:block">{inv.cedula}</p>
      </div>
      <div>
        <p>creada: {create}</p>
        <p>expira: {expire}</p>
      </div>
    </Link>
  );
}

export default CardInvitation;
