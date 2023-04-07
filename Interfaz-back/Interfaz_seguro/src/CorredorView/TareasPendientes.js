import {useState, useEffect} from "react"
import { useParams} from 'react-router-dom';
import {SeguroService} from '../service/segurosservice'
import { MDBCardText } from 'mdb-react-ui-kit';
           
        
import "primereact/resources/themes/lara-light-indigo/theme.css";        
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  
import 'primeflex/primeflex.css';
import SolicitarRenovacion from "./Tareas/SolicitarRenovacion";
import SolicitarAnulacion from "./Tareas/SolicitarAnulacion";
import CitasClientes from "./Tareas/CitasClientes";
import { TabView, TabPanel } from 'primereact/tabview';
import { Tab } from "bootstrap";
        
                                                      

export default function TareasPendientes(props){ 

    const [polizasRenovar, setPolizasRenovar] = useState({})
    const [polizasAnular, setPolizasAnular] = useState({})
    const [clientesConCita, setClientesConCita] = useState({})

    const url = new SeguroService()


    const callServerPolizaRenovar = async (param) =>{
        await url.getPolizasRenovar().then(data => {
          setPolizasRenovar({polizasRenovar: data})   
        })
    }

    const callServerPolizaAnular = async (param) =>{
        await url.getPolizasAnular().then(data => {
          setPolizasAnular({polizasAnular: data})   
        })
    }

    const callServerClientesConCita = async (param) =>{
        await url.getClientesConCita().then(data => {
          setClientesConCita({clientesConCita: data})   
        })
    }
  
    useEffect(() => {
        function fetchData() {	
        callServerPolizaRenovar();
        setTimeout(()=>{
            
          },100);	
        callServerPolizaAnular();
        setTimeout(()=>{
            
          },100);	  
        callServerClientesConCita();
        setTimeout(()=>{
            
          },100);        
        }
        fetchData();
    }, []);
    

    
    return  <div className="lista_seguro"> 
    {(polizasRenovar.polizasRenovar && polizasAnular.polizasAnular && clientesConCita.clientesConCita) ? 
    
    <div className="card">
        {console.log(clientesConCita)}        
        <TabView>
                <TabPanel header="Renovar polizas" leftIcon="pi pi-calendar mr-2">
                    <SolicitarRenovacion renovacion={polizasRenovar.polizasRenovar}/>  
                </TabPanel>
                <TabPanel header="Anular Polizas" leftIcon="pi pi-calendar mr-2">
                    <SolicitarAnulacion anulacion={polizasAnular.polizasAnular}/> 
                </TabPanel>
                <TabPanel header="Citas Solicitadas" leftIcon="pi pi-calendar mr-2">
                    <CitasClientes clientesCita={clientesConCita.clientesConCita}/>
                </TabPanel>
            </TabView>
    </div> 
        :
        <p> Algo ha falaldo en el servidor intentelo de nuevo</p>    
    }    
        </div>
}
