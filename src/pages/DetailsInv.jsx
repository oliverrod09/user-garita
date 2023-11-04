import { useEffect, useState, useRef, useContext } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
  Alert,
} from "@material-tailwind/react";
import {
  PlusIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
  TrashIcon,
  ClockIcon,
  UserPlusIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { back } from "../const/urls";
import { ContextMain } from "../context/ContextMain";
import { DrawerDash } from "../components/DrawerDash";
import { ButtonBack } from "../components/ButtonBack";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";

function DetailsInv() {
  const { id } = useParams();
  const { auth, formatDate } = useContext(ContextMain);
  const [invitation, setInvitation] = useState({});
  const [expirationStatus, setExpirationStatus] = useState("");
  const containerRef = useRef(null);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [serverError, setServerError] = useState("");
  const [serverOk, setServerOk] = useState("");
  const [updateExample, setupdateExample] = useState({})

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


  const downloadImage = () => {
    const node = document.getElementById('capture'); // Identificador del contenedor que deseas capturar
    html2canvas(node).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, 'screenshot.png'); // Nombre de archivo de la imagen descargada
      });
    });
  };

  async function expiredInvitation() {
    try {
      const url = `${back}/invitations/${invitation.id}`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      const response = await axios.put(url, updateExample, config);
      if (response.status == 200) {
        setServerOk("Invitación actualizada");
        setAlertOk(true);
        getInvitation();
      }
    } catch (error) {
      setServerError(error.response.data.message);
      setAlertError(true);
    }
  }

  async function deleteInvitation() {
    try {
      const url = `${back}/invitations/${invitation.id}`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };
      const response = await axios.delete(url, config);
      if (response.status == 200) {
        console.log("invitacion eliminada");
        setServerOk("Invitacion eliminada");
        setAlertOk(true);
      }
    } catch (error) {
      console.log(error.response.data.message);
      setServerError(error.response.data.message);
      setAlertError(true);
    }
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
        <Alert
          color="green"
          open={alertOk}
          onClose={() => setAlertOk(false)}
          className="fixed z-50 top-4 right-4 w-max"
        >
          {serverOk}
        </Alert>

        <Alert
          color="red"
          open={alertError}
          onClose={() => setAlertError(false)}
          className="fixed z-50 top-4 right-4 w-max"
        >
          {serverError}
        </Alert>
        <div className="flex gap-4 items-center py-6 px-4 bg-white">
          <DrawerDash></DrawerDash>
          <p className="font-extrabold">Invitación</p>
        </div>
        {invitation.id ? (
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
                  <SpeedDialAction
                    className="h-16 w-16"
                    onClick={deleteInvitation}
                  >
                    <TrashIcon className="h-5 w-5" />
                    <Typography
                      color="blue-gray"
                      className="text-xs font-normal"
                    >
                      Eliminar
                    </Typography>
                  </SpeedDialAction>
                  <SpeedDialAction
                    className="h-16 w-16"
                    onClick={expiredInvitation}
                  >
                    <ClockIcon className="h-5 w-5" />
                    <Typography
                      color="blue-gray"
                      className="text-xs font-normal"
                    >
                      Expirar
                    </Typography>
                  </SpeedDialAction>
                  <SpeedDialAction className="h-16 w-16"
                  onClick={downloadImage}>
                    <UserPlusIcon className="h-5 w-5" />
                    <Typography
                      color="blue-gray"
                      className="text-xs font-normal"
                    >
                      Descargar
                    </Typography>
                  </SpeedDialAction>
                </SpeedDialContent>
              </SpeedDial>
            </div>

            <div id="capture" className="lg:rounded-md w-full md:w-auto bg-blue-gray-700 py-5 px-8 text-white">
              <h2 className=" font-bold text-center my-7 text-4xl md:text-5xl">
                Invitación
              </h2>
              <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-2">
                <div className="flex flex-col gap-8 items-center text-base md:text-lg">
                  <div className="flex flex-col items-center lg:items-start gap-4 ">
                    <p className="min-w-[150px] text-center lg:text-start">
                      Nombre:{" "}
                      <span className="block lg:inline-block">
                        {invitation.name}
                      </span>
                    </p>
                    <div className="justify-center items-center gap-x-8 flex gap-2">
                      <div>
                        <p className=" text-start">
                          Placa:{" "}
                          <span className=" lg:inline-block">
                            {invitation.board}
                          </span>
                        </p>
                        <p className=" text-start">
                          Celular:{" "}
                          <span className=" lg:inline-block">
                            {invitation.cellphone}
                          </span>
                        </p>
                        <p className=" text-start">
                          Cedula:{" "}
                          <span className=" lg:inline-block">
                            {invitation.cedula}
                          </span>
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 lg:mt-0">
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
                    
                  </div>
                  <div>
                    <p>Creada: {formatDate(invitation.createdAt)}</p>
                    <p>Expira: {formatDate(invitation.expiresAt)}</p>
                  </div>
                </div>
                <div className="mx-auto" ref={containerRef}></div>
              </div>
              <div className="mt-4 text-xs lg:text-sm w-4/5 px-4 mx-auto text-center lg:text-start">
                Descripción:{" "}
                <span className="block lg:inline-block">
                  {invitation.description}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full relative md:h-[calc(100vh-180px)] flex items-center justify-center md:my-10">
            <div className="absolute left-1 top-8 md:left-6 md:bottom-10 ">
              <ButtonBack></ButtonBack>
            </div>
            <div className="bg-blue-gray-400 p-10 mt-24 md:mt-0 rounded-xl flex justify-center items-center flex-col">
              <p className="text-3xl font-bold text-white">
                Invitacion no encontrada
              </p>
              <NoSymbolIcon className="w-24 h-24 text-white"></NoSymbolIcon>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default DetailsInv;
