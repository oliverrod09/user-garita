import { Link } from "react-router-dom";

export function ButtonBack() {
  return (
    <Link to="#" onClick={() => window.history.back()} className="bg-red-400 text-white px-4 py-2 text-sm md:text-lg md:py-4 md:px-6 rounded-md">
      <button>Volver</button>
    </Link>
  );
}
