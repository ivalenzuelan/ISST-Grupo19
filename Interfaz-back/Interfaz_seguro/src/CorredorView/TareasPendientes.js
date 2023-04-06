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

<div className="card">
            <TabView>
                <TabPanel header="Header I" leftIcon="pi pi-calendar mr-2">
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </TabPanel>
                <TabPanel header="Header II" rightIcon="pi pi-user ml-2">
                    <p className="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui 
                        ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
                </TabPanel>
                <TabPanel header="Header III" leftIcon="pi pi-search mr-2" rightIcon="pi pi-cog ml-2">
                    <p className="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti 
                        quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                        culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. 
                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </TabPanel>
            </TabView>
        </div>