import {useState, useEffect} from "react";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Login() {
    const [user, setUser] = useState({
        email:"",
        password:""
    })
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
      console.log(user)
      
    }, [user])
    

    function handdleChange(e) {
        setUser({...user, [e.target.name]:e.target.value})
    }

    async function handdleSubmit() {
        try {
            const url = "http://localhost:3000/users/login"
            const config = { headers: { "Content-Type": "application/json" } }
            const response = await axios.post(url, user, config)

            if (response.status==200) {
                console.log(response.data.token)
                sessionStorage.setItem("token", response.data.token);
                setRedirect(true)
                
            }else{
                console.log(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    if (redirect == true) {
        return <Navigate to={"/invitations"}></Navigate>;
      }
  return (
    <>
    <div className="w-full flex justify-center items-center min-h-screen">
        <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Ingrese sus credenciales
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <input onChange={handdleChange} type="email" name="email" id="" placeholder="Email"/>
            <input onChange={handdleChange} type="password" name="password" id="" placeholder="Password"/>
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
