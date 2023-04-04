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
        

export default function ClientesCorredor(props){ 


    const [filtro,setFiltro]=useState(null)
    const [clientes, setClientes] = useState(props.losclientes);
    const [cliente,setCliente] = useState({
        id: null,
        mail: null,
        idFiscal: null,
        username: null,
        nombre: null,
        apellidos: null,
        password: null,
        nacimiento: Date,
        direccion: null,
        telefono: null,
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
       setClientes(clientes.filter(cliente => cliente.nombre.toLowerCase().includes(filtro)))
    }
    

    const showSaveDialog = ()=> {
        setVisible(true)
    }

    const save = () =>{
        url.saveCliente(cliente.cliente).then( data =>{
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
        </div>
        <div className="lista_seguro">
            <Menubar model={items} /> 
            {clientes.map((item,index)=>(
                <div key={item.id} class="card" className="lista_seguro" style={{height:MDBCardText, width: '800px', textAlign:'justify' }}>
                    <h5 class="card-header">{ item.nombre} {item.apellidos}</h5>
                    <div class="card-body">
                        <h5 class="card-title">{item.username}</h5>
                        <p class="card-text"> {item.mail}</p>
                        <p class="card-text"> {item.telefono} / {item.periodicidad}</p>
                        <a href="#" class="btn btn-primary">Mas información</a>
                    </div>
                </div>
             ))}
            
        </div>
        
            <Dialog header="Añadir Cliente" visible={visible} style={{ width: '70%' }} footer={<Button label='Guardar' icon="pi pi-check" onClick={save}/>} onHide={() => setVisible(false)}>
            <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="id" value={cliente.value} onChange={(e) => setCliente(prevState=>{
                        let cliente = Object.assign({}, prevState.cliente);
                        cliente.id = e.target.value
                        return {cliente}
                    })} />
                    <label htmlFor="id">Id</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="mail" value={cliente.value} onChange={(e) => setCliente(prevState=>{
                        let cliente = Object.assign({}, prevState.cliente);
                        cliente.mail = e.target.value
                        return {cliente}
                    })} />
                    <label htmlFor="mail">Mail</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="idFiscal" value={cliente.value} onChange={(e) => setCliente(prevState=>{
                        let cliente = Object.assign({}, prevState.cliente);
                        cliente.idFiscal = e.target.value
                        return {cliente}
                    })} />
                    <label htmlFor="idFiscal">DNI</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="username" value={cliente.value} onChange={(e) => setCliente(prevState=>{
                        let cliente = Object.assign({}, prevState.cliente);
                        cliente.username = e.target.value
                        return {cliente}
                    })} />
                    <label htmlFor="username">Username</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="nombre" value={cliente.value} onChange={(e) => setCliente(prevState=>{
                        let cliente = Object.assign({}, prevState.cliente);
                        cliente.nombre = e.target.value
                        return {cliente}
                    })} />
                    <label htmlFor="nombre">Nombre</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="apellidos" value={cliente.value} onChange={(e) => setCliente(prevState=>{
                        let cliente = Object.assign({}, prevState.cliente);
                        cliente.apellidos = e.target.value
                        return {cliente}
                    })} />
                    <label htmlFor="apellidos">Apellidos</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="password" value={cliente.value} onChange={(e) => setCliente(prevState=>{
                        let cliente = Object.assign({}, prevState.cliente);
                        cliente.password = e.target.value
                        return {cliente}
                    })} />
                    <label htmlFor="password">Contraseña</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="nacimiento" value={cliente.value} onChange={(e) => setCliente(prevState=>{
                        let cliente = Object.assign({}, prevState.cliente);
                        cliente.nacimiento = e.target.value
                        return {cliente}
                    })} />
                    <label htmlFor="nacimiento">Nacimiento</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="direccion" value={cliente.value} onChange={(e) => setCliente(prevState=>{
                        let cliente = Object.assign({}, prevState.cliente);
                        cliente.direccion = e.target.value
                        return {cliente}
                    })} />
                    <label htmlFor="direccion">Direccion</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="telefono" value={cliente.value} onChange={(e) => setCliente(prevState=>{
                        let cliente = Object.assign({}, prevState.cliente);
                        cliente.telefono = e.target.value
                        return {cliente}
                    })} />
                    <label htmlFor="telefono">telefono</label>
                </span>
                
            </Dialog>
    </div>
        

}