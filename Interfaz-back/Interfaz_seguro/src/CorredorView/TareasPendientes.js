import {useState, useEffect} from "react"
import { useParams} from 'react-router-dom';
import {SeguroService} from '../service/segurosservice'
import { MDBCardText } from 'mdb-react-ui-kit';
import "primereact/resources/themes/lara-light-indigo/theme.css";        
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import CitasClientes from "./CitasClientes";
                                                      

export default function TareasPendientes(props){ 

    const [polizasRenovar, setPolizasRenovar] = useState({})
    const [polizasAnular, setPolizasAnular] = useState({})
    const [clientesConCita, setClientesConCita] = useState({})

    const url = new SeguroService()

    const callServerClientesConCita = async (param) =>{
      await url.getClientesConCita().then(data => {
        setClientesConCita({clientesConCita: data})   
      })
  }
  
    useEffect(() => {
        function fetchData() {	
          callServerClientesConCita();
          setTimeout(()=>{

            },100);          
          }
          fetchData();
    }, []);
    

    
    return  <div className="lista_seguro"> 
                {(clientesConCita.clientesConCita) ? 
                <div>        
                    <CitasClientes clientesCita={clientesConCita.clientesConCita}/>   
                </div> 
                    :
                    <p> Algo ha falaldo en el servidor intentelo de nuevo</p>    
                }    
            </div>
}