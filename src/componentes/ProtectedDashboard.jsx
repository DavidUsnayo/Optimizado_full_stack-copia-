import { Navigate, Outlet } from "react-router-dom";

//CONTEXTO
import { useContext } from "react";
import { Contexto } from "../contexto/Contexto";

export function ProtecteDashboard() {
    const { token, person } = useContext(Contexto)
    if (!token && !person) {
        console.log('No tienes Token y usuario %cProtected Route', 'color:#fca903; border-bottom:1px solid black');
    }else{console.log('%cAUTORIZADO', 'color:#09d67a')}
    return token && person ? <Outlet /> : <Navigate to="/login" replace />;
}

//aqui ya protegemos las rutas/ entonces quiza habria que hacer algun cambio en el contexto
//en autenticacion

//dice que mejor seira direccionar desde el protected dashboard