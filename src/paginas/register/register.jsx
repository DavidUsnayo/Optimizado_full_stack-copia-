import { useState, useContext, useEffect} from 'react'
import { Contexto } from '../../contexto/Contexto'
import styles from '../login/login.module.css'
import ver from '../../assets/iconos/mostrar.png'
import { Link, useNavigate } from 'react-router-dom'


export  function Register(){
    const { almacenarInfoEnContexto, token, person} = useContext(Contexto)
    const [usuario, setUsuario] = useState('')
    const [clave, setClave] = useState("")
    const [rol, setRol] = useState('usuario')
    const [visible, setVisible] = useState(false);

    const [carga, setCarga] = useState(false)

    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(()=>{
        if(person && token){
            navigate('/dashboard/notas')
        }
    },[])

    function crearCuenta(e){
        e.preventDefault()
        setCarga(true)
        fetch(`${API_URL}/auth/registro`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: usuario,
                contrasena: clave,
                rol:[rol]
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            localStorage.setItem('token',data.token)
            localStorage.setItem('person',JSON.stringify(data.person))
            return almacenarInfoEnContexto()
        })
        .then(()=>{
            navigate('/dashboard/notas')
        })
        .catch((err)=>{console.log('se produjo un error en fetch ', err)})
        .finally(()=>{setCarga(false)})

    }

    return(
        <>
            <div className={styles.iniciarSesion}>
                <h1>CREAR NUEVA CUENTA </h1> 
                <form className={styles.formulario_sesion}>
                    <input type="text" placeholder="Usuario" value={usuario} onChange={(e)=>setUsuario(e.target.value)}/>
                    <div>
                        <input style={{marginLeft:'35px'}} type={visible ? "text" : "password"} placeholder="Contreseña" value={clave} onChange={(e)=> setClave(e.target.value) }/> 
                        <label className={styles.mirrar} onClick={()=> setVisible(!visible)}> <img src={ver} width="22" /> </label>
                    </div>
                    <div className={styles.rol}>
                        <p>Rol de Usuario</p>
                        <select value={rol} onChange={(e)=>setRol(e.target.value)}>
                            <option value="usuario">Usuario</option>
                            <option value="analista">Analista</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button onClick={(e)=>crearCuenta(e)}>{carga ? 'Creando...' : 'Crear Cuenta'}</button>
                </form>
                <Link to='/login' className={styles.crear}>Iniciar Sesion</Link>
            </div>
        </>
    )
}