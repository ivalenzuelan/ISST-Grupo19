import {useState} from "react"     
import "primereact/resources/themes/lara-light-indigo/theme.css";        
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  
import 'primeflex/primeflex.css';

import { Checkbox } from 'primereact/checkbox';
import {Card} from 'primereact/card'
import {SeguroService} from '../../service/segurosservice'
        
                                                      

export default function PolizasSinSolicitud(props){ 

    const [polizasSinSolicitud, setPolizasSinSolicitud] = useState(props.polizasNoSolicitud)
    const url = new SeguroService()

    const quitarAnulacion = (poliza) =>{
        setTimeout(() => {
        poliza.value.anular=false;
        url.editPoliza(poliza.value).then( data =>{
            deletePoliza(polizasSinSolicitud, poliza.value.id)
        })
    }, 300);
    }

    const deletePoliza = (polizas, id) => {
        const updatedPolizas = polizas.filter(poliza => poliza.id !== id);
        setPolizasSinSolicitud(updatedPolizas);
    };

    return  <div>
            <div className="card flex " style={{width:"750px"}}>
             <div className="flex flex-column gap-3"></div>
                {polizasSinSolicitud.map((item,index)=>(
                    <Card title={item.cliente.nombre +" " +item.cliente.apellidos}>
                    <div className="p-field-checkbox">
                            <label htmlFor={item.id} className="p-checkbox-label">
                                <p><b>Fecha de termino:</b> {item.termino}</p>
                                <p><b>Seguro:</b> {item.seguro.nombre} - {item.seguro.aseguradora}</p>
                                <p><b>Contacto:</b> {item.cliente.mail}</p>
                            </label>
                    </div>
                                             
                </Card>
             ))}
             </div>   
            </div>   
}