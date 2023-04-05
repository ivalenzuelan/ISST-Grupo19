import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'primereact/button';


export default function Inicio() {
  return (
    <div>
      <div className="inicio"> 
        <div className='texto_inicio'>
          <h1 id="titulo_inicio"> Integral Insurance</h1>
          <text className="descripcion_inicio"> En nuestro sitio web, podrás encontrar una amplia variedad de seguros para proteger tus bienes mas preciados, ya sea tu hogar, tu vehiculo o la empresa. Trabajamos con las mejores compañias del mercado para ofrecerte las mejores opciones y garantizar la tranquilidad que necesitas</text>
          <Link to="/seguros"><Button className='register_button' > VER SEGUROS</Button></Link>
        </div>
        <div>
          <img className='image_inicio' src={process.env.PUBLIC_URL + "/fondo4.png"} />
        </div>
      </div>
      <div id='marcas_colab'>
        <h4 className='marcas_text'> Colaboramos con las marcas mas populares</h4>
        <div className = 'marcas_imagenes'>
        <img className='image_marca' src={process.env.PUBLIC_URL + "/mapfre.jpg"} /> 
        <img className='image_marca' src={process.env.PUBLIC_URL + "/reale.png"} /> 
        <img className='image_marca' src={process.env.PUBLIC_URL + "/zurich.png"} /> 
        <img className='image_marca' src={process.env.PUBLIC_URL + "/pelayo.png"} /> 
        <img className='image_marca' src={process.env.PUBLIC_URL + "/active.png"} /> 
        <img className='image_marca' src={process.env.PUBLIC_URL + "/plus.png"} /> 
        </div>

      </div>
    </div>
  );
}
