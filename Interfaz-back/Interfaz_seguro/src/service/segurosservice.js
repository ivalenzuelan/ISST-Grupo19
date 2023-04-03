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



// De esta manera ya podemos consumir el nuestra API REST (Estamos llamando al servicio de obtener todos los seguros)





}