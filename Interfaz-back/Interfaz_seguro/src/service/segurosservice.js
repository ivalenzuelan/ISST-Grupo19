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
        return axios.get(this.baseUrl+"seguros/"+ tipo).then(res => {
            return res.data
        })
    }

    save(seguro) {
        console.log(seguro)
        return axios.post(this.baseUrl+"seguros/new", seguro, {headers:{"Content-Type" : "application/json"}}).then(res => {console.log(res.data)
    })
    }

    getAllClientes() {
        return axios.get(this.baseUrl+"clientes").then(res => {
            return res.data
        })
    }


    saveCliente(cliente) {
        return axios.post(this.baseUrl+"clientes", cliente, {headers:{"Content-Type" : "application/json"}}).then(res => {console.log(res.data)
    })
    }



// De esta manera ya podemos consumir el nuestra API REST (Estamos llamando al servicio de obtener todos los seguros)





}