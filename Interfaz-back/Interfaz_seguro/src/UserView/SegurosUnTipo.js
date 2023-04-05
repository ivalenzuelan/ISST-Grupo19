import { MDBTextArea } from 'mdb-react-ui-kit';

import { Card } from 'primereact/card';
import {Link} from 'react-router-dom';
import { Button } from 'primereact/button';

const tipos_seguro = [
  {
    "tipo": "Vida",
    "descripción": "Protege a tu familia en caso de que algo te suceda. Con nuestro seguro de vida, puedes garantizar su bienestar y estabilidad financiera a largo plazo.",
    "imagen": "vida.png",
  },
  {
    "tipo": "Salud",
    "descripción": "Cuida de ti y de los tuyos con nuestro seguro de salud. Accede a los mejores servicios médicos y tratamientos sin preocuparte por los costos.",
    "imagen": "salud.png",
  },
  {
    "tipo": "Auto",
    "descripción": "Mantén tus vehículos protegidos con nuestro seguro de auto. Te ofrecemos la cobertura que necesitas para conducir con tranquilidad.",
    "imagen": "auto.png",
  },
  {
    "tipo": "Hogar",
    "descripción": "Tu hogar es uno de tus bienes más preciados. Con nuestro seguro de hogar, podrás protegerlo ante cualquier eventualidad y garantizar tu tranquilidad y la de tu familia.",
    "imagen": "hogar.png",
  },
  {
    "tipo": "Ahorro",
    "descripción": "Planifica tu futuro y el de tus seres queridos con nuestro seguro de ahorro. Te ayudamos a construir un patrimonio y asegurarte un retiro tranquilo.",
    "imagen": "ahorro.png",
  },
  {
    "tipo": "Viajes",
    "descripción": "Explora el mundo con tranquilidad gracias a nuestro seguro de viajes. Para que puedas disfrutar al máximo de tu experiencia.",
    "imagen": "viaje.png",
  },
];



export default function SegurosUnTipo(){
    return (
      <div className="seguros-container">
        {tipos_seguro.map((item,index)=>(
              <div className="seguros-item">
                  <Card title={item.tipo} footer={<Link to={"/seguros/tipo/" + (item.tipo)}><Button className='register_button' label="Ver seguros"/></Link>} header={<img alt="Card" src={item.imagen}/>}>
                      <p>
                        {item.descripción}
                      </p>
                  </Card>
              </div>
        ))}
      </div>

    
    )
}