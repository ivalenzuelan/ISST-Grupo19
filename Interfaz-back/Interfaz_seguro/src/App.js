import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from "react"
import {Routes, Route} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import SeguroTipo from './SeguroTipo.js';
import Seguros from './Seguros.js';
import NoMatch from './NoMatch';
import Inicio from './Inicio';
import {mockdata1} from './constants/seguros'
import {SeguroService} from './service/segurosservice'

function App() {

  const [loading, setLoading] = useState(true);
  const [seguro, setSeguro] = useState({});
  const url = new SeguroService()

  const callServer = async (param) =>{
        await url.getAll().then(data => {
          setSeguro({seguros: data})
        })
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
          <Route path="/seguros" element={<Seguros/>} />
          <Route path="/seguros/:tipo" element={<SeguroTipo losseguros={seguro.seguros}/>} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
    }
      <Footer/>
    </div>
  );
}

export default App;
