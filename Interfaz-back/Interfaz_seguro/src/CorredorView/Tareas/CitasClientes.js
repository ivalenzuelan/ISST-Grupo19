import {useState } from "react"     
import "primereact/resources/themes/lara-light-indigo/theme.css";        
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  

import {SeguroService} from '../../service/segurosservice'

import {Card} from 'primereact/card'
import { Checkbox } from 'primereact/checkbox';


export default function CitasClientes(props){ 

    const [clientesConCita, setClientesConCita] = useState(props.clientesCita)
    const url = new SeguroService()
    
    const quitarCita = (cliente) =>{
        setTimeout(() => {
        cliente.value.cita=null;
        url.editCliente(cliente.value).then( data =>{
            deleteCliente(clientesConCita, cliente.value.id)
        })
    }, 300);
    }

    const deleteCliente = (clientes, id) => {
        const updatedClientes = clientes.filter(cliente => cliente.id !== id);
        setClientesConCita(updatedClientes);
      };  

    return <div>
               <div className="card flex " style={{width:"750px"}}>
             <div className="flex flex-column gap-3">
                <div></div>
                 {clientesConCita.map((item,index)=>(
                         <Card>
                            <div className="p-field-checkbox">
                            <Checkbox id={item.id} value={item} onChange={quitarCita} />
                            <label htmlFor={item.id} className="p-checkbox-label">
                                Visita de {item.nombre} {item.apellidos} <br /> Fecha: {item.cita}
                            </label>
                            </div>
                        </Card>
                    ))}
             </div>
         </div>
         </div> 
}
