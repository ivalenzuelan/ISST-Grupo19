import {useState, useEffect} from "react"
import Form from 'react-bootstrap/Form';
import { useParams} from 'react-router-dom';
import {SeguroService} from '../service/segurosservice'

import { Menubar } from 'primereact/menubar';  
import { Dialog } from 'primereact/dialog'; 
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';      
           
        
import "primereact/resources/themes/lara-light-indigo/theme.css";        
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  
import 'primeflex/primeflex.css';
import { Card } from "primereact/card";
        

                                               
        

export default function PolizasContratadas(props){ 

    let {id} = useParams()
    const [cliente, setCliente] = useState({});
    const [polizas, setPolizas] = useState({});
    const [poliza, setPoliza] = useState({});
    const [visible, setVisible] = useState(false);
    const [citaVisible, setCitaVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const items =[
        {
            label: 'Modificar datos',
            icon: 'pi pi-fw pi-pencil',
            command: () => {showEditDialog()}
        },
        {
            label: 'Solicitar cita',
            icon:'pi pi-calendar mr-2',
            command: () => {showCitaDialog()}
        },
    ]

    const url = new SeguroService()

    const callServer = async (param) =>{
        await url.getCliente(id).then(data => {
          setCliente(data)   
        })
    }
    const callServerPoliza = async (param) =>{
        await url.getPolizasCliente(id).then(data => {
          setPolizas({polizas: data})   
        })
    }
  
    useEffect(() => {
        function fetchData() {	
        callServerPoliza();
        setTimeout(()=>{
            setLoading(false);
          },100);	
        callServer();
        setTimeout(()=>{
            setLoading(false);
          },100);	          
        }
        fetchData();
    }, []);
    
    const showEditDialog=()=>{
        setCliente({"cliente": cliente})
        setVisible(true)
    }
    const showCitaDialog=()=>{
        setCliente({"cliente": cliente})
        setCitaVisible(true)
    }
    const editCliente=()=>{
        url.editCliente(cliente.cliente).then(res => res.data)
    }

    const editPoliza=()=>{
        console.log(poliza)
        url.editPoliza(poliza.poliza).then(res => res.data)
    }

    const solicitarRenovar =(item)=>{
        setPoliza({"poliza":item})
        console.log(poliza)
        setPoliza(prevState=>{
            let poliza = Object.assign({}, prevState.poliza);
            poliza.renovar = true
            return {poliza}
        })
        console.log(poliza)
        editPoliza()
    }
    const solicitarAnular =(item)=>{
        setPoliza({"poliza":item})
        setPoliza(prevState=>{
            let poliza = Object.assign({}, prevState.poliza);
            poliza.anular = true
            return {poliza}
        })
        editPoliza()
    }
    
    return <div>
        <div>
        {cliente ? <div>
            <div>
                <Menubar model={items} /> 
            </div>
                <Card title ={ cliente.nombre+" "+cliente.apellidos}>
                        <p>{cliente.username}</p>
                        <p> {cliente.mail}</p>
                        <p> {cliente.telefono} </p>
                </Card>
            </div>
            :
                <p> Algo ha fallado en el servidor. Intente de nuevo</p>
        }
        </div>
            {polizas.polizas ? <div>
                <h4>Polizas contratadas</h4>
                {polizas.polizas.map((item,index)=>(
                    <Card title = {item.seguro.nombre+"-"+item.seguro.aseguradora}>
                            <p >Fecha inicio: {item.inicio}</p>
                            <p>Fecha de expiración: {item.termino}</p>
                            <p> {item.precio} / {item.periodicidad}</p>
                            <p><Button onClick={() => {solicitarRenovar(item)}}> Solicitar renovación </Button></p>
                            <p><Button onClick={() => {solicitarAnular(item)}}> Solicitar anulacion </Button></p>
                    </Card>
                 ))}
                </div>
                :
                <p> Algo ha fallado en el servidor. Intente de nuevo</p>
            }
        <Dialog header="Modificar mis datos" visible={visible} style={{ width: '70%' }} footer={<Button label='Guardar' icon="pi pi-check" onClick={editCliente}/>} onHide={() => setVisible(false)}>
            <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="username" value={cliente.username} onChange={(e) =>{         
                        let val = e.target.value;
                        setCliente(prevState=>{
                            console.log(prevState)
                            let clienteEdit = Object.assign({}, prevState);
                            clienteEdit.cliente.username = val
                            let cliente = clienteEdit.cliente
                            return {cliente}
                    })}} />
                    <label htmlFor="username">Username</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="mail" value={cliente.mail} onChange={(e) =>{         
                        let val = e.target.value;
                        setCliente(prevState=>{
                            console.log(prevState)
                            let clienteEdit = Object.assign({}, prevState);
                            clienteEdit.cliente.mail = val
                            let cliente = clienteEdit.cliente
                            return {cliente}
                    })}} />
                    <label htmlFor="mail">Mail</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="password" value={cliente.password} onChange={(e) =>{         
                        let val = e.target.value;
                        setCliente(prevState=>{
                            console.log(prevState)
                            let clienteEdit = Object.assign({}, prevState);
                            clienteEdit.cliente.password = val
                            let cliente = clienteEdit.cliente
                            return {cliente}
                    })}} />
                    <label htmlFor="password">Contraseña</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="direccion" value={cliente.password} onChange={(e) =>{         
                        let val = e.target.value;
                        setCliente(prevState=>{
                            console.log(prevState)
                            let clienteEdit = Object.assign({}, prevState);
                            clienteEdit.cliente.direccion = val
                            let cliente = clienteEdit.cliente
                            return {cliente}
                    })}} />
                    <label htmlFor="direccion">Direccion</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="telefono" value={cliente.telefono} onChange={(e) =>{         
                        let val = e.target.value;
                        setCliente(prevState=>{
                            console.log(prevState)
                            let clienteEdit = Object.assign({}, prevState);
                            clienteEdit.cliente.telefono = val
                            let cliente = clienteEdit.cliente
                            return {cliente}
                    })}} />
                    <label htmlFor="telefono">Telefono</label>
                </span>
        </Dialog> 

        <Dialog header="Solicitar cita" visible={citaVisible} style={{ width: '70%' }} footer={<Button label='Guardar' icon="pi pi-check" onClick={editCliente}/>} onHide={() => setCitaVisible(false)}>
            <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="cita" value={cliente.cita} onChange={(e) =>{         
                        let val = e.target.value;
                        setCliente(prevState=>{
                            console.log(prevState)
                            let clienteEdit = Object.assign({}, prevState);
                            clienteEdit.cliente.cita = val
                            let cliente = clienteEdit.cliente
                            return {cliente}
                    })}} />
                    <label htmlFor="Cita">Introduzca la fecha yyyy-mm-dd</label>
                </span>      
        </Dialog>   
        </div>
}
    
