import { Link } from "react-router-dom";

export function ButtonBack() {
  return (
    <Link to="#" onClick={() => window.history.back()} className="bg-red-400 text-white px-6 py-4 rounded-md">
      <button>Volver</button>
    </Link>
  );
}
