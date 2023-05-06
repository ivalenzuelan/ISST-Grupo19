
import React from 'react'; 
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/auth/login', {
          username,
          password,
        });
        const token = response.data.token;
        localStorage.setItem('token', token)
        // Guarda el token JWT en el estado de la aplicación o en las cookies del navegador
      } catch (error) {
        console.error(error);
      }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Iniciar sesión</button>
        </form>
        )
}
        