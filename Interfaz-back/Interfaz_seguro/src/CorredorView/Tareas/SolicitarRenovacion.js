import {useState, useEffect} from "react"     
import "primereact/resources/themes/lara-light-indigo/theme.css";        
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  
import 'primeflex/primeflex.css';

import { Checkbox } from 'primereact/checkbox';
import {Card} from 'primereact/card'
import { Button } from 'primereact/button';
import {SeguroService} from '../../service/segurosservice'
        
                                                      

export default function SolicitarRenovacion(props){ 

    const [polizasRenovar, setPolizasRenovar] = useState(props.renovacion)
    const url = new SeguroService()

    const quitarRenovacion = (poliza) =>{
        setTimeout(() => {
        console.log(poliza.value);
        poliza.value.renovar=false;
        console.log(poliza.value);
        url.editPoliza(poliza.value).then( data =>{
            deletePoliza(polizasRenovar, poliza.value.id)
        })
    }, 300);
    }

    const deletePoliza = (polizas, id) => {
        const updatedPolizas = polizas.filter(poliza => poliza.id !== id);
        setPolizasRenovar(updatedPolizas);
    };

    return  <div>
            <div className="card flex " style={{width:"400px"}}>
             <div className="flex flex-column gap-3"></div>
                {polizasRenovar.map((item,index)=>(
                    <Card title={item.cliente.nombre}>
                    <div className="p-field-checkbox">
                    {console.log(item)}
                        <Checkbox id={item.id} value={item} onChange={quitarRenovacion} />
                            <label htmlFor={item.id} className="p-checkbox-label">
                                <p><b>Fecha de termino:</b> {item.termino}</p>
                                <p><b>Seguro:</b> {item.seguro.nombre}- {item.seguro.aseguradora}</p>
                                <p><b>Contacto:</b> {item.cliente.mail}</p>
                            </label>
                    </div>
                                             
                </Card>
             ))}
             </div>   
            </div>   
}

