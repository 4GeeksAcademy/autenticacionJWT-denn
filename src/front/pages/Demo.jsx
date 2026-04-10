
import { useNavigate } from "react-router-dom";
import "../styles.css/demo.css"

export const Demo = () => {
    const navigate = useNavigate()
 
    const handleLogout = () => {
        sessionStorage.removeItem("token")
        navigate("/")
    }
 
    return (
        <div className="private-wrapper">
 
            <div className="private-top">
                <span className="private-label">JWT by denn</span>
                <span className="private-status">Sesión activa</span>
            </div>
 
            <div className="private-center">
                <h1 className="private-heading">
                    Estás dentro<br />del sistema
                </h1>
            </div>
 
            <div className="private-bottom">
                <p className="private-subtitle">
                    Autenticado correctamente mediante JSON Web Token.
                </p>
                <button className="btn-logout" onClick={handleLogout}>
                    Cerrar sesión
                </button>
            </div>
 
        </div>
    )
}
