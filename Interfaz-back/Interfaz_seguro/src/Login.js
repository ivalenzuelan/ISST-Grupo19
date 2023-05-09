
import React from 'react'; 
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {SeguroService} from './service/segurosservice';
import { Toast } from 'primereact/toast';

export default function Login() {
 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [logged, setLogged] = useState(false);
    const navigate = useNavigate();
    const toast = useRef(null)
    const url = new SeguroService()

    const callServerParaID = (nombre) => {
      url.getIdUser(nombre).then(data => {
        const id = data.id;  
        localStorage.setItem('', id);
      });
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('https://34.175.88.214:8443/auth/login', {
          username,
          password,
        });

        const idResponse = await axios.get('https://34.175.88.214:8443/idClienteus/'+ response.data.nombreUsuario)
        const token = response.data.token;
        localStorage.setItem('token', token);
        const rol = response.data.authorities[0] ? response.data.authorities[0].authority : '';
        localStorage.setItem('rol', rol);
        const nombreUsuario = response.data.nombreUsuario;
        localStorage.setItem('nombreUsuario', nombreUsuario);
        const id = idResponse.data.id;
        localStorage.setItem('id', id);
        setLogged(true)
        navigate('/');
        // Guarda el token JWT en el estado de la aplicación o en las cookies del navegador
      } catch (error) {
        toast.current.show({severity:'error', summary: 'Error', detail: 'Error en usuario/clave', life: 3300, closable: false});
        console.error(error);
        setTimeout(()=>{
          window.location.reload();
        },1000);		
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
                <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto" type="submit"></Button>
            </div>
          </div>
        </form>
        </div>
    )
}
        