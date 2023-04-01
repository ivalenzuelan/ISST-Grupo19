import {Component, useState} from "react"
import Form from 'react-bootstrap/Form';
import { MDBCardText } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';

class SeguroTipo extends Component{ 

    constructor(props) {
        super(props);
        this.state = {seguros: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/seguros/${this.props.match.params.tipo}')
            .then(response => response.json())
            .then(data => this.setState({seguros: data}));
    }

    async remove(id) {
        await fetch(`/tfgs/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedSeguros = [...this.state.seguros].filter(i => i.id !== id);
            this.setState({seguros: updatedSeguros});
        });
    }
    
render(){
    const {seguros} = this.state
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
            {seguros.map((item,index)=>(
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
}
