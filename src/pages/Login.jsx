import {useState, useEffect, useContext} from "react";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Alert,
  } from "@material-tailwind/react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { back } from "../const/urls";
import { ContextMain } from "../context/ContextMain";

function Login() {
  const {setAuth, auth} = useContext(ContextMain)
    const [user, setUser] = useState({
        email:"",
        password:""
    })
    const [messageError, setMessageError] = useState("")
  const [alertError, setAlertError] = useState(false)
    const [redirect, setRedirect] = useState(false)
    

    useEffect(() => {
      console.log(user)
      
    }, [user])
    

    function handdleChange(e) {
        setUser({...user, [e.target.name]:e.target.value})
    }

    async function handdleSubmit() {
            const url = `${back}/users/login`
            const config = { headers: { "Content-Type": "application/json" } }
            try {
              const response = await axios.post(url, user, config);
              if (response.status === 200) {
                console.log(response.data.token);
                sessionStorage.setItem("token", response.data.token);
                setAuth(true)
                setRedirect(true);
              }
            } catch (error) {
              setAlertError(true)
              setMessageError((error.response.data.message))
              console.log(error.response.data.message); // Aquí deberías poder acceder al mensaje de error
            }
            
    }
    if (redirect == true || auth == true) {
        return <Navigate to={"/invitations"}></Navigate>;
      }
  return (
    <>
    <div className="w-full flex justify-center items-center min-h-screen bg-black/90">
      <Alert color="red" open={alertError} onClose={() => setAlertError(false)} className="fixed z-50 top-4 right-4 w-max">
        {messageError}
      </Alert>
    
        <Card color="transparent" shadow={false} className="border-2 border-black bg-white p-8">
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Ingrese sus credenciales
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <input onChange={handdleChange} className="border-2 border-gray-500 rounded-md p-2" type="email" name="email" placeholder="Email"/>
            <input onChange={handdleChange} className="border-2 border-gray-500 rounded-md p-2" type="password" name="password" placeholder="Password"/>
          </div>
          <Button className="mt-6" fullWidth onClick={handdleSubmit}>
            sign up
          </Button>
          
        </form>
      </Card>
    </div>
      
    </>
  );
}

export default Login;
