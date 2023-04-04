import {useState, useEffect} from "react"
import Form from 'react-bootstrap/Form';
import { MDBCardText } from 'mdb-react-ui-kit';
import { useParams} from 'react-router-dom';
import {SeguroService} from '../service/segurosservice'

export default function SegurosTipo(props){ 

    let {tipo} = useParams()
    const [filtro,setFiltro]=useState(null)
    const [seguro, setSeguro] = useState(props.losseguros);
    const url = new SeguroService()
  
    const callServer = async (param) =>{
          await url.getTipo(tipo).then(data => {
            const result = ({seguros: data})
            setSeguro(result.seguros)
          })
          console.log(seguro)
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
       setSeguro(seguro.filter(seguro => seguro.nombre.toLowerCase().includes(filtro)))
    }
    
    /*const categoria = props.losseguros.reduce((anterior,actual)=>{
        if(anterior.includes(actual.tipo)){
            return anterior;
        }else{
             return [...anterior,actual.tipo];
        }},[]);
    const filtrarCategoria=()=>{
        console.log(document.getElementById("selector").value)
        setSeguro(props.losseguros.filter(producto => producto.tipo.toLowerCase().includes(document.getElementById("selector").value)))
    }*/

    return <div id='seguro_por_tipo'>  
        <div id="seccion">
            <div id="SeccionFiltrar">
                <h5> Filtro por seguro </h5>
                <input id="filtro" type="string" placeholder="All" onChange={e=>setFiltro(e.target.value)}></input>
                <button id="buscador" onClick={()=>filtrar()}> Buscar </button> 
            </div>
        </div>
        <div className="lista_seguro">
            {seguro.map((item,index)=>(
                <div key={item.id} class="card" className="lista_seguro" style={{height:MDBCardText, width: '800px', textAlign:'justify' }}>
                    <h5 class="card-header">{ item.aseguradora}</h5>
                    <div class="card-body">
                        <h5 class="card-title">{item.nombre}</h5>
                        <p class="card-text"> {item.descripción}</p>
                        <p class="card-text"> {item.precio} / {item.periodicidad}</p>
                        <a href="#" class="btn btn-primary">Mas información</a>
                    </div>
                </div>
             ))}
            
        </div>
    </div>

}
