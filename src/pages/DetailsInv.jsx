import { useEffect, useState, useRef, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { back } from "../const/urls";
import { ContextMain } from "../context/ContextMain";

function DetailsInv() {
  const { id } = useParams();
  const {auth} = useContext(ContextMain)
  const [invitation, setInvitation] = useState({});
  const [expirationStatus, setExpirationStatus] = useState("");
  const containerRef = useRef(null);
  const [qrGenerated, setQrGenerated] = useState(false);

  if (!auth) {
    return <Navigate to={"/"}></Navigate>
  }

  useEffect(() => {
    if (invitation.cod && containerRef.current && !qrGenerated) {
      new QRCode(containerRef.current, invitation.cod);
      setQrGenerated(true);
    }
  }, [invitation, qrGenerated]);
  useEffect(() => {
    getInvitation();
  }, []);

  async function getInvitation() {
    try {
      const url = `${back}/invitations/${id}`;
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
        setInvitation(data);
        const backendDate = new Date(data.expiresAt); // Ajusta el formato de fecha según tu objeto de fecha del backend

        const currentDate = new Date();
        const timeDifference = Math.floor((backendDate - currentDate) / 60000);

        if (timeDifference > 0) {
          setExpirationStatus(`Tiene ${timeDifference} minutos restantes.`);
        } else {
          setExpirationStatus("Expirada");
        }
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  return (
    <>
      <div className="w-full flex min-h-screen items-center justify-center">
        <div className="rounded-md bg-blue-gray-400 py-5 px-8">
          <h2 className="text-white font-bold text-xl text-center my-7">
            Invitación
          </h2>
          <p>Nombre: {invitation.name}</p>
          <p>Cedula: {invitation.cedula}</p>
          <p>Placa: {invitation.board}</p>
          <p>Celular: {invitation.cellphone}</p>
          <p>
            Usada:{" "}
            {invitation.used ? <span>usada</span> : <span>no usada</span>}
          </p>
          <p>Time: {expirationStatus}</p>
          <p>Creada: {invitation.createdAt}</p>
          <p>Expira: {invitation.expiresAt}</p>
          <div ref={containerRef}></div>
        </div>
      </div>

    </>
  );
}

export default DetailsInv;
