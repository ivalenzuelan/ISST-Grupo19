import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from "react"
import {Routes, Route} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import SegurosTipo from './UserView/SegurosTipo';
import SegurosUnTipo from './UserView/SegurosUnTipo';
import NoMatch from './NoMatch';
import Inicio from './UserView/Inicio';
import {mockdata1} from './constants/seguros'
import {SeguroService} from './service/segurosservice'
import SegurosCorredor from './CorredorView/SegurosCorredor';
import ClientesCorredor from './CorredorView/ClientesCorredor';
import EditarCliente from './CorredorView/EditarCliente';
import TareasPendientes from './CorredorView/TareasPendientes';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import PolizasContratadas from './ClienteView/PolizasContratadas';


import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import Login from './Login';
import Signup from './Signup';



function App() {

  const [loading, setLoading] = useState(true);
  const [seguro, setSeguro] = useState({});
  const url = new SeguroService()

  const callServerSeguros = async (param) =>{
        await url.getAll().then(data => {
          setSeguro({seguros: data})
        })
    }


    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('https://34.175.88.214:8443/login', {
            method: 'GET',
            credentials: 'include' // send cookies with the request
          });
    
          if (response.ok) {
            const cookie = response.headers.get('Set-Cookie');
            // save the cookie in local storage
            localStorage.setItem('myCookie', cookie);
          }
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    
      fetchData();
    }, []);
    
  const navigate=useNavigate()

  return (
    <div className="App">
      <Header/>
      {loading ? <Header/> :
       <Routes>
          <Route path="/" element={<Inicio/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/seguros" element={<SegurosUnTipo/>} />
          <Route path="/seguros/tipo/:tipo" element={<SegurosTipo losseguros={seguro.seguros}/>} />
          <Route path="/segurosCorredor" element={<SegurosCorredor losseguros={seguro.seguros}/>} />
          <Route path="/clientesCorredor" element={<ClientesCorredor />} />
          <Route path="/tareasCorredor" element={<TareasPendientes/>} />
          <Route path="/clientesCorredor/:id" element={<EditarCliente losseguros={seguro.seguros}/>}/>
          <Route path="/clientes/:id" element={<PolizasContratadas />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
    }
      <Footer/>
    </div>
  );
}

export default App;
