import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Invitations() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    getInvitations();
  }, []);

  async function getInvitations() {
    try {
      const url = "http://localhost:3000/invitations/user";
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
      invitaciones
      <div className="flex flex-col gap-2">
        {user.map((inv, key) => (
          <Link to={`/invitation/${inv.id}`} key={key} className="w-full bg-blue-gray-300 rounded-md flex gap-4 py-4">
            <span>{key+1}.</span>
            <p>{inv.name}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Invitations;
