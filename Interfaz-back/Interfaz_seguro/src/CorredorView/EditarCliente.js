import {useState, useEffect, useRef} from "react"

import { useParams} from 'react-router-dom';
import {SeguroService} from '../service/segurosservice'
import NoAcces from './../NoAcces'

import { Menubar } from 'primereact/menubar';  
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
        
           
        
import "primereact/resources/themes/lara-light-indigo/theme.css";        
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  
import 'primeflex/primeflex.css';
        

                                               
        

export default function EditarCliente(props){ 

    let {id} = useParams()
    const [cliente, setCliente] = useState({});
    const [seguros, setSeguros] = useState(props.losseguros);
    const [SeguroSeleccionado, setSeguroSeleccionado] = useState(null);
    const [polizas, setPolizas] = useState({})
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const rol = localStorage.getItem('rol')
    const items =[
        {
            label: 'Nueva Poliza',
            icon: 'pi pi-fw pi-plus',
            command: () => {showSaveDialog()}
        },

    ]
    const [poliza,setPoliza] = useState({
        cliente: null,
        seguro: null,
        id: null,
        inicio: null,
        termino: null,
        precio: null,
        periodicidad: null,
        pdf_poliza: null,
    })
    const toast = useRef(null);
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
    
    const showSaveDialog = ()=> {
        setVisible(true)
        setPoliza(prevState =>{
            let poliza = Object.assign({}, prevState.poliza);
            poliza.cliente = cliente
            return {poliza}
        } )                  

    }

    const save = () =>{
  
        url.savePoliza(poliza.poliza).then( data =>{
            toast.current.show({severity:'success', summary: 'Success', detail:'Se ha solicitado la anulacion de la póliza', life: 3000});  
            setTimeout(2000)
            window.location.reload();
        })
    }

    const deletePoliza = (id) =>{
        url.deletePoliza(id).then( data =>{
            toast.current.show({severity:'success', summary: 'Success', detail:'Poliza eliminada', life: 3300, closable: false});
            setTimeout(2000)
            window.location.reload();
        })
        .catch(error => {
            toast.current.show({severity:'error', summary: 'Error', detail:'Error al eliminar. Intentelo de nuevo', life: 3300, closable: false});
           
        });
    }

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.nombre}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.nombre}-{option.aseguradora}</div>
            </div>
        );
    };

    
    return  <div>
    {rol == "ROLE_ADMIN" ? 
        <div>
            <Toast ref={toast} />
                <div className="menubar-wrapper"> <Menubar model={items} className="custom-menubar" /> </div>   
                <Card title={cliente.nombre+" "+cliente.apellidos}>
                    <p>
                        <p><b>Email:</b> {cliente.mail}</p>
                        <p><b>Telefóno:</b> {cliente.telefono}</p>
                        <p><b>Nombre de usuario:</b> {cliente.username}</p>       
                    </p>
                </Card>
            {polizas.polizas ? 
                <div>
                <h4>Polizas contratadas</h4>
                {polizas.polizas.map((item,index)=>(
                    <div>
                    <Card title = {item.seguro.nombre+"-"+item.seguro.aseguradora}>
                    <p>
                        <p >Fecha inicio: {item.inicio}</p>
                        <p>Fecha de expiración: {item.termino}</p>
                        <p> {item.precio} / {item.periodicidad}</p>
                        <p> <Button onClick={()=>{deletePoliza(item.id)}}>Eliminar poliza</Button></p>
                    </p>
                </Card>
                </div>
                 ))}
                 </div>
                 :
                 <div> Algo ha fallado en el servidor </div>
                }
            
                <Dialog header="Añadir Poliza" visible={visible} style={{ width: '70%' }} footer={<Button label='Guardar' icon="pi pi-check" onClick={()=>{save(); setVisible(false)}}/>} onHide={() => setVisible(false)}>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="inicio" value={poliza.value} onChange={(e) => setPoliza(prevState=>{
                        let poliza = Object.assign({}, prevState.poliza);
                        poliza.inicio = e.target.value
                        return {poliza}
                    })} />
                    <label htmlFor="inicio">Inicio</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="termino" value={poliza.value} onChange={(e) => setPoliza(prevState=>{
                        let poliza = Object.assign({}, prevState.poliza);
                        poliza.termino = e.target.value
                        return {poliza}
                    })} />
                    <label htmlFor="termino">Termino</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="precio" value={poliza.value} onChange={(e) => setPoliza(prevState=>{
                        let poliza = Object.assign({}, prevState.poliza);
                        poliza.precio = e.target.value
                        return {poliza}
                    })} />
                    <label htmlFor="precio">Precio</label>
                </span>
    
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="periodicidad" value={poliza.value} onChange={(e) => setPoliza(prevState=>{
                        let poliza = Object.assign({}, prevState.poliza);
                        poliza.periodicidad = e.target.value
                        return {poliza}
                    })} />
                    <label htmlFor="periodicidad">Periodicidad</label>
                </span>
                <span>
                    <Dropdown value={SeguroSeleccionado} onChange={(e) =>{ setSeguroSeleccionado(e.value);
                    setPoliza(prevState=>{
                        let poliza = Object.assign({}, prevState.poliza);
                        poliza.seguro = e.target.value
                        return {poliza}})}} options={seguros} optionLabel="name" placeholder="Selecciona un seguro" 
                 valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" />
                </span>
               
            </Dialog>  
        </div>
        :
            <NoAcces />
        }
    </div>
}


        
