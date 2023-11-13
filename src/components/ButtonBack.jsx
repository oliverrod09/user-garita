import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export function ButtonBack() {
  return (
    <>
    <div className="text-white p-2 rounded-md bg-red-500 cursor-pointer">
        <ArrowLeftIcon onClick={() => window.history.back()} className="md:w-5 md:h-5 w-4 h-4"></ArrowLeftIcon>
    </div>
    
    </>
      
  );
}
