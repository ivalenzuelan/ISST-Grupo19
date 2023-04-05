import { Link } from "react-router-dom"
import { Button } from "primereact/button"

export default function Header (){
    return(
        <div className="header_integral">
            <div className="logo_image">
                <Link to="/"><img className="logo" src={process.env.PUBLIC_URL + "/logo.png"} alt="logo" /></Link>
            </div>
            <div className="buttons">
                <div className="general_buttons">
                    
                    <Button className="general_button" label="Solicitar Cita" text raised disabled/>
                    <Link to ="/seguros"><Button className="general_button" label= "Seguros" text raised/></Link>
                </div>
                <div className="register_buttons">
                    <Button className="register_button" text raised disabled> Sing In </Button>
                    <Button className="register_button" text raised disabled> Log In </Button>
                </div>
            </div>
        </div>
    )
}
