
import React from 'react'; 
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [logged, setLogged] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('https://localhost:8443/auth/login', {
          username,
          password,
        });
        console.log(response.data)
        const token = response.data.token;
        localStorage.setItem('token', token);
        const rol = response.data.authorities[0] ? response.data.authorities[0].authority : '';
        localStorage.setItem('rol', rol);
        const nombreUsuario = response.data.nombreUsuario;
        localStorage.setItem('nombreUsuario', nombreUsuario);
        setLogged(true)
        navigate('/');
        // Guarda el token JWT en el estado de la aplicación o en las cookies del navegador
      } catch (error) {
        console.error(error);
        console.log("errorrrr")
      }
    };


    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-column md:flex-row">
            <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">

                    <InputText id="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">

                    <InputText id="password" type="password"  placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto" type="submit"></Button>
            </div>
          </div>
        </form>
        </div>
    )
}
        