import { Navigate, Outlet } from "react-router-dom"

export function ProtectedRoute({ user, children }) {
    if (user) {   //user tiene | true  o false   | existe el usuario y tiene el rol correcto?
        return children ? children : <Outlet />;
    } else {
        return <Navigate to="/dashboard/notas" />;
    }
}



//children | si hay hijos en el componente ProtectedRoute /proteger solo 1 ruta
//Outlet | si Link /protege varias rutas