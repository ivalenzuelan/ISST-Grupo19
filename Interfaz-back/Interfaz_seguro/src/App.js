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



function App() {

  const [loading, setLoading] = useState(true);
  const [seguro, setSeguro] = useState({});
  const [cliente, setCliente] = useState({});
  const url = new SeguroService()

  const callServerSeguros = async (param) =>{
        await url.getAll().then(data => {
          setSeguro({seguros: data})
        })
    }
    const callServerClientes = async (param) =>{
      await url.getAllClientes().then(data => {
        setCliente({clientes: data})   
      })
  }

  useEffect(() => {
      function fetchData() {	
        callServerSeguros();
          setTimeout(()=>{
            setLoading(false);
          },50);		
        callServerClientes();
        setTimeout(()=>{
          setLoading(false);
        },50);
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
          <Route path="/seguros" element={<SegurosUnTipo/>} />
          <Route path="/seguros/tipo/:tipo" element={<SegurosTipo losseguros={seguro.seguros}/>} />
          <Route path="/segurosCorredor" element={<SegurosCorredor losseguros={seguro.seguros}/>} />
          <Route path="/clientesCorredor" element={<ClientesCorredor losclientes={cliente.clientes}/>} />
          <Route path="/tareasCorredor" element={<TareasPendientes/>} />
          <Route path="/clientesCorredor/:id" element={<EditarCliente losseguros={seguro.seguros}/>}/>
          <Route path="/clientes/:id" element={<PolizasContratadas losclientes={cliente.clientes}/>} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
    }
      <Footer/>
    </div>
  );
}

export default App;
