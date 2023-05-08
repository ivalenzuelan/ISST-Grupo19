import {useState, useRef, useEffect} from "react"
import { Link} from 'react-router-dom';
import {SeguroService} from '../service/segurosservice'

import { Menubar } from 'primereact/menubar';  
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import NoAcces from './../NoAcces';
        
        
import "primereact/resources/themes/lara-light-indigo/theme.css";        
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";                                         
        

export default function ClientesCorredor(){ 


    const [filtro,setFiltro]=useState(null)
    const [clientes, setClientes] = useState([]);
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
    const rol = localStorage.getItem('rol')

    const callServerClientes = async (param) =>{
        await url.getAllClientes().then(data => {
        setClientes({clientes: data})   
      })
    }

  useEffect(() => {
    function fetchData() {		
      callServerClientes();
    }
    fetchData();
  }, []);

    const [visible, setVisible] = useState(false);
    const toast = useRef(null)
    const items =[
        {
            label: 'Nuevo',
            icon: 'pi pi-fw pi-plus',
            command: () => {showSaveDialog()}
        },

    ]
    const url = new SeguroService()
    const filtrar=()=>{
        if(filtro===""){
            setClientes(clientes.clientes);
        }
        else{
       setClientes(clientes.filter(cliente => cliente.nombre.toLowerCase().includes(filtro)))
    }}
    

    const showSaveDialog = ()=> {
        setVisible(true)
    }

    const save = () =>{
        url.saveCliente(cliente.cliente).then( data =>{
            toast.current.show({severity:'success', summary: 'Success', detail:'Cliente guardado', life: 3300, closable: false});
            setTimeout(2000)
            window.location.reload();
        })
        .catch(error => {
            toast.current.show({severity:'error', summary: 'Error', detail:'Error en las propiedades del cliente', life: 3300, closable: false});
            console.error('Error cliente');
        });

    }
    const deleteCliente = (id) =>{
        url.deleteCliente(id).then( data =>{
            toast.current.show({severity:'success', summary: 'Success', detail:'Cliente eliminado', life: 3300, closable: false});
            setTimeout(2000)
            window.location.reload();
        })
        .catch(error => {
            toast.current.show({severity:'error', summary: 'Error', detail:'El cliente tiene polizas asociadas. No se puede eliminar', life: 3300, closable: false});
           
        });
    }


    return <div>
    {rol == "ROLE_ADMIN" ?
    <div>
    {clientes.clientes ?
    <div id='seguro_por_tipo'>
        <Toast ref={toast} />  
        <div id="seccion">
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
        <div className="lista_seguro">

            <div className="menubar-wrapper">
                <Menubar model={items} className="custom-menubar" />
            </div>

            {clientes.clientes.map((item,index)=>(
                <div>
                <Card title={item.nombre+" "+item.apellidos}>
                    <p>
                        <p><b>Email:</b> {item.mail}</p>
                        <p><b>Telefóno:</b> {item.telefono}</p>
                        <p><b>Nombre de usuario:</b> {item.username}</p>
                        <p><Link to={"/clientesCorredor/" + (item.id)}><Button label="Más información"/></Link></p>
                        <p><Button onClick={()=>{deleteCliente(item.id)}}>Eliminar Cliente</Button></p>
                        
                    </p>
                </Card>
                </div>
             ))}
            
        </div>
        
            <Dialog header="Añadir Cliente" visible={visible} style={{ width: '70%' }} footer={<Button label='Guardar' icon="pi pi-check" onClick={()=>{save(); setVisible(false)}}/>} onHide={() => setVisible(false)}>
        
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
    : 

    <p>Algo ha fallado en el servidor</p> } </div>
    :
    <NoAcces/>
                } </div>
        

}