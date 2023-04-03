import { Link } from "react-router-dom"

export default function Header (){
    return(
        <div className="header_integral">
            <div className="logo_image">
                <img className="logo" src={process.env.PUBLIC_URL + "/logo.png"} alt="logo" />
            </div>
            <div className="buttons">
                <div className="general_buttons">
                    <Link to="/"><button className="general_button"> Inicio </button></Link>
                    <button className="general_button"> Solicitar Cita </button>
                    <Link to ="/seguros"><button className="general_button"> Seguros </button></Link>
                </div>
                <div className="register_buttons">
                    <button className="register_button"> Sing In </button>
                    <button className="register_button"> Log In </button>
                </div>
            </div>
        </div>
    )
}
