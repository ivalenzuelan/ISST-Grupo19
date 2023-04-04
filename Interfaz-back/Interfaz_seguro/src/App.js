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

function App() {

  const [loading, setLoading] = useState(true);
  const [seguro, setSeguro] = useState({});
  const[cliente, setCliente] = useState({});
  const url = new SeguroService()

  const callServer = async (param) =>{
        await url.getAll().then(data => {
          setSeguro({seguros: data})
        })
        await url.getAllClientes().then(data => {
          setCliente({clientes: data})
        })
        console.log(cliente)
        console.log(seguro.seguros)
    }

  useEffect(() => {
      function fetchData() {	
        callServer();
          setTimeout(()=>{
            setLoading(false);
          },20);		
      }
  
      fetchData();
    }, []);

  const navigate=useNavigate()

  return (
    <div className="App">
      <Header/>
      {loading ? <Header/> :
       <Routes>
        {console.log(seguro.seguros)}
          <Route path="/" element={<Inicio/>} />
          <Route path="/seguros" element={<SegurosUnTipo/>} />
          <Route path="/seguros/:tipo" element={<SegurosTipo losseguros={seguro.seguros}/>} />
          <Route path="/segurosCorredor" element={<SegurosCorredor losseguros={seguro.seguros}/>} />
          <Route path="/clientesCorredor" element={<ClientesCorredor losclientes={cliente.clientes}/>} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
    }
      <Footer/>
    </div>
  );
}

export default App;
