import {useState, useEffect} from "react"     
import "primereact/resources/themes/lara-light-indigo/theme.css";        
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  
import 'primeflex/primeflex.css';

import { Checkbox } from 'primereact/checkbox';
import {Card} from 'primereact/card'
        
                                                      

export default function SolicitarAnulacion(props){ 

    const [polizasAnular, setPolizasAnular] = useState(props.anulacion)

    return  <div className="lista_seguro">
            <div>
                {polizasAnular.map((item,index)=>(
                    <Card title={item.cliente.nombre}>
                    <p>
                        <p><b>Fecha de termino:</b> {item.termino}</p>
                        <p><b>Seguro:</b> {item.seguro.nombre}- {item.seguro.aseguradora}</p>
                        <p><b>Contacto:</b> {item.cliente.mail}</p>               
                    </p>
                </Card>
             ))}
             </div>       
        </div>
}