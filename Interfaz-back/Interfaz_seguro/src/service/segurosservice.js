import axios from 'axios';




export class SeguroService {

    // Aqui tenemos que poner la URL donde esté expuesta nuestra API

    baseUrl = "https://localhost:8443/";


    getAll() {
        return axios.get(this.baseUrl+"seguros").then(res => {
            return res.data
        })
    }

    getIdUser(username){
        return axios.get(this.baseUrl+"idClienteus/"+ username).then(res => {
            return res.data
        })
    }

    getTipo(tipo){
        return axios.get(this.baseUrl+"seguros/tipo/"+ tipo).then(res => {
            return res.data
        })
    }

    save(seguro) {
        const jwt = localStorage.getItem('token')
        return axios.post(this.baseUrl+"seguros", seguro, {headers:{"Content-Type" : "application/json", 'Authorization': `Bearer ${jwt}`}}).then(res => {console.log(res.data)
    })
    }
    editSeguro(seguro) {
        const jwt = localStorage.getItem('token')
        return axios.put(this.baseUrl+"seguros/"+seguro.id, seguro, {headers:{"Content-Type" : "application/json", 'Authorization': `Bearer ${jwt}`}}).then(res => {console.log(res.data)
    })
    }

    delete(id) {
        const jwt = localStorage.getItem('token')
        return axios.delete(this.baseUrl+"seguros/"+id, {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
        }).then(res => res.data)
    }

    getAllClientes() {
        const jwt = localStorage.getItem('token')
        return axios.get(this.baseUrl+"clientes", {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
        }).then(res => {
            return res.data
        })
    }

    getClientesConCita() {
        const jwt = localStorage.getItem('token')
        return axios.get(this.baseUrl+"clientesConCita", {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
        }).then(res => {
            return res.data
        })
    }


    saveCliente(cliente) {
        const jwt = localStorage.getItem('token')
        return axios.post(this.baseUrl+"clientes", cliente, {headers:{"Content-Type" : "application/json", 'Authorization': `Bearer ${jwt}`}}).then(res => {console.log(res.data)
    })
    }
    editCliente(cliente) {
        const jwt = localStorage.getItem('token')
        return axios.put(this.baseUrl +"clientes/"+cliente.id, cliente, {headers:{"Content-Type" : "application/json", 'Authorization': `Bearer ${jwt}`}}).then(res => res.data)
    }
    deleteCliente(id) {
        const jwt = localStorage.getItem('token')
        return axios.delete(this.baseUrl+"clientes/"+id, {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
        }).then(res => res.data)
    }

    editPoliza(poliza) {
        const jwt = localStorage.getItem('token')
        return axios.put(this.baseUrl +"polizas/"+ poliza.id, poliza, {headers:{"Content-Type" : "application/json", 'Authorization': `Bearer ${jwt}`}}).then(res => res.data)
    }

    deletePoliza(id) {
        const jwt = localStorage.getItem('token')
        return axios.delete(this.baseUrl+"polizas/"+id, {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
        }).then(res => res.data)
    }

    getCliente(id){
        const jwt = localStorage.getItem('token')
        return axios.get(this.baseUrl+"clientes/"+id, {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
        }).then( res => {
            return res.data
        })
    }

    getClientesConCita() {
        const jwt = localStorage.getItem('token')
        return axios.get(this.baseUrl+"clientesConCita", {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
        }).then(res => {
            return res.data
        })
    }

    savePoliza(poliza) {
        const jwt = localStorage.getItem('token')
        return axios.post(this.baseUrl+"polizas", poliza, {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
        }).then(res => {console.log(res.data)
    })
    }

    getPolizasCliente(id_cliente){
        const jwt = localStorage.getItem('token')
        return axios.get(this.baseUrl + "polizas/cliente/"+ id_cliente, {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
        }).then (res =>{
            return res.data
        })
    }

    getPolizasRenovar(){
        const jwt = localStorage.getItem('token')
        return axios.get(this.baseUrl+ "polizas/renovar", {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
        }).then( res => res.data)
    }

    getPolizasAnular(){
        const jwt = localStorage.getItem('token')
        return axios.get(this.baseUrl+ "polizas/anular", {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
        }).then( res => res.data)
    }

    getPolizasSinSolicitud(){
        const jwt = localStorage.getItem('token')
        return axios.get(this.baseUrl+ "polizas/anularNoSolicitadas", {
            headers: {
              'Authorization': `Bearer ${jwt}`
            }
        }).then( res => res.data)
        
    }

    
  

// De esta manera ya podemos consumir el nuestra API REST (Estamos llamando al servicio de obtener todos los seguros)





}