import {Navigate} from "react-router-dom"

const ProtectedRoute = ({children}) =>{
    const isAunthenticated = localStorage.getItem("authenticated");
    return isAunthenticated ? children : <Navigate to="/" />
    // se for true renderiza o component children, senão vai pra para a pagina de login
    // ? é uma condicional "if", : como se fosse um "else"   
}

export default ProtectedRoute;