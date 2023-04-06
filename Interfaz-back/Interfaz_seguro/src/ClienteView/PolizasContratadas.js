import {useState, useEffect} from "react"
import Form from 'react-bootstrap/Form';
import { MDBCardText } from 'mdb-react-ui-kit';
import { useParams} from 'react-router-dom';
import {SeguroService} from '../service/segurosservice'

import { Menubar } from 'primereact/menubar';  
        
           
        
import "primereact/resources/themes/lara-light-indigo/theme.css";        
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  
import 'primeflex/primeflex.css';
        

                                               
        

export default function PolizasContratadas(props){ 

    let {id} = useParams()
    const [cliente, setCliente] = useState({});
    const [polizas, setPolizas] = useState({})
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const items =[
        {
            label: 'Modificar datos',
            icon: 'pi pi-fw pi-pencil',
            command: () => {alert('Edited')}
        },
    ]

    const url = new SeguroService()

    const callServer = async (param) =>{
        await url.getCliente(id).then(data => {
          setCliente(data)   
        })
    }
    const callServerPoliza = async (param) =>{
        await url.getPolizasCliente(id).then(data => {
          setPolizas({polizas: data})   
        })
    }
  
    useEffect(() => {
        function fetchData() {	
        callServerPoliza();
        setTimeout(()=>{
            setLoading(false);
          },100);	
        callServer();
        setTimeout(()=>{
            setLoading(false);
          },100);	          
        }
        fetchData();
    }, []);
    

    
    return  <div className="lista_seguro">
            <Menubar model={items} /> 
                <div key={cliente.id} class="card" className="lista_seguro" style={{height:MDBCardText, width: '800px', textAlign:'justify' }}>
                    <h5 class="card-header">{ cliente.nombre} {cliente.apellidos}</h5>
                    <div class="card-body">
                        <h5 class="card-title">{cliente.username}</h5>
                        <p class="card-text"> {cliente.mail}</p>
                        <p class="card-text"> {cliente.telefono} </p>
                    </div>     
                </div>
            {polizas.polizas ? <div>
                <h4>Polizas contratadas</h4>
                {polizas.polizas.map((item,index)=>(
                    <div key={item.id} class="card" className="lista_seguro" style={{height:MDBCardText, width: '800px', textAlign:'justify' }}>
                        <h5 class="card-header">{ item.seguro.nombre}- {item.seguro.aseguradora}</h5>
                        <div class="card-body">
                            <p class="card-title">Fecha inicio: {item.inicio}</p>
                            <p class="card-text">Fecha de expiración: {item.termino}</p>
                            <p class="card-text"> {item.precio} / {item.periodicidad}</p>
                            <button> Solicitar renovación </button>
                            <button> Solicitar anulación </button>
                        </div>
                    </div>
                 ))}
                </div>
                :
                <p> Algo ha fallado en el servidor. Intente de nuevo</p>
            }
                
            
        </div>
}
    
