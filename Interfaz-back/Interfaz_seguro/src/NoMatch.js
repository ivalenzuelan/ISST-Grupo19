import { Link } from 'react-router-dom';

export default function NoMatch(props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
      <img src={process.env.PUBLIC_URL + "/perrito.jpeg"} alt="perrito" style={{ width: '350px' }} />
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>SEGURO que no es por aquí</p>
      <Link to="/">
        <button id="volver">Volver</button>
      </Link>
    </div>
  );
}
