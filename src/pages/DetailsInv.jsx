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
import { DrawerDash } from "../components/DrawerDash";
import { ButtonBack } from "../components/ButtonBack";

function DetailsInv() {
  const { id } = useParams();
  const { auth, formatDate } = useContext(ContextMain);
  const [invitation, setInvitation] = useState({});
  const [expirationStatus, setExpirationStatus] = useState("");
  const containerRef = useRef(null);
  const [qrGenerated, setQrGenerated] = useState(false);

  useEffect(() => {
    if (invitation.cod && containerRef.current && !qrGenerated) {
      new QRCode(containerRef.current, invitation.cod);
      setQrGenerated(true);
    }
  }, [invitation, qrGenerated]);
  useEffect(() => {
    getInvitation();
  }, []);

  if (!auth) {
    return <Navigate to={"/"}></Navigate>;
  }

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
      <main className="min-h-screen relative bg-black/90 pb-1">
        <div className=" absolute left-1 bottom-4 md:left-6 md:bottom-10">
          <ButtonBack></ButtonBack>
        </div>
        
        <div className="flex gap-4 items-center py-6 bg-white">
          <DrawerDash></DrawerDash>
          <p className="font-extrabold">Invitación</p>
        </div>
        <div className="w-full flex items-center justify-center my-4 md:my-10">
          <div className="rounded-md bg-blue-gray-400/40 py-5 px-8 text-white">
            <h2 className=" font-bold text-center my-7 text-2xl md:text-5xl">
              Invitación
            </h2>
            <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-2">
              <div className="flex flex-col gap-8 text-sm md:text-lg">
                <div className="flex gap-4 ">
                  <div className="flex flex-col gap-2">
                    <p>Nombre: {invitation.name}</p>
                    <p>Placa: {invitation.board}</p>
                    <p>Celular: {invitation.cellphone}</p>
                    <p>Cedula: {invitation.cedula}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>
                      Usada:{" "}
                      {invitation.used ? (
                        <span>Usada</span>
                      ) : (
                        <span>No usada</span>
                      )}
                    </p>
                    <p>Tiempo: {expirationStatus}</p>
                  </div>
                </div>

                <div>
                  <p>Creada: {formatDate(invitation.createdAt)}</p>
                  <p>Expira: {formatDate(invitation.expiresAt)}</p>
                </div>
              </div>
              <div className="mx-auto" ref={containerRef}></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DetailsInv;
