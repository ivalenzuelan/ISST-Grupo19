import {useState, useEffect} from "react"
import Form from 'react-bootstrap/Form';
import { MDBCardText } from 'mdb-react-ui-kit';
import { useParams} from 'react-router-dom';
import {SeguroService} from '../service/segurosservice'

import { Menubar } from 'primereact/menubar';  
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
        
        
             
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";        
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";                                         
        

export default function SegurosCorredor(props){ 


    const [filtro,setFiltro]=useState(null)
    const [seguros, setSeguros] = useState(props.losseguros);
    const [seguro,setSeguro] = useState({
        id:0,
        nombre: null,
        tipo:null,
        descripcion: null,
        precio: null,
        periodicidad: null,
        aseguradora: null
    })
    const [visible, setVisible] = useState(false);
    const items =[
        {
            label: 'Nuevo',
            icon: 'pi pi-fw pi-plus',
            command: () => {showSaveDialog()}
        },
        {
            label: 'Editar',
            icon: 'pi pi-fw pi-pencil',
            command: () => {alert('Edited')}
        },
        {
            label: 'Eliminar',
            icon: 'pi pi-fw pi-trash',
            command: () => {alert('Deleted')}
        },

    ]
    const url = new SeguroService()
  
    const filtrar=()=>{
       setSeguros(seguros.filter(seguro => seguro.nombre.toLowerCase().includes(filtro)))
    }
    
    const categoria = props.losseguros.reduce((anterior,actual)=>{
        if(anterior.includes(actual.tipo)){
            return anterior;
        }else{
             return [...anterior,actual.tipo];
        }},[]);
    const filtrarCategoria=()=>{
        console.log(document.getElementById("selector").value)
        setSeguros(props.losseguros.filter(producto => producto.tipo.toLowerCase().includes(document.getElementById("selector").value)))
    }

    const showSaveDialog = ()=> {
        setVisible(true)
    }

    const save = () =>{
        console.log(seguro.seguro)
        url.save(seguro.seguro).then( data =>{
            console.log(data)
        })
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
            <Menubar model={items} /> 
            {seguros.map((item,index)=>(
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
        
            <Dialog header="Crear Seguro" visible={visible} style={{ width: '70%' }} footer={<Button label='Guardar' icon="pi pi-check" onClick={save}/>} onHide={() => setVisible(false)}>
            <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="id" value={seguro.value} onChange={(e) => setSeguro(prevState=>{
                        let seguro = Object.assign({}, prevState.seguro);
                        seguro.id = e.target.value
                        return {seguro}
                    })} />
                    <label htmlFor="id">Id</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="nombre" value={seguro.value} onChange={(e) => setSeguro(prevState=>{
                        let seguro = Object.assign({}, prevState.seguro);
                        seguro.nombre = e.target.value
                        return {seguro}
                    })} />
                    <label htmlFor="nombre">Nombre</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="tipo" value={seguro.value} onChange={(e) => setSeguro(prevState=>{
                        let seguro = Object.assign({}, prevState.seguro);
                        seguro.tipo = e.target.value
                        return {seguro}
                    })} />
                    <label htmlFor="tipo">Tipo</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="descripcion" value={seguro.value} onChange={(e) => setSeguro(prevState=>{
                        let seguro = Object.assign({}, prevState.seguro);
                        seguro.descripcion = e.target.value
                        return {seguro}
                    })} />
                    <label htmlFor="descripcion">Descripcion</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="precio" value={seguro.value} onChange={(e) => setSeguro(prevState=>{
                        let seguro = Object.assign({}, prevState.seguro);
                        seguro.precio = e.target.value
                        return {seguro}
                    })} />
                    <label htmlFor="precio">Precio</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="periodicidad" value={seguro.value} onChange={(e) => setSeguro(prevState=>{
                        let seguro = Object.assign({}, prevState.seguro);
                        seguro.periodicidad = e.target.value
                        return {seguro}
                    })} />
                    <label htmlFor="periodicidad">Periodicidad</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="aseguradora" value={seguro.value} onChange={(e) => setSeguro(prevState=>{
                        let seguro = Object.assign({}, prevState.seguro);
                        seguro.aseguradora = e.target.value
                        return {seguro}
                    })} />
                    <label htmlFor="aseguradora">Aseguradora</label>
                </span>
           
            </Dialog>
    </div>
        

}


