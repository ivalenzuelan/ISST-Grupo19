import { MDBTextArea } from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';

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
<div className="seguros">
  {tipos_seguro.map((item,index)=>(
    <Card style={{ width: '18rem', height: '500px', border: '4px solid black', borderRadius: '8px'}}>
  <Card.Img style={{ height:'200px', width:MDBTextArea }} variant="top" src={process.env.PUBLIC_URL + item.imagen} />
  <Card.Body style={{ background: "white", height: "250px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
    <Card.Title style={{ color: 'rgb(72, 87, 117)'}}>{item.tipo}</Card.Title>
    <Card.Text style={{ color: "black"}}>{item.descripción}</Card.Text>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link to={"/seguros/tipo/" + (item.tipo)}>
         <button className='register_button'>Ver seguros</button>
        </Link>
        </div>
    </Card.Body>
    </Card>

  ))}
</div>

    
    )
}