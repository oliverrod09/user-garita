import { useState, useContext, useEffect } from "react";
import { DrawerDash } from "../components/DrawerDash";
import { ContextMain } from "../context/ContextMain";
import { Navigate } from "react-router-dom";
import Axios from "axios";
import Select from "react-select";
import { back } from "../const/urls";
import { Alert } from "@material-tailwind/react";

function Addinvitation() {
  const { auth } = useContext(ContextMain);
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [serverError, setServerError] = useState("")
  const [invitation, setInvitation] = useState({
    name: "",
    cedula: "",
    cellphone: "",
    board: "",
    description: "",
    expiresAt: 300,
  });
  const options = [
    { value: 15, label: "15 minutos" },
    { value: 30, label: "30 minutos" },
    { value: 60, label: "1 hora" },
    { value: 120, label: "2 horas" },
    { value: 180, label: "3 horas" },
    { value: 300, label: "5 horas" },
  ];
  useEffect(() => {
    console.log(invitation);
  }, [invitation]);

  if (!auth) {
    return <Navigate to={"/"}></Navigate>;
  }

  function handdleSelect(e) {
    setInvitation((prevInvitation) => ({
      ...prevInvitation,
      expiresAt: e.value,
    }));
  }

  function handdleChange(e) {
    setInvitation({ ...invitation, [e.target.name]: e.target.value });
  }

  async function handdleSubmit() {
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const url = `${back}/invitations/`;
    try {
      const response = await Axios.post(url, invitation, config);
      if (response.status === 201) {
        setInvitation({
            name:"", cedula:"", cellphone:"", board:"", description:"", expiresAt:300
          })
        setAlertOk(true)
      }
    } catch (error) {
        setServerError(error.response.data.message)
        setAlertError(true)
        console.log(error.response.data.message)
    }

  }

  return (
    <>
      <main className="min-h-screen bg-black/90 pb-1">
        <div className="flex gap-4 items-center py-6 bg-white px-4">
          <DrawerDash></DrawerDash>
          <p className="font-extrabold">Crear invitación</p>
        </div>


        <Alert
          color="green"
          open={alertOk}
          onClose={() => setAlertOk(false)}
          className="fixed z-50 top-4 right-4 w-max"
        >
          Agregado correctamente
        </Alert>

        <Alert
          color="red"
          open={alertError}
          onClose={() => setAlertError(false)}
          className="fixed z-50 top-4 right-4 w-max"
        >
          {serverError}
        </Alert>

        <form
          action=""
          className="w-max py-4 px-8 rounded-md mt-8 mx-auto bg-white shadow-lg shadow-white"
        >
          <h2 className="text-3xl">Crear una invitacion</h2>
          <div className="">
            <div className="flex flex-col md:flex-row gap-4 my-4">
              <div className="flex flex-col">
                <label className="" htmlFor="name">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  className="p-4 rounded-lg border-gray-300 border-2"
                  onChange={handdleChange}
                  value={invitation.name}
                />
              </div>
              <div className="flex flex-col">
                <label className="" htmlFor="cedula">
                  Cedula
                </label>
                <input
                  type="text"
                  name="cedula"
                  className="p-4 rounded-lg border-gray-300 border-2"
                  onChange={handdleChange}
                  value={invitation.cedula}
                />
              </div>
              <div className="flex flex-col">
                <label className="" htmlFor="cellphone">
                  Telefono
                </label>
                <input
                  type="text"
                  name="cellphone"
                  className="p-4 rounded-lg border-gray-300 border-2"
                  onChange={handdleChange}
                  value={invitation.cellphone}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-center gap-4 my-4">
              <div className="flex w-full md:w-6/12 flex-col">
                <label className="" htmlFor="board">
                  Placa
                </label>
                <input
                  type="text"
                  name="board"
                  className="p-4 rounded-lg border-gray-300 border-2"
                  onChange={handdleChange}
                  value={invitation.board}
                />
              </div>
              <div className="flex w-full md:w-6/12 flex-col">
                <label className="" htmlFor="expiresAt">
                  Expira en:
                </label>
                <Select
                defaultValue={options[6]}
                  options={options}
                  onChange={handdleSelect}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                      ...theme.colors,
                      primary25: "darkgray",
                      primary: "black",
                    },
                  })}
                  className="p-2 rounded-lg border-gray-300 border-2 focus:border-black"
                ></Select>
                {/* <label className="" htmlFor="expiresAt">Fecha</label>
                <input type="date" name="expiresAt" className="p-4 rounded-lg border-gray-300 border-2" /> */}
              </div>
            </div>
            <div>
              <label htmlFor="description">Descripción</label>
              <textarea
                name="description"
                className="w-full border-gray-300 border-2 rounded-lg"
                rows={5}
                onChange={handdleChange}
                value={invitation.description}
              ></textarea>
            </div>
          </div>
          <button
            type="button"
            className="w-full rounded-lg bg-black py-4 px-8 text-white"
            onClick={handdleSubmit}
          >
            Crear
          </button>
        </form>
      </main>
    </>
  );
}

export default Addinvitation;
