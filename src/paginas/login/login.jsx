import styles from './login.module.css'
import ver from '../../assets/iconos/mostrar.png'
import progress from '../../assets/iconos/progress.gif'
import puntos from '../../assets/iconos/puntos.gif'
import {useNavigate, Link  } from 'react-router-dom';
import { useEffect, useState } from 'react';

//libreria [toastify] para alerts
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//CONTEXTO
import { useContext } from 'react';
import { Contexto } from '../../contexto/Contexto';

export function Login(){
    const {almacenarInfoEnContexto, person, token } = useContext(Contexto)
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false);
    const [clave, setClave] = useState("")
    const [usuario, setUsuario] = useState("")

    const [loading, setLoading] = useState(false)
    const [carga, setCarga] = useState(false)

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(()=>{   //si hay token y person /no direcciona al dashboard
        if(person && token){
            navigate('/dashboard/notas')
        }
    },[])
    
    //al entrar tarda en comparara usuario/contraseña | quiza un loading seria bueno
    function iniciarCuenta(e){
        e.preventDefault()
        if(clave == '' || usuario == ''){
            toast.info('Porfabor Llenar el Campo', {position:'top-center', autoClose:2500})
        }else{
            setCarga(true)
            fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    usuario: usuario,
                    contrasena: clave
                })
            })
            .then(response => response.json())  // Convertir la respuesta a JSON
            .then(data =>{
                if(data.token){
                    console.log("Respuesta del servidor:", data)
                    localStorage.setItem("token",data.token)  //token
                    localStorage.setItem('person',JSON.stringify(data.person)) //person
                    setLoading(true)
                    return almacenarInfoEnContexto()
                }else{
                    console.log(data.message)
                    toast.error(data.message, {position: 'top-center', autoClose: 2500,})
                }
            })
            .then(()=>{
                if (!localStorage.getItem("token")) return;
                navigate('/dashboard/notas');
            })
            .catch((err)=>{
                console.log("error en el sevidor", err)
                toast.warning('Error en el Servidor!')
                setCarga(false)
            })
            .finally(()=>{setLoading(false); setCarga(false)})
        }
    }


    return(
        <>
        {loading === true ? 
            <div style={{display:'flex', justifyContent:'center',alignItems:'center',height:'90vh'}}>
                    <img src={progress} width='200'/> 
            </div> 
            : 
            <div className={styles.iniciarSesion}>
                <ToastContainer />
                <h1>INCIAR SESION </h1> 
                <form className={styles.formulario_sesion}>
                    <input type="text" placeholder="Usuario" value={usuario} onChange={(e)=>setUsuario(e.target.value)}/>
                    <div>
                        <input style={{marginLeft:'35px'}} type={visible ? "text" : "password"} placeholder="Contreseña" value={clave} onChange={(e)=> setClave(e.target.value) }/> 
                        <label className={styles.mirrar} onClick={()=> setVisible(!visible)}> <img src={ver} width="22" /> </label>
                    </div>
                    {carga ? <img src={puntos} width='60'/> :<button onClick={(e)=>iniciarCuenta(e)}> ENTRAR </button>}
                </form>
                <Link to='/register' className={styles.crear}>Crear Cuenta</Link>
                <details className={styles.detalle} >
                    <summary>Escoger Usuario de Prueba</summary>
                    <div onClick={()=> {setUsuario('ADMIN'), setClave('admin')}}> <p>ADMIN</p> <small>admin</small> </div>
                    <div onClick={()=> {setUsuario('David'), setClave('dav25')}}> <p>David</p> <small>analista</small> </div>
                    <div onClick={()=> {setUsuario('poco'), setClave('poco')}}> <p>poco</p> <small>usuario</small> </div>
                </details>
            </div>
            }
        </>
    )
}