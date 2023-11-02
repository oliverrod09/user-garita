import { useContext } from "react";
import { Link } from "react-router-dom";
import { ContextMain } from "../context/ContextMain";

function CardInvitation({ inv }) {
  const { formatDate } = useContext(ContextMain);

  const expire = formatDate(inv.expiresAt);
  const create = formatDate(inv.createdAt);

  return (
    <Link
      to={`/invitation/${inv.id}`}
      className="w-full bg-white border-2 rounded-md flex items-center gap-4 py-4 duration-200 hover:bg-blue-gray-100"
    >
      <span></span>
      <div className="flex gap-2 w-3/6 lg:w-52">
        <p className="font-bold text-sm line-clamp-2 w-full lg:w-auto">
          {inv.name}
        </p>
      </div>
      <div className="w-full lg:w-64 overflow-hidden">
        <p className="text-black text-xs lg:text-sm line-clamp-2">
          {inv.description}
        </p>
      </div>
      <div className="hidden lg:w-20 lg:block">{inv.used ? <span>Usada</span> : <span>No usada</span>}</div>
      <div className="hidden lg:block">
        <p>creada: {create}</p>
        <p>expira: {expire}</p>
      </div>
    </Link>
  );
}

export default CardInvitation;
