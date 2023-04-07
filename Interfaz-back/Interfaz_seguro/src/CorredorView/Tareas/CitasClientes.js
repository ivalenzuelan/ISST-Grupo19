import {useState, useEffect} from "react"     
import "primereact/resources/themes/lara-light-indigo/theme.css";        
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  

import {SeguroService} from '../../service/segurosservice'

import { Button } from 'primereact/button';
import {Card} from 'primereact/card'
import { TabView, TabPanel } from 'primereact/tabview';
                                                     

export default function CitasClientes(props){ 

    const [clientesConCita, setClientesConCita] = useState(props.clientesCita)

    console.log(clientesConCita)

    const url = new SeguroService()
    
    const quitarCita = (cliente) =>{
        console.log(cliente);
        cliente.cita=null;
        console.log(cliente);
        url.saveCliente(cliente).then( data =>{
            console.log(data)
        })
    }

    return <div>
  
            <h5> Visitas pendientes </h5>
             <div className="card flex " style={{width:"400px"}}>
             <div className="flex flex-column gap-3">
                <div></div>
                 {clientesConCita.map((cliente) => {
                     return (
                         <Card>
                            <Button icon="pi pi-check"/>
                             <label htmlFor={cliente.id} className="card-content">
                                 {"Visita de "+cliente.nombre+" "+cliente.apellidos+" el "+cliente.cita}
                             </label>
                        </Card>
                     );
                 })}
             </div>
         </div>
         </div> 
}
