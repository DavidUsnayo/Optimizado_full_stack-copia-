import progress from '../assets/iconos/progress.gif'
import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Contexto = createContext();

export function VaribalesContexto({ children }) {
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL;

    const [token, setToken] = useState(null);
    const [person, setPerson] = useState(null);
    const [cargando, setCargando] = useState(true);

    //para almacenar lo qeu biene de la base de datos | traido con fetch
    const [notas, setNotas] = useState([])
    const [ajustesUI, setAjustesUI] = useState(null)
    const [infoUser, setInfoUser] = useState(null)
    const [analisis, setAnalisis] = useState('')

    //TRAER NOTAS
    function mostrarNotas(codigo){
        fetch(`${API_URL}/notas`, {
            method: "GET",
            headers: { Authorization: `Bearer ${codigo}` }
        })
        .then(res => res.json())
        .then(data => {
            setNotas(data);
            console.log(data)
        })
        .catch((err)=> console.log(err))
    }

    //AJUSTES
    function ajustesColores(codigo){
        fetch(`${API_URL}/ajustes`,{
            method: "GET",
            headers: { Authorization: `Bearer ${codigo}`}
        })
        .then(res => res.json())
        .then(data => {
            console.log('cargar: [color, fondo, zoom]: ',data)
            setAjustesUI(data)
        })
    }

    //MOSTRAR INFO
    function mostrarInfo(codigo){
        fetch(`${API_URL}/info`,{
            method:'GET',
            headers: { Authorization: `Bearer ${codigo}`}
        })
        .then(res => res.json())
        .then((data) => {
            console.log('infoUser ',data)
            setInfoUser(data.user)
        })
    }

    //ESTADISTICAS - Analisis
    function mostrarEstadisticas(codigo){
        fetch(`${API_URL}/analisis`,{
            method: "GET",
            headers: { Authorization: `Bearer ${codigo}` }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setAnalisis(data)
        })
    }

    //AUNTENTICACION 
    async function almacenarInfoEnContexto() {
        const clave = localStorage.getItem("token");
        const usuarioString = localStorage.getItem("person");

        try {
            const usuario = JSON.parse(usuarioString);
            //si pasa este if | quiere decir que existe: token o clave y usuario esta perfecto
            if (clave && typeof usuario === 'object' && Array.isArray(usuario.rol)) { //si hay token y perosn, es correcto
                //verificar que el token sea correcto
                try {
                    const res = await fetch(`${API_URL}/info`, {
                        method: 'GET',
                        headers: { Authorization: `Bearer ${clave}` }
                    });
                    if (res.ok) {  //token correcto | OK
                        //AQUI es si todo sale correcto | entonces cargan los childrens o componentes(rutas)
                        console.log('Token y usuario validos 😎');
                        setToken(clave);
                        setPerson(usuario);
                        //peticiones 
                        mostrarNotas(clave)
                        ajustesColores(clave)
                        mostrarInfo(clave)
                        if(usuario.rol.includes('analista') || usuario.rol.includes('admin')){
                            mostrarEstadisticas(clave)
                        }
                    } else {
                        localStorage.removeItem('token')
                        navigate('/login')
                        throw new Error("Token inválido o expirado :(");
                    }
                } catch (err) {
                    console.error("Error en FETCH al obtner Info", err);
                }
            } else {
                navigate('/login')
                console.log('Objeto person Tiene un fallo o no hay TOKEN %c[Fallo en Array(rol)]','background-color:#dedede; padding:3px' )
            }
        } catch (err) {
            navigate('/login')
            console.log(' person | NO es un OBJETO correcto en localStorage', 'background-color: gold; padding:5px');
            setToken(null);
            setPerson(null);
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        almacenarInfoEnContexto();
        console.log("Cargando datos del localStorage en el CONTEXTO ...");
    }, []);

    return (
        <Contexto.Provider value={{ 
                person, setPerson, token, setToken, 
                notas, ajustesUI, infoUser, analisis, setNotas,
                mostrarNotas, ajustesColores, mostrarInfo, mostrarEstadisticas,
                almacenarInfoEnContexto
            }}>
            {cargando ? 
                <div style={{display:'flex', justifyContent:'center',alignItems:'center',height:'90vh'}}>
                    <img src={progress} width='300'/> 
                </div> : children}
        </Contexto.Provider>
    );
}


