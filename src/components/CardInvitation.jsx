import React from "react";
import { Link } from "react-router-dom";

function CardInvitation({inv}) {
  return (
    <Link
      to={`/invitation/${inv.id}`}
      className="w-full border-2 rounded-md flex gap-4 py-4"
    >
      <span></span>
      <div className="flex gap-2">
        <p className="font-bold">{inv.name}</p>
        <p>{inv.cedula}</p>
      </div>
    </Link>
  );
}

export default CardInvitation;
