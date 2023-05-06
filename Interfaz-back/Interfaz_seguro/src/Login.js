
import React from 'react'; 
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
 
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/api/auth/signin', {
          mail,
          password,
        });
        const token = response.data.accessToken;
        // Guarda el token JWT en el estado de la aplicación o en las cookies del navegador
      } catch (error) {
        console.error(error);
      }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="mail" placeholder="Correo electrónico" onChange={(e) => setMail(e.target.value)} />
            <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Iniciar sesión</button>
        </form>
        )
}
        