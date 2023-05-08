import {useState, useEffect, useRef} from "react"
import Form from 'react-bootstrap/Form';
import {SeguroService} from '../service/segurosservice'
import { Menubar } from 'primereact/menubar';  
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Card } from "primereact/card";
import Header from '../Header';
import NoAcces from './../NoAcces'
             
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";        
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";                                         
        

export default function SegurosCorredor(props){ 

    const url = new SeguroService()
    const [filtro,setFiltro] = useState(null)
    const [loading, setLoading] = useState(true);
    const [seguros, setSeguros] = useState({});
    const rol = localStorage.getItem('rol')

    const callServerSeguros = async (param) =>{
        await url.getAll().then(data => {
          setSeguros(data)
        })
    }

    useEffect(() => {
        function fetchData() {	
            callServerSeguros();
            setTimeout(()=>{
                setLoading(false);
            },150);		
        }
  
      fetchData();
    }, []);


    let SeguroSeleccionado;
    let aux = false;
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
    const [visible2, setVisible2] = useState(false);
    const [action, setAction] = useState(null)
    const items =[
        {
            label: 'Añadir Seguro',
            icon: 'pi pi-fw pi-plus',
            command: () => {showSaveDialog()}
        },
    ]
    const toast = useRef(null)
  
    const filtrar=()=>{
        if(filtro===""){
            filtrarCategoria();
        }
        else{
            setSeguros(seguros.filter(seguro => seguro.nombre.toLowerCase().includes(filtro.toLowerCase())));
    }
    }
    
    let categoria = [];
    let aseguradora = [];
    
    if (props.losseguros) {
      categoria = props.losseguros.reduce((unique, item) => (unique.includes(item.tipo) ? unique : [...unique, item.tipo]), []);
      aseguradora = props.losseguros.reduce((unique, item) => (unique.includes(item.aseguradora) ? unique : [...unique, item.aseguradora]), []);
    }
    

    const filtrarCategoria = () => {
        const categoriaSeleccionada = document.getElementById("selector").value.toLowerCase();
        const aseguradoraSeleccionada = document.getElementById("selector2").value.toLowerCase();
        switch(true) {
            case (categoriaSeleccionada === "all" && aseguradoraSeleccionada === "all"):
              setSeguros(props.losseguros);
              break;
            case (aseguradoraSeleccionada === "all"):
              setSeguros(props.losseguros.filter(seguros2 => seguros2.tipo.toLowerCase().includes(categoriaSeleccionada)));
              break;
            case (categoriaSeleccionada === "all"):
              setSeguros(props.losseguros.filter(seguros2 => seguros2.aseguradora.toLowerCase().includes(aseguradoraSeleccionada)));
              break;
            default:
              setSeguros(props.losseguros.filter(seguros2 => seguros2.aseguradora.toLowerCase().includes(aseguradoraSeleccionada) && seguros2.tipo.toLowerCase().includes(categoriaSeleccionada)));
              break;
          }
        };

    const showSaveDialog = ()=> {
        setAction("save")
        setVisible2(true)
    }

    const showEditDialog=()=>{
        setAction("edit")
        setSeguro({"seguro": {
            id: SeguroSeleccionado.seguro.id,
            nombre: SeguroSeleccionado.seguro.nombre,
            tipo: SeguroSeleccionado.seguro.tipo,
            descripcion: SeguroSeleccionado.seguro.descripcion,
            precio: SeguroSeleccionado.seguro.precio,
            periodicidad: SeguroSeleccionado.seguro.periodicidad,
            aseguradora: SeguroSeleccionado.seguro.aseguradora,
        }})
        setVisible(true)
    };

    const save = () =>{
        url.save(seguro.seguro).then( data =>{
            toast.current.show({severity:'success', summary: 'Success', detail:'Seguro guardado', life: 3300, closable: false});
            setTimeout(2000)
            window.location.reload();
        })
        .catch(error => {
            toast.current.show({severity:'error', summary: 'Error', detail:'Error en las propiedades del seguro', life: 3300, closable: false});
            console.error('Error editing seguro');
        });
    };

    const edit = () =>{
        url.editSeguro(seguro.seguro).then( data =>{
            toast.current.show({severity:'info', summary: 'Info', detail:'Seguro editado', life: 3300, closable: false});
            setTimeout(2000)
            window.location.reload();

        })
        .catch(error => {
            toast.current.show({severity:'error', summary: 'Error', detail:'Error al editar propiedades', life: 3300, closable: false});
            console.error('Error editing seguro');
        });
    };

    const deleteSeguro = (id) =>{
        url.delete(id)
            .then(data => {
                toast.current.show({severity:'info', summary: 'Info', detail:'Seguro eliminado', life: 3300, closable: false});
                deleteSeguro2(seguros, id);
                return data;
            })
            .catch(error => {
                toast.current.show({severity:'error', summary: 'Error', detail:'Estas intentando borrar un seguro con polizas asociadas', life: 3300, closable: false});
                console.error('Error deleting seguro');
            });
    };
      
    const deleteSeguro2 = (seguros, id) => {
        const updatedSeguros = seguros.filter(seguros => seguros.id !== id);
        setSeguros(updatedSeguros);
    };
    
    const realizarAccion = ()=>{
        if (action === "edit"){
            edit()
        }else{
            save()
        }
    };

    return(<div>
        {rol == "ROLE_ADMIN" ?
        <div>
        {loading ? <Header/> : <div id='seguro_por_tipo'>
        <Toast ref={toast} />
        
        <div id="seccion">
            <div>
                <Form.Select id="selector" aria-label="Default select example" title="Filtrar por tipo" onChange={()=>filtrarCategoria()}>  
                    <option value="All" >Filtrar por tipo</option> 
                    {categoria.sort().map((item) =>(
                        <option key={item} value={item}>{item}</option>
                    ))}
                </Form.Select>
            </div>
            <div>
                <Form.Select id="selector2" aria-label="Default select example" title="Filtrar por aseguradora" onChange={()=>filtrarCategoria()}>  
                    <option value="All" >Filtrar por aseguradora</option> 
                    {aseguradora.sort().map((item) =>(
                        <option key={item} value={item}>{item}</option>
                    ))}
                </Form.Select>
            </div>
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
        </div>
        <div className="lista_seguro">
            <div className="menubar-wrapper">
                <Menubar model={items} className="custom-menubar" />
                </div>
                {seguros.map((item,index)=>(
                    <Card key={item.id} title={item.nombre}>
                        <p>
                            <p><b>Aseguradora:</b> {item.aseguradora}</p>
                            <p><b>Precio:</b> {item.precio} €</p>
                            <p><b>Periodicidad:</b> {item.periodicidad}</p>
                            <p><b>Tipo:</b> {item.tipo}</p>
                            <p><Button onClick={()=>{SeguroSeleccionado = ({seguro: item}); showEditDialog()}}>Editar Seguro</Button></p>
                            <p><Button onClick={()=>{deleteSeguro(item.id)}}>Eliminar Seguro</Button></p>
                        </p>
                    </Card>
                ))}

            
        </div>
        
            <Dialog header="[Editar] Seguro" visible={visible} style={{ width: '70%' }} footer={<Button label='Guardar' icon="pi pi-check" onClick={()=>{realizarAccion(); setVisible(false)}}/>} onHide={() => setVisible(false)}>
     
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div style={{marginRight: '5px'}}>Nombre:</div>
                <span className="p-float-label">
                    <div className="textbox">
                    <InputText style={{width: '90%', margin: '5px'}} id="nombre" value={seguro.seguro.nombre} onChange={(e) => {     
                        let val = e.target.value;
                        setSeguro(prevState => {
                        let seguroEdit = Object.assign({}, prevState);
                        seguroEdit.seguro.nombre = val;
                        let seguro = seguroEdit.seguro;
                        return {seguro};
                        });
                    }} />
                    </div>
                </span>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div style={{marginRight: '5px'}}>Tipo:</div>
                <span className="p-float-label">
                    <div className="textbox">
                    <InputText style={{width: '90%', margin: '5px'}} id="tipo" value={seguro.seguro.tipo} onChange={(e) => {     
                        let val = e.target.value;
                        setSeguro(prevState => {
                        let seguroEdit = Object.assign({}, prevState);
                        seguroEdit.seguro.tipo = val;
                        let seguro = seguroEdit.seguro;
                        return {seguro};
                        });
                    }} />
                    </div>
                </span>
                </div>

                
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div style={{marginRight: '5px'}}>Descripcion:</div>
                <span className="p-float-label">
                    <div className="textbox">
                    <InputText style={{width: '140%', margin: '5px'}} id="descripcion" value={seguro.seguro.descripcion} onChange={(e) => {     
                        let val = e.target.value;
                        setSeguro(prevState => {
                        let seguroEdit = Object.assign({}, prevState);
                        seguroEdit.seguro.descripcion = val;
                        let seguro = seguroEdit.seguro;
                        return {seguro};
                        });
                    }} />
                    </div>
                </span>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div style={{marginRight: '5px'}}>Precio:</div>
                <span className="p-float-label">
                    <div className="textbox">
                    <InputText style={{width: '90%', margin: '5px'}} id="precio" value={seguro.seguro.precio} onChange={(e) => {     
                        let val = e.target.value;
                        setSeguro(prevState => {
                        let seguroEdit = Object.assign({}, prevState);
                        seguroEdit.seguro.precio = val;
                        let seguro = seguroEdit.seguro;
                        return {seguro};
                        });
                    }} />
                    </div>
                </span>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div style={{marginRight: '5px'}}>Periodicidad:</div>
                <span className="p-float-label">
                    <div className="textbox">
                    <InputText style={{width: '90%', margin: '5px'}} id="periodicidad" value={seguro.seguro.periodicidad} onChange={(e) => {     
                        let val = e.target.value;
                        setSeguro(prevState => {
                        let seguroEdit = Object.assign({}, prevState);
                        seguroEdit.seguro.periodicidad = val;
                        let seguro = seguroEdit.seguro;
                        return {seguro};
                        });
                    }} />
                    </div>
                </span>
                </div>

                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <div style={{marginRight: '5px'}}>Aseguradora:</div>
                <span className="p-float-label">
                    <div className="textbox">
                    <InputText style={{width: '90%', margin: '5px'}} id="aseguradora" value={seguro.seguro.aseguradora} onChange={(e) => {     
                        let val = e.target.value;
                        setSeguro(prevState => {
                        let seguroEdit = Object.assign({}, prevState);
                        seguroEdit.seguro.aseguradora = val;
                        let seguro = seguroEdit.seguro;
                        return {seguro};
                        });
                    }} />
                    </div>
                </span>
                </div>
           
            </Dialog>


            <Dialog header="[Crear] Seguro" visible={visible2} style={{ width: '70%' }} footer={<Button label='Guardar' icon="pi pi-check" onClick={()=>{realizarAccion(); setVisible2(false)}}/>} onHide={() => setVisible2(false)}>
                
                <span className="p-float-label">
                    
                    <InputText style={{width: '60%', margin: '5px'}} id="nombre" onChange={(e) =>{     
                        let val = e.target.value;
                        setSeguro(prevState=>{
                            let seguroEdit = Object.assign({}, prevState);
                            seguroEdit.seguro.nombre = val
                            let seguro = seguroEdit.seguro
                            return {seguro}
                    })}} />
                    <label htmlFor="nombre">Nombre</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="tipo" onChange={(e) =>{         
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
                    <InputText style={{width: '60%', margin: '5px'}} id="descripcion" onChange={(e) =>{         
                        let val = e.target.value;
                        setSeguro(prevState=>{
                            let seguroEdit = Object.assign({}, prevState);
                            seguroEdit.seguro.descripcion = val
                            let seguro = seguroEdit.seguro
                            return {seguro}
                    })}} />
                    <label htmlFor="descripcion">Descripcion</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="precio" onChange={(e) =>{         
                        let val = e.target.value;
                        setSeguro(prevState=>{
                            let seguroEdit = Object.assign({}, prevState);
                            seguroEdit.seguro.precio = val
                            let seguro = seguroEdit.seguro
                            return {seguro}
                    })}} />
                    <label htmlFor="precio">Precio</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="periodicidad" onChange={(e) =>{         
                        let val = e.target.value;
                        setSeguro(prevState=>{
                            let seguroEdit = Object.assign({}, prevState);
                            seguroEdit.seguro.periodicidad = val
                            let seguro = seguroEdit.seguro
                            return {seguro}
                    })}} />
                    <label htmlFor="periodicidad">Periodicidad</label>
                </span>
                <span className="p-float-label">
                    <InputText style={{width: '60%', margin: '5px'}} id="aseguradora" onChange={(e) =>{         
                        let val = e.target.value;
                        setSeguro(prevState=>{
                            let seguroEdit = Object.assign({}, prevState);
                            seguroEdit.seguro.aseguradora = val
                            let seguro = seguroEdit.seguro
                            return {seguro}
                    })}} />
                    <label htmlFor="aseguradora">Aseguradora</label>
                </span>
           
            </Dialog>
    </div>
    }</div>
    : 
        <NoAcces />
    }
    </div>    
    )
}


