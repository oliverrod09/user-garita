import { useState, useEffect, useContext } from "react";
import { Card, Button, Typography, Alert } from "@material-tailwind/react";
import axios from "axios";
import { Navigate, Link } from "react-router-dom";
import { back } from "../const/urls";
import { ContextMain } from "../context/ContextMain";

function Register() {
  const { setAuth, auth } = useContext(ContextMain);
  const [alertOk, setAlertOk] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [serverError, setServerError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cedula: "",
    residenceIdenti: "",
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  function handdleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handdleSubmit() {
    const url = `${back}/users/`;
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const response = await axios.post(url, user, config);
      if (response.status === 201) {
        setAlertOk(true);
        setUser({
          name: "",
          email: "",
          password: "",
          cedula: "",
          residenceIdenti: "",
        });
      }
    } catch (error) {
      setAlertError(true);
      setServerError(error.response.data.message);
      console.log(error.response.data.message); // Aquí deberías poder acceder al mensaje de error
    }
  }
  if (auth == true) {
    return <Navigate to={"/dashboard"}></Navigate>;
  }
  return (
    <>
      <main className="min-h-screen w-full flex justify-center items-center bg-black/90 py-1">
        <Alert
          color="green"
          open={alertOk}
          onClose={() => setAlertOk(false)}
          className="fixed z-50 top-4 right-4 w-max"
        >
          Registrado correctamente
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
          className="w-11/12 md:w-max py-4 px-8 rounded-md my-8 mx-auto bg-white shadow-lg shadow-white"
        >
          <h2 className="text-3xl">Crear Usuario</h2>
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
                  value={user.name}
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
                  value={user.cedula}
                />
              </div>
              <div className="flex flex-col">
                <label className="" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="p-4 rounded-lg border-gray-300 border-2"
                  onChange={handdleChange}
                  value={user.email}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:justify-center gap-4 my-4">
              <div className="flex w-full md:w-6/12 flex-col">
                <label className="" htmlFor="password">
                  Contraseña
                </label>
                <input
                  type="text"
                  name="password"
                  className="p-4 rounded-lg border-gray-300 border-2"
                  onChange={handdleChange}
                  value={user.password}
                />
              </div>
              <div className="flex w-full md:w-6/12 flex-col">
                <label className="" htmlFor="residenceIdent">
                  Identificador de residencia
                </label>
                <input
                  type="text"
                  name="residenceIdenti"
                  className="p-4 rounded-lg border-gray-300 border-2"
                  onChange={handdleChange}
                  value={user.residenceIdenti}
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            className="w-full rounded-lg my-6 bg-black py-4 px-8 text-white"
            onClick={handdleSubmit}
          >
            Crear
          </button>
          <Link to={"/"} className="decoration-black decoration-1 underline">If you already have an account, you can login here</Link>
        </form>
      </main>
    </>
  );
}

export default Register;
