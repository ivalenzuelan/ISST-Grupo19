import {useState, useEffect} from "react"
import Form from 'react-bootstrap/Form';
import { MDBCardText } from 'mdb-react-ui-kit';
import { Link, useParams} from 'react-router-dom';
import {SeguroService} from '../service/segurosservice'

import { Menubar } from 'primereact/menubar';  
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from "primereact/card";
        
        
import "primereact/resources/themes/lara-light-indigo/theme.css";        
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";                                         
        

export default function ClientesCorredor(props){ 


    const [filtro,setFiltro]=useState(null)
    const [clientes, setClientes] = useState(props.losclientes);
    const [cliente,setCliente] = useState({
        "id": null,
        "mail": null,
        "idFiscal": null,
        "username": null,
        "nombre": null,
        "apellidos": null,
        "password": null,
        "nacimiento": Date,
        "direccion": null,
        "telefono": null,
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

    // TODO: no funciona el filtro
    return <div id='seguro_por_tipo'>  
        <div id="seccion">
            <div >
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText id="filtro" placeholder="Buscar clientes" onChange={e=>setFiltro(e.target.value)}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                            filtrar();
                            }
                        }}/>
                </span>
            </div>
        </div>
        <div className="lista_seguro">

            <div className="menubar-wrapper">
                <Menubar model={items} className="custom-menubar" />
            </div>

            {clientes.map((item,index)=>(
                <Card title={item.nombre+" "+item.apellidos}>
                    <p>
                        <p><b>Email:</b> {item.mail}</p>
                        <p><b>Telefóno:</b> {item.telefono}</p>
                        <p><b>Nombre de usuario:</b> {item.username}</p>
                        <p><Link to={"/clientesCorredor/" + (item.id)}><Button label="Más información"/></Link></p>
                        
                    </p>
                </Card>
            
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