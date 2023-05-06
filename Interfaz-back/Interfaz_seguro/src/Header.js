import { Link } from "react-router-dom"
import { Button } from "primereact/button"
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Header (){
    

  const navigate = useNavigate();


  const [loggedOut, setLoggedOut] = useState(false);
  const jwt = localStorage.getItem('token')
  const rol = localStorage.getItem('rol')
  console.log(rol)

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedOut(true);
  }


    return(
    
        <div>
        {jwt ?
        <div>
        {rol == "ROLE_USER" ?
    
            <div className="buttons">
                <div className="general_buttons">
                    <Link to ="/segurosCorredor"><Button className="general_button" label="Seguros Ofrecidos" text raised /></Link>
                    <Link to ="/tareasCorredor"><Button className="general_button" label="Tareas" text raised /></Link>
                    <Link to ="/clientesCorredor"><Button className="general_button" label="Clientes" text raised /></Link>
                    <Link to ="/seguros"><Button className="general_button" label= "Seguros" text raised/></Link>
                </div>
                <div className="register_buttons">
                    <Button className="register_button" onClick={handleLogout} text raised > Log Out </Button>
                </div>
            </div>  
            :
            <div>
            <div className="buttons">
                <div className="general_buttons">
                    
                    <Link to ="/clientes/:id"><Button className="general_button" label="Mi informacion" text raised /></Link>
                    <Link to ="/seguros"><Button className="general_button" label= "Seguros" text raised/></Link>
                </div>
                <div className="register_buttons">
                    <Button className="register_button" onClick={handleLogout} text raised > Log Out </Button>
                </div>
            </div>
            </div>
            }
            </div>     
        :
        <div className="header_integral">
            <div className="logo_image">
                <Link to="/"><img className="logo" src={process.env.PUBLIC_URL + "/logo.png"} alt="logo" /></Link>
            </div>
            <div className="buttons">
                <div className="general_buttons">
                    <Link to="/login"><Button className="general_button" label="Solicitar Cita" text raised disabled/></Link>
                    <Link to ="/seguros"><Button className="general_button" label= "Seguros" text raised/></Link>
                </div>
                <div className="register_buttons">
                    <Button className="register_button" text raised disabled> Sing In </Button>
                    <Link to ="/login"><Button  className="register_button" > Log In </Button></Link>
                </div>
            </div>
        </div>
        }
        </div>
    )
}
