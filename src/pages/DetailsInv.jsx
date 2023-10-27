import { useEffect, useState, useRef, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import {
  PlusIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
  TrashIcon,
  ClockIcon,
  UserPlusIcon,
  NoSymbolIcon
} from "@heroicons/react/24/outline";
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
      <main className="min-h-screen relative bg-black/90 md:pb-1">
        <div className="flex gap-4 items-center py-6 bg-white">
          <DrawerDash></DrawerDash>
          <p className="font-extrabold">Invitación</p>
        </div>
        {invitation.name ? (
          <div className="w-full relative md:h-[calc(100vh-180px)] flex items-center justify-center md:my-10">
            {/* button back */}
            <div className="absolute left-1 top-8 md:left-6 md:bottom-10 ">
              <ButtonBack></ButtonBack>
            </div>
            {/* speed dial */}
            <div className="absolute md:bottom-0 bottom-4 right-8">
              <SpeedDial>
                <SpeedDialHandler>
                  <IconButton size="lg" className="rounded-full">
                    <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
                  </IconButton>
                </SpeedDialHandler>
                <SpeedDialContent>
                  <SpeedDialAction className="h-16 w-16">
                    <TrashIcon className="h-5 w-5" />
                    <Typography
                      color="blue-gray"
                      className="text-xs font-normal"
                    >
                      Eliminar
                    </Typography>
                  </SpeedDialAction>
                  <SpeedDialAction className="h-16 w-16">
                    <ClockIcon className="h-5 w-5" />
                    <Typography
                      color="blue-gray"
                      className="text-xs font-normal"
                    >
                      Expirar
                    </Typography>
                  </SpeedDialAction>
                  <SpeedDialAction className="h-16 w-16">
                    <UserPlusIcon className="h-5 w-5" />
                    <Typography
                      color="blue-gray"
                      className="text-xs font-normal"
                    >
                      Agregar
                    </Typography>
                  </SpeedDialAction>
                </SpeedDialContent>
              </SpeedDial>
            </div>

            <div className="rounded-md w-full md:w-auto bg-blue-gray-400/40 py-5 px-8 text-white">
              <h2 className=" font-bold text-center my-7 text-4xl md:text-5xl">
                Invitación
              </h2>
              <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-2">
                <div className="flex flex-col gap-8 items-center text-sm md:text-lg">
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
        ) : (
          <div className="w-full relative md:h-[calc(100vh-180px)] flex items-center justify-center md:my-10">
            <div className="absolute left-1 top-8 md:left-6 md:bottom-10 ">
              <ButtonBack></ButtonBack>
            </div>
            <div className="bg-blue-gray-400 p-10 mt-24 md:mt-0 rounded-xl flex justify-center items-center flex-col">
              <p className="text-3xl font-bold text-white">Invitacion no encontrada</p>
              <NoSymbolIcon className="w-24 h-24 text-white"></NoSymbolIcon>
            </div>
          </div>
          
        )}
      </main>
    </>
  );
}

export default DetailsInv;
