import {useState, useEffect, useRef} from "react"
import Form from 'react-bootstrap/Form';
import { useParams} from 'react-router-dom';
import {SeguroService} from '../service/segurosservice'

import { Menubar } from 'primereact/menubar';  
import { Dialog } from 'primereact/dialog'; 
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';   
import { Toast } from 'primereact/toast'; 
import {Calendar} from 'primereact/calendar'
                  
import "primereact/resources/themes/lara-light-indigo/theme.css";        
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  
import 'primeflex/primeflex.css';
import { Card } from "primereact/card";
import NoAcess from "./../NoAcces";


        
export default function PolizasContratadas(){

    let {id} = useParams()
    const [cliente, setCliente] = useState({});
    const [polizas, setPolizas] = useState({});
    const [visible, setVisible] = useState(false);
    const [citaVisible, setCitaVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [minDate, setMinDate] = useState(new Date());
    const toast = useRef(null);
    const rol = localStorage.getItem('rol')
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

    let clienteMuestra = cliente

    while(1){
        if(clienteMuestra.cliente!==undefined){
            clienteMuestra = clienteMuestra.cliente
        }
        else{
            break;
        }
    }
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
        console.log("showEditDialog")
        setVisible(true)
    }
    const showCitaDialog=()=>{
        console.log("showCitaDialog")
        setCitaVisible(true)
    }
    const editCliente=()=>{
        console.log("EditandoCliente")
        url.editCliente(cliente).then(res => {
            toast.current.show({severity:'info', summary: 'Info', detail:'Se ha realizado la petición correctamente', life: 3300, closable: false});
            setTimeout(2000)
            window.location.reload();
        })
        .catch(error => {
            toast.current.show({severity:'error', summary: 'Error', detail:'Ha habido algun error. Intentelo de nuevos', life: 3300, closable: false});
        });
    }

    const solicitarRenovar =(poliza)=>{
        setTimeout(() => {
            poliza.renovar=true;
            url.editPoliza(poliza).then( data =>{      
                toast.current.show({severity:'info', summary: 'Info', detail:'Se ha solicitado la renovación de la poliza', life: 3300, closable: false});
    
            })
            .catch(error => {
                toast.current.show({severity:'error', summary: 'Error', detail:'Ha habido algun error. Intentelo de nuevos', life: 3300, closable: false});

            });
        }, 300);
    }
    const solicitarAnular =(poliza)=>{
        setTimeout(() => {
            poliza.anular=true;
            url.editPoliza(poliza).then( data =>{    
                toast.current.show({severity:'info', summary: 'Info', detail:'Se ha solicitado la anulación de la poliza', life: 3300, closable: false});
            })
            .catch(error => {
                toast.current.show({severity:'error', summary: 'Error', detail:'Ha habido algun error. Intentelo de nuevo', life: 3300, closable: false});
            });
        }, 300);
    }
    
    return <div>
        {rol == "ROLE_USER" ?
        <div>
        <div>
        {cliente ? <div>
            <div>
                <Menubar model={items} /> 
            </div>
            <div>
                <Card title ={ clienteMuestra.nombre+" "+clienteMuestra.apellidos}>
                    <p>
                        <p><b>Username: </b>{clienteMuestra.username}</p>
                        <p><b>Mail: </b> {clienteMuestra.mail}</p>
                        <p><b>Telefono: </b> {clienteMuestra.telefono} </p>
                    </p>
                </Card>
            </div>
            </div>
            :
                <p> Algo ha fallado en el servidor. Intente de nuevo</p>
        }
        </div>
        <div>
            {polizas.polizas ? <div>
                <br/>
                <h3><b>Pólizas contratadas</b></h3>
                <Toast ref={toast} />
                {polizas.polizas.map((item,index)=>(
                    <div>
                    <Card title = {item.seguro.nombre+"-"+item.seguro.aseguradora}>
                        <p>
                            <p >Fecha inicio: {item.inicio}</p>
                            <p>Fecha de expiración: {item.termino}</p>
                            <p> {item.precio}€ / {item.periodicidad}</p>
                            <p><Button onClick={()=>{solicitarRenovar(item)}}> Solicitar renovación </Button></p>
                            <p><Button onClick={() => {solicitarAnular(item)}}> Solicitar anulacion </Button></p>
                        </p>
                    </Card>
                    </div>
                 ))}
                </div>
                :
                <p> Algo ha fallado en el servidor. Intente de nuevo</p>
            }
        </div>
        <Dialog header="Modificar mis datos" visible={visible} style={{ width: '70%' }} footer={<Button label='Guardar' icon="pi pi-check" onClick={()=>{editCliente(); setVisible(false)}}/>} onHide={() => setVisible(false)}>
            <span className="p-float-label">
                <InputText style={{width: '60%', margin: '5px'}} id="nombre" value={cliente.nombre} onChange={(e) =>{         
                    let val = e.target.value;
                    setCliente(prevState=>{
                        let clienteEdit = {...prevState};
                        clienteEdit.nombre = val;
                        return clienteEdit;
                    })}} />
                <label htmlFor="nombre">Nombre</label>
            </span>
            <span className="p-float-label">
                <InputText style={{width: '60%', margin: '5px'}} id="apellidos" value={cliente.apellidos} onChange={(e) =>{         
                    let val = e.target.value;
                    setCliente(prevState=>{
                        let clienteEdit = {...prevState};
                        clienteEdit.apellidos = val;
                        return clienteEdit;
                    })}} />
                <label htmlFor="apellidos">Apellidos</label>
            </span>
            <span className="p-float-label">
                <InputText style={{width: '60%', margin: '5px'}} id="mail" value={cliente.mail} onChange={(e) =>{         
                    let val = e.target.value;
                    setCliente(prevState=>{
                        let clienteEdit = {...prevState};
                        clienteEdit.mail = val;
                        return clienteEdit;
                    })}} />
                <label htmlFor="mail">Mail</label>
            </span>

            <span className="p-float-label">
                <InputText style={{width: '60%', margin: '5px'}} id="direccion" value={cliente.direccion} onChange={(e) =>{         
                    let val = e.target.value;
                    setCliente(prevState=>{
                        let clienteEdit = {...prevState};
                        clienteEdit.direccion = val;
                        return clienteEdit;
                    })}} />
                <label htmlFor="direccion">Direccion</label>
            </span>
            <span className="p-float-label">
                <InputText style={{width: '60%', margin: '5px'}} id="telefono" value={cliente.telefono} onChange={(e) =>{         
                    let val = e.target.value;
                    setCliente(prevState=>{
                        let clienteEdit = {...prevState};
                        clienteEdit.telefono = val;
                        return clienteEdit;
                    })}} />
                <label htmlFor="telefono">Telefono</label>
            </span>
        </Dialog>


        <Dialog header="Solicitar cita" visible={citaVisible} style={{ width: '70%' }} footer={<Button label='Guardar' icon="pi pi-check" onClick={editCliente}/>} onHide={() => setCitaVisible(false)}>
            <span className="p-float-label">
                <Calendar style={{width: '60%', margin: '5px'}} id="cita" value={cliente.cita} onChange={(e) =>{
                    let val = e.value;
                    setCliente(prevState=>{
                        let clienteEdit = {...prevState};
                        clienteEdit.cita = val;
                        return clienteEdit;
                    })}} dateFormat="yy-mm-dd"
                         minDate={minDate} />
                <label htmlFor="Cita">Seleccione la fecha</label>
            </span>
        </Dialog>
        </div>
    :
    <NoAcess />
    }
        </div>
}
    
