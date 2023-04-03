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

function App() {



  const navigate=useNavigate()

  return (
    <div className="App">
      <Header/>
       <Routes>
          <Route path="/" element={<Inicio/>} />
          <Route path="/seguros" element={<Seguros/>} />
          <Route path="/seguros/:tipo" component={<SeguroTipo/>} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;