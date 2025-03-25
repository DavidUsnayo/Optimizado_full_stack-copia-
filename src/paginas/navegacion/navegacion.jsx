import styles from './navegacion.module.css'
import { Link, useLocation, useNavigate } from "react-router-dom"

//CONTEXTO
import { useContext, useEffect, useState } from 'react'
import { Contexto } from '../../contexto/Contexto'

export function Navegacion(){
    const { person, setPerson, setToken, setNotas } = useContext(Contexto)
    
    const location = useLocation()
    const navigate = useNavigate()

    function activar(ruta){   //esto es el cambio de color de fondo del link 
        return location.pathname === '/dashboard'+ruta ? styles.push : '';  
    }

    function cerrarSesion(){  //Click | botone cerrar sesion
        localStorage.clear()
        setPerson(null)
        setToken(null)
        setNotas([])
        navigate('/login')
    }
    
    const rutas = [
        { to: 'notas', texto: '◼ Notas', roles: [] }, // Acceso para todos
        { to: 'info', texto: '◼ Informacion', roles: [] }, // Acceso para todos
        { to: 'analisis', texto: '◼ Analisis', roles: ['analista', 'admin'] },
        { to: 'ajustes', texto: '◼ Ajustes', roles: ['admin'] }
    ];

    return(
        <div className={styles.caja_navegacion}>
            <div className={styles.contenedor_links}>
                <h3>INTERFACE</h3>
                {person ? (<p> {person.usuario} | {person.rol[0]} </p>) : null}  
                {person ? (rutas.map((link, index) => (
                    (link.roles.length === 0 || person.rol.some(arrayRol => link.roles.includes(arrayRol))) && (
                    <Link key={index} to={link.to} className={activar(`/${link.to}`)}>
                        {link.texto}
                    </Link>
                    )
                    ))) : <p> Loading...</p>
                }
            </div>
            <button className={styles.cerrar_sesion} onClick={()=>cerrarSesion()}>Cerrar Sesion</button>
        </div>
    )
}