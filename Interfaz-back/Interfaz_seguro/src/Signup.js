import React from 'react'; 
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toast } from 'primereact/toast';


export default function Login() {
 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [nombre, setNombre] = useState('');

    const [respuesta, setRespuesta] = useState('');

    const toast = useRef(null)
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('https://localhost:8443/auth/nuevoUsuario', {
          username,
          nombre,
          mail,
          password,
        }).catch(error => {
          toast.current.show({severity:'error', summary: 'Error', detail:error.response.data, life: 3300, closable: false});
          setTimeout(2000)
          console.error(error.response.data);
          window.location.reload();
      });
        toast.current.show({severity:'success', summary: 'Success', detail:response.data, life: 3300, closable: false});
        setTimeout(2000)
        setRespuesta(response.data);
        // Redirect to the main page after a successful sign-up
        navigate('/login');
      } catch (error) {
      }
    };

    return (
      <div>
        <Toast ref={toast} />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-column md:flex-row">
            <div className="w-full md:w-5 flex flex-column align-items-s justify-content-center gap-3 py-5">
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                    <InputText id="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                    <InputText id="password" type="password"  placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                    <InputText id="nombre" type="text"  placeholder="Nombre" onChange={(e) => setNombre(e.target.value)}/>
                </div>
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                    <InputText id="email" type="email"  placeholder="Email" onChange={(e) => setMail(e.target.value)}/>
                </div>
                <Button label="Sign up" icon="pi pi-user" className="w-10rem mx-auto" type="submit" />
            </div>
          </div>
        </form>
        </div>
    )
}
