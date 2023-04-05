import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function Inicio() {
  return (
    <div>
      <div className="inicio"> 
        <div className='texto_inicio'>
          <Card title="¡Bienvenido!">
            <p>
              En nuestro sitio web, podrás encontrar una amplia variedad de seguros para proteger tus bienes mas preciados, ya sea tu hogar, tu vehiculo o la empresa. Trabajamos con las mejores compañias del mercado para ofrecerte las mejores opciones y garantizar la tranquilidad que necesitas.
            </p>
            <p>
              ¡Crea una cuenta gratuita para ver nuestro <b>área de clientes</b> y solicitar una cita con el corredor!
              También puedes simplemente ojear los seguros haciendo click en "ver seguros":
            </p>
            <br/>
            <p className="card-footer-modified"style={{backgroundColor: 'transparent'}}>
              <Link to="/seguros">
                <Button className='register_button' label= "VER SEGUROS" raised/>
              </Link>
            </p>
          </Card>
          
        </div>
        <div>
          <img className='image_inicio' src={process.env.PUBLIC_URL + "/fondo4.png"} />
        </div>
      </div>
      <div id='marcas_colab'>
        <h4 className='marcas_text'> Mediamos con las compañías más punteras</h4>
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
