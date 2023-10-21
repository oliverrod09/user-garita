import { useState, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './pages/Login';
import Invitations from './pages/Invitations';
import DetailsInv from './pages/DetailsInv';
import { ContextMain } from "./context/ContextMain";



function App() {
  const {x} = useContext(ContextMain)
  const [count, setCount] = useState(0)
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/invitations' element={<Invitations></Invitations>}></Route>
        <Route path='/invitation/:id' element={<DetailsInv></DetailsInv>}></Route>
      </Routes>
    </Router>
      
    </>
  )
}

export default App
