import {useState, useEffect} from "react"
import { useParams} from 'react-router-dom';
import {SeguroService} from '../service/segurosservice'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { InputText } from "primereact/inputtext";
 
export default function SegurosTipo(props){ 
 
    let {tipo} = useParams();
    const [filtro, setFiltro]=useState(null);
    const [seguro, setSeguro] = useState(props.losseguros);
    const [seguro2, setSeguro2] = useState(null);
    const url = new SeguroService();
 
    if((props.losseguros.length > seguro.length) && seguro2===null){
        setSeguro2(seguro);
    }
  
    const callServer = async (param) =>{
          await url.getTipo(tipo).then(data => {
            const result = ({seguros: data})
            setSeguro(result.seguros)
          })

      }
 
  
    useEffect(() => {
        async function fetchData() {    
          await callServer();
            setTimeout(()=>{
            },30);      
        }
        fetchData();
      }, []);
 
      const filtrar=()=>{
        if(filtro===""){
            setSeguro(seguro2);
        }
        else{
            setSeguro(seguro.filter(seguro => seguro.nombre.toLowerCase().includes(filtro)))
        }
    }
 
    return <div id='seguro_por_tipo'>  
                <div id="seccion">
            <div >
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText id="filtro" placeholder="Buscar seguros" onChange={e=>setFiltro(e.target.value)}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                            filtrar();
                            }
                        }}/>
                </span>
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardGroup>
            {seguro.map((item,index)=>(
                <div key={item.id} className="lista_seguro" >
                    <Card style={{ width: '18rem', border: '1px solid rgb(72, 87, 117)', borderRadius: '8px'}}>
                    <h5 class="card-header">{ item.aseguradora}</h5>
                     <div class="card-body">
                        <Card.Title class="card-title">{item.nombre}</Card.Title>
                        <p class="card-text"> {item.descripción}</p>
                        <p class="card-text"> Precio: {item.precio}</p>
                        <p class="card-text"> Periodo: {item.periodicidad}</p>
                        <a href="#" class="btn btn-primary">Mas información</a>
                     </div>
                    </Card>
                </div>
             ))}
        </CardGroup>
            
        </div>
    </div>
 
}