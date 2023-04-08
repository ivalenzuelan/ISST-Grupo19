import axios from 'axios';




export class SeguroService {

    // Aqui tenemos que poner la URL donde esté expuesta nuestra API

    baseUrl = "http://localhost:8080/";


    getAll() {
        return axios.get(this.baseUrl+"seguros").then(res => {
            return res.data
        })
    }

    getTipo(tipo){
        return axios.get(this.baseUrl+"seguros/tipo/"+ tipo).then(res => {
            return res.data
        })
    }

    save(seguro) {
        console.log(seguro)
        return axios.post(this.baseUrl+"seguros", seguro, {headers:{"Content-Type" : "application/json"}}).then(res => {console.log(res.data)
    })
    }
    editSeguro(seguro) {
        return axios.put(this.baseUrl+"seguros/"+seguro.id, seguro, {headers:{"Content-Type" : "application/json"}}).then(res => {console.log(res.data)
    })
    }

    delete(id) {
        return axios.delete(this.baseUrl+"seguros/"+id).then(res => res.data)
    }

    getAllClientes() {
        return axios.get(this.baseUrl+"clientes").then(res => {
            return res.data
        })
    }

    getClientesConCita() {
        return axios.get(this.baseUrl+"clientesConCita").then(res => {
            return res.data
        })
    }


    saveCliente(cliente) {
        return axios.post(this.baseUrl+"clientes", cliente, {headers:{"Content-Type" : "application/json"}}).then(res => {console.log(res.data)
    })
    }
    editCliente(cliente) {
        return axios.put(this.baseUrl +"clientes/"+cliente.id, cliente, {headers:{"Content-Type" : "application/json"}}).then(res => res.data)
    }
    deleteCliente(id) {
        return axios.delete(this.baseUrl+"clientes/"+id).then(res => res.data)
    }

    editPoliza(poliza) {
        return axios.put(this.baseUrl +"polizas/"+ poliza.id, poliza, {headers:{"Content-Type" : "application/json"}}).then(res => res.data)
    }

    deletePoliza(id) {
        return axios.delete(this.baseUrl+"polizas/"+id).then(res => res.data)
    }

    getCliente(id){
        return axios.get(this.baseUrl+"clientes/"+id).then( res => {
            return res.data
        })
    }

    getClientesConCita() {
        return axios.get(this.baseUrl+"clientesConCita").then(res => {
            return res.data
        })
    }

    savePoliza(poliza) {
        return axios.post(this.baseUrl+"polizas", poliza).then(res => {console.log(res.data)
    })
    }

    getPolizasCliente(id_cliente){
        return axios.get(this.baseUrl + "polizas/cliente/"+ id_cliente).then (res =>{
            return res.data
        })
    }

    getPolizasRenovar(){
        return axios.get(this.baseUrl+ "polizas/renovar").then( res => res.data)
    }

    getPolizasAnular(){
        return axios.get(this.baseUrl+ "polizas/anular").then( res => res.data)
    }

    
  

// De esta manera ya podemos consumir el nuestra API REST (Estamos llamando al servicio de obtener todos los seguros)





}