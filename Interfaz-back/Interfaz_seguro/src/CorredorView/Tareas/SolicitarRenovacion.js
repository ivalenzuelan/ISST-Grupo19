import {useState, useEffect} from "react"     
import "primereact/resources/themes/lara-light-indigo/theme.css";        
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  
import 'primeflex/primeflex.css';

import { Checkbox } from 'primereact/checkbox';
import {Card} from 'primereact/card'
import { TabView, TabPanel } from 'primereact/tabview';

        
        
                                                      

export default function SolicitarRenovacion(props){ 

    const [polizasRenovar, setPolizasRenovar] = useState(props.renovacion)

    return  <div>
               {polizasRenovar.map((item,index)=>(
                    <Card title={item.cliente.nombre}>
                    <p>
                        <p><b>Fecha de termino:</b> {item.termino}</p>
                        <p><b>Seguro:</b> {item.seguro.nombre}- {item.seguro.aseguradora}</p>
                        <p><b>Contacto:</b> {item.cliente.mail}</p>               
                    </p>
                </Card>
             ))}
             </div>       
}

