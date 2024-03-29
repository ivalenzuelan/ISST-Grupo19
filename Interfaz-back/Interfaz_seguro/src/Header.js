import { Link } from "react-router-dom"
import React, { useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';


export default function Header (){
    

  const navigate = useNavigate();


  const [loggedOut, setLoggedOut] = useState(false);
  const jwt = localStorage.getItem('token')
  const rol = localStorage.getItem('rol')
  const id = localStorage.getItem('id')
  const username = localStorage.getItem('nombreUsuario')
  const menu = useRef(null);
  //const router = useRouter();
  const toast = useRef(null);
  const items = [
    {
        label: 'Navigate',
        items: [
            {
              label: 'Volver a Inicio',
              icon: 'pi pi-home',
              url: '/'
            },
            {
              label: 'Seguros Ofrecidos',
              icon: 'pi pi-info-circle',
              url: '/segurosCorredor'
            },
            {
              label: 'Tareas',
              icon: 'pi pi-list',
              url: '/tareasCorredor'
            },
            {
              label: 'Clientes',
              icon: 'pi pi-users',
              url: '/clientesCorredor'
          }
        ]
    },
      {
          label: 'Options',
          items: [
              {
                  label: 'Log Out',
                  icon: 'pi pi-times',
                  command: () => {
                      toast.current.show({ severity: 'warn', summary: 'LogOut', detail: 'Se ha cerrado la sesión', life: 3000 });
                      handleLogout()
                  }
              }
          ]
      }
  ];


  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('id');
    setLoggedOut(true);
    navigate('/');
  }


    return(
      
    
        <div className="header_integral">
          <div className="logo_image">
                <img className="logo" src={process.env.PUBLIC_URL + "/logo.png"} alt="logo" />
          </div>
        {jwt ?
        <div>
        {rol == "ROLE_ADMIN" ?
    
            <div className="buttons">
                    
                    <Toast ref={toast}></Toast>
                    <Menu model={items} popup ref={menu} />
                    <Button label="Desplegar Menu" icon="pi pi-bars" onClick={(e) => menu.current.toggle(e)} />
            </div>
            :
            <div>
            <div className="buttons">
                <div className="general_buttons">
                    
                    <Link to={`/clientes/${id}`}><Button className="general_button" label="Mi informacion" text raised /></Link>
                    <Link to ="/seguros"><Button className="general_button" label= "Seguros" text raised/></Link>
                </div>
                <div className="register_buttons">
                    <Link to = "/"><Button className="register_button" onClick={handleLogout} text raised > Log Out </Button> </Link>
                </div>
            </div>
            </div>
            }
            </div>     
        :
        <div >
            <div className="buttons">
                <div className="general_buttons">
                    <Link to ="/seguros"><Button className="general_button" label= "Seguros" text raised/></Link>
                </div>
                <div className="register_buttons">
                    <Link to ="/signup"><Button className="register_button"> Sign-Up </Button></Link>
                    <Link to ="/login"><Button  className="register_button" > Login </Button></Link>
                </div>
            </div>
        </div>
        }
        </div>
    )
}
