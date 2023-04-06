import {useState, useEffect, useRef} from "react"
import Form from 'react-bootstrap/Form';
import { MDBCardText } from 'mdb-react-ui-kit';
import { useParams} from 'react-router-dom';
import { Link } from "react-router-dom";
import {SeguroService} from '../service/segurosservice'

import { Menubar } from 'primereact/menubar';  
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Card } from "primereact/card";

        
        
             
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";        
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";                                         
        

export default function SegurosCorredor(props){ 


    const [filtro,setFiltro]=useState(null)
    const [seguros, setSeguros] = useState(props.losseguros);
    const [seguroSeleccionado, setSeguroSeleccionado] = useState({});
    const [seguro,setSeguro] = useState({"seguro": {
        id:0,
        nombre: null,
        tipo:null,
        descripcion: null,
        precio: null,
        periodicidad: null,
        aseguradora: null
    }})
    const [visible, setVisible] = useState(false);
    const items =[
        {
            label: 'Añadir Seguro',
            icon: 'pi pi-fw pi-plus',
            command: () => {showSaveDialog()}
        },
        {
            label: 'Editar Seguro',
            icon: 'pi pi-fw pi-pencil',
            command: () => {alert('Edited')}
        },
        {
            label: 'Eliminar Seguro',
            icon: 'pi pi-fw pi-trash',
            command: () => {alert('Deleted')}
        },

    ]
    const url = new SeguroService()
    const toast = useRef(null)
  
    const filtrar=()=>{
       setSeguros(seguros.filter(seguro => seguro.nombre.toLowerCase().includes(filtro.toLowerCase())))
    }
    
    const categoria = props.losseguros.reduce((unique, item) => (unique.includes(item.tipo) ? unique : [...unique, item.tipo]),[],);
    const aseguradora = props.losseguros.reduce((unique, item) => (unique.includes(item.aseguradora) ? unique : [...unique, item.aseguradora]),[],);
  

    const filtrarCategoria = () => {
        const categoriaSeleccionada = document.getElementById("selector").value.toLowerCase();
        if (categoriaSeleccionada === "all") {
            setSeguros(props.losseguros);
        } else {
            setSeguros(props.losseguros.filter(seguro => seguro.tipo.toLowerCase().includes(categoriaSeleccionada)));
        }
    };

    const filtrarAseguradora = () => {
        const aseguradoraSeleccionada = document.getElementById("selector2").value.toLowerCase();
        if (aseguradoraSeleccionada === "all") {
            setSeguros(props.losseguros);
        } else {
            setSeguros(props.losseguros.filter(seguro => seguro.aseguradora.toLowerCase().includes(aseguradoraSeleccionada)));
        }
    };

    const showSaveDialog = ()=> {
        setVisible(true)
    }
    const showEditDialog=()=>{
        setSeguro({"seguro": {
            id: seguroSeleccionado.seguro.id,
            nombre: seguroSeleccionado.seguro.nombre,
            tipo: seguroSeleccionado.seguro.tipo,
            descripcion: seguroSeleccionado.seguro.descripcion,
            precio: seguroSeleccionado.seguro.precio,
            periodicidad: seguroSeleccionado.seguro.periodicidad,
            aseguradora: seguroSeleccionado.seguro.aseguradora,
        }})
        setVisible(true)
    }

    const save = () =>{
        url.save(seguro.seguro).then( data =>{
            console.log(data)
        })
    }
    const edit = () =>{
        console.log(seguro.seguro)
        url.editSeguro(seguro.seguro).then( data =>{
            console.log(data)
        })
    }

    const showError = (error) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: {error} });
    };
    const deleteSeguro = (id) =>{
        url.delete(id)
            .then(data => data) 
            .catch(showError(error)) 

    }

    return <div id='seguro_por_tipo'>  
        <div id="seccion">
            <div >
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText id="filtro" placeholder="Buscar por nombre" onChange={e=>setFiltro(e.target.value)}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                            filtrar();
                            }
                        }}/>
                </span>
            </div>
            <div>
                <Form.Select id="selector" aria-label="Default select example" title="Filtrar por tipo" onChange={()=>filtrarCategoria()}>  
                    <option value="All" >Filtrar por tipo</option> 
                    {categoria.sort().map((item) =>(
                        <option key={item} value={item}>{item}</option>
                    ))}
                </Form.Select>
            </div>
            <div>
                <Form.Select id="selector2" aria-label="Default select example" title="Filtrar por aseguradora" onChange={()=>filtrarAseguradora()}>  
                    <option value="All" >Filtrar por aseguradora</option> 
                    {aseguradora.sort().map((item) =>(
                        <option key={item} value={item}>{item}</option>
                    ))}
                </Form.Select>
            </div>
        </div>
        <div className="lista_seguro">
            <div className="menubar-wrapper">
                <Menubar model={items} className="custom-menubar" />
            </div>
            {seguros.map((item,index)=>(
                <Card title={item.nombre}>
                    <p>
                        <p><b>Aseguradora:</b> {item.aseguradora}</p>
                        <p><b>Precio:</b> {item.precio} €</p>
                        <p><b>Periodicidad:</b> {item.periodicidad}</p>
                        <p><Button onClick={()=>{setSeguroSeleccionado({seguro: item}); showEditDialog()}}>Editar Seguro</Button></p>
                        <p><Button onClick={()=>{deleteSeguro(item.id)}}>Eliminar Seguro</Button></p>
                    </p>
                </Card>
             ))}
            
        </div>
        
            <Dialog header="Crear Seguro" visible={visible} style={{ width: '70%' }} footer={<Button label='Guardar' icon="pi pi-check" onClick={edit}/>} onHide={() => setVisible(false)}>
                {console.log(seguro)}
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="nombre" value={seguro.seguro.nombre} onChange={(e) =>{         
                        let val = e.target.value;
                        setSeguro(prevState=>{
                            console.log(prevState)
                            let seguroEdit = Object.assign({}, prevState);
                            seguroEdit.seguro.nombre = val
                            let seguro = seguroEdit.seguro
                            return {seguro}
                    })}} />
                    <label htmlFor="nombre">Nombre</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="tipo" value={seguro.seguro.tipo} onChange={(e) =>{         
                        let val = e.target.value;
                        setSeguro(prevState=>{
                            let seguroEdit = Object.assign({}, prevState);
                            seguroEdit.seguro.tipo = val
                            let seguro = seguroEdit.seguro
                            return {seguro}
                    })}} />
                    <label htmlFor="tipo">Tipo</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="descripcion" value={seguro.seguro.descripcion} onChange={(e) =>{         
                        let val = e.target.value;
                        setSeguro(prevState=>{
                            console.log(prevState)
                            let seguroEdit = Object.assign({}, prevState);
                            seguroEdit.seguro.descripcion = val
                            let seguro = seguroEdit.seguro
                            return {seguro}
                    })}} />
                    <label htmlFor="descripcion">Descripcion</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="precio" value={seguro.seguro.precio} onChange={(e) =>{         
                        let val = e.target.value;
                        setSeguro(prevState=>{
                            console.log(prevState)
                            let seguroEdit = Object.assign({}, prevState);
                            seguroEdit.seguro.precio = val
                            let seguro = seguroEdit.seguro
                            return {seguro}
                    })}} />
                    <label htmlFor="precio">Precio</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="periodicidad" value={seguro.seguro.periodicidad} onChange={(e) =>{         
                        let val = e.target.value;
                        setSeguro(prevState=>{
                            console.log(prevState)
                            let seguroEdit = Object.assign({}, prevState);
                            seguroEdit.seguro.periodicidad = val
                            let seguro = seguroEdit.seguro
                            return {seguro}
                    })}} />
                    <label htmlFor="periodicidad">Periodicidad</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="aseguradora" value={seguro.seguro.aseguradora} onChange={(e) =>{         
                        let val = e.target.value;
                        setSeguro(prevState=>{
                            console.log(prevState)
                            let seguroEdit = Object.assign({}, prevState);
                            seguroEdit.seguro.aseguradora = val
                            let seguro = seguroEdit.seguro
                            return {seguro}
                    })}} />
                    <label htmlFor="aseguradora">Aseguradora</label>
                </span>
           
            </Dialog>
    </div>
        

}


