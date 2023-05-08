import {useState, useEffect} from "react"

import {SeguroService} from '../service/segurosservice'

           
        
import "primereact/resources/themes/lara-light-indigo/theme.css";        
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  
import 'primeflex/primeflex.css';
import SolicitarRenovacion from "./Tareas/SolicitarRenovacion";
import SolicitarAnulacion from "./Tareas/SolicitarAnulacion";
import CitasClientes from "./Tareas/CitasClientes";
import PolizasSinSolicitud from "./Tareas/PolizasSinSolicitud";
import { TabView, TabPanel } from 'primereact/tabview';
import NoAcces from './../NoAcces'

                                                      

export default function TareasPendientes(props){ 

    const [polizasRenovar, setPolizasRenovar] = useState({})
    const [polizasAnular, setPolizasAnular] = useState({})
    const [clientesConCita, setClientesConCita] = useState({})
    const [polizasSinSolicitud, setPolizasSinSolicitud] = useState({})
    const rol = localStorage.getItem('rol')


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

    const callServerPolizasSinSolicitud = async (param) =>{
      await url.getPolizasSinSolicitud().then(data => {
        setPolizasSinSolicitud({polizasSinSolicitud: data})   
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
          callServerPolizasSinSolicitud();
          setTimeout(()=>{
              
            },100);    
        }
        fetchData();
    }, []);
    

    
    return  <div className="lista_seguro"> 
    {rol == "ROLE_ADMIN" ?   
    <div>
    {(polizasRenovar.polizasRenovar && polizasAnular.polizasAnular && clientesConCita.clientesConCita && polizasSinSolicitud.polizasSinSolicitud) ? 
    
    <div className="card">
   
        <TabView title="¡Bienvenido a su lista de tareas!">
                <TabPanel header="Renovar pólizas" leftIcon="pi pi-refresh mr-2">
                    <SolicitarRenovacion renovacion={polizasRenovar.polizasRenovar}/>  
                </TabPanel>
                <TabPanel header="Anular pólizas" leftIcon="pi pi-times mr-2">
                    <SolicitarAnulacion anulacion={polizasAnular.polizasAnular}/> 
                </TabPanel>
                <TabPanel header="Pólizas que caducan pronto" leftIcon="pi pi-clock mr-2">
                    <PolizasSinSolicitud polizasNoSolicitud={polizasSinSolicitud.polizasSinSolicitud}/>
                </TabPanel>
                <TabPanel header="Visitas pendientes" leftIcon="pi pi-calendar mr-2">
                    <CitasClientes clientesCita={clientesConCita.clientesConCita}/>
                </TabPanel>
            </TabView>
    </div> 
        :
        <p> Algo ha fallado en el servidor intentelo de nuevo</p>    
    } 
    </div>
    :
    < NoAcces />
    }   
        </div>
}
