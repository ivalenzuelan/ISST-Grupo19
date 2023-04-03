import {useState} from "react"
import Form from 'react-bootstrap/Form';
import { MDBCardText } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';

export default function SeguroTipo(props){ 
    
    console.log(props)
    const[seguro,setSeguro]=useState(props.losseguros)
    const [filtro,setFiltro]=useState(null)

    
    
    const filtrar=()=>{
       setSeguro(props.losseguros.filter(seguro => seguro.nombre.toLowerCase().includes(filtro)))
    }
    
    const categoria = props.losseguros.reduce((anterior,actual)=>{
        if(anterior.includes(actual.tipo)){
            return anterior;
        }else{
             return [...anterior,actual.tipo];
        }},[]);
    const filtrarCategoria=()=>{
        console.log(document.getElementById("selector").value)
        setSeguro(props.losseguros.filter(producto => producto.tipo.toLowerCase().includes(document.getElementById("selector").value)))
    }

    return <div id='seguro_por_tipo'>  
        <div id="seccion">
            <div id="SeccionFiltrar">
                <h5> Filtro por seguro </h5>
                <input id="filtro" type="string" placeholder="All" onChange={e=>setFiltro(e.target.value)}></input>
                <button id="buscador" onClick={()=>filtrar()}> Buscar </button> 
            </div>
            <div id="SeccionSelector">
                <h5> Selector por categorias </h5>
                <Form.Select id="selector" aria-label="Default select example" onChange={()=>filtrarCategoria()}>  
                    <option value="All" >All</option> 
                    {categoria.map((item) =>(
                        <option key={item} value={item}>{item}</option>
                    ))}
                </Form.Select>
            </div> 
        </div>
        <div className="lista_seguro">
            {seguro.map((item,index)=>(
                <div class="card" className="lista_seguro" style={{height:MDBCardText, width: '800px', textAlign:'justify' }}>
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
