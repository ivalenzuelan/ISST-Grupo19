import { MDBTextArea } from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';

const tipos_seguro = [ {
        "tipo": "Vida",
        "descripción": "Seguros de vida para toda la familia",
        "imagen": "vida.png",
    },
    {
       "tipo": "Salud",
        "descripción": "Seguros de salud para toda la familia",
        "imagen": "salud.png",
    },
    {
        "tipo": "Auto",
         "descripción": "Seguros de auto para todos tus vehiculos",
         "imagen": "auto.png",
     },
     {
        "tipo": "Hogar",
         "descripción": "Seguros de auto para todos tus vehiculos",
         "imagen": "hogar.png",
     },
     {
        "tipo": "Ahorro",
         "descripción": "Seguros de auto para todos tus vehiculos",
         "imagen": "ahorro.png",
     },
     {
        "tipo": "Viajes",
         "descripción": "Seguros de auto para todos tus vehiculos",
         "imagen": "viaje.png",
     },

]
export default function Lista(){
    return (
    <div className="seguros">
            {tipos_seguro.map((item,index)=>(
                    <Card style={{ width: '18rem'}}>
                        <Card.Img style = {{height:'200px', width:MDBTextArea}}variant="top" src={process.env.PUBLIC_URL + item.imagen} />
                        <Card.Body style={{background: "white"}}>
                            <Card.Title style={{color: 'rgb(72, 87, 117)'}}>{item.tipo}</Card.Title>
                            <Card.Text style={{color: "black"}}>{item.descripción}</Card.Text>
                            <Link to={"/seguros/" + (item.tipo)}><button className='register_button'>Ver seguros</button> </Link>
                        </Card.Body>
                    </Card>
             ))}

    </div>
    )
}