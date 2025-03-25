import { useState, useEffect, useContext} from 'react'
import styles from './ajustes.module.css'

//CONTEXTO
import { Contexto } from '../../contexto/Contexto';

//libreria [toastify] para alerts
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Ajustes(){
    const { token, ajustesUI, ajustesColores } = useContext(Contexto)  
    const [bordeFondo, setBordeFondo] = useState('')
    const [colorTexto, setColorTexto] = useState('')

    const API_URL = import.meta.env.VITE_API_URL;

    // Cuando ajustesUI cambia, actualizamos el estado
    useEffect(() => {
        if (ajustesUI) {
            setBordeFondo(ajustesUI.borde);
            setColorTexto(ajustesUI.colorTexto);
        }
    }, [ajustesUI]);

    //CAMBIAR COLOR DE TEXTO
    function cambiarColorTexto(e){
        fetch(`${API_URL}/ajustes/updateColorTexto`, {
            method: "PUT",
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                colorTexto:colorTexto
            })
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            ajustesColores(token)
            toast.success('Color de Texto Cambiado', {position:'bottom-right', autoClose:1000})
        })
    }

    //CAMBIAR COLOR DE BORDER | FONDO
    function cambiarBorderFondo(){
        fetch(`${API_URL}/ajustes/updateBorde`,{
            method: "PUT",
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                borde:bordeFondo
            })
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            ajustesColores(token)
            toast.success('Color de Fondo Cambiado', {position:'bottom-right', autoClose:1000})
        })
    }

    //CAMBIAR TAMAÑO | ZOOM
    function cambiarZoom(valor){
        fetch(`${API_URL}/ajustes/updateZoom`,{
            method: "PUT",
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` },
            body: JSON.stringify({
                zoomCard:valor
            })
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            ajustesColores(token)
            toast.success('Zoom Cambiado', {position:'bottom-right', autoClose:1000})
        })
    }
    if(ajustesUI === null){
        return(<h2>CARGANDO UI AJUSTES</h2>)
    }

    return(
        <div className={styles.caja_ajustes}>
            <ToastContainer /> {/* componente de toast | libreria de Notificaciones  */}
            <div className={styles.borde}>
                <input type="color" onChange={(e)=>setColorTexto(e.target.value)} value={colorTexto} />
                <h4> {colorTexto} </h4>
                <button onClick={()=> cambiarColorTexto()}>Cambiar Color de Texto</button>
            </div>
            <div className={styles.borde}>
                <input type="color" onChange={(e)=>setBordeFondo(e.target.value)} value={bordeFondo} />
                <h4> {bordeFondo} </h4>
                <button onClick={()=> cambiarBorderFondo()}>Cambiar Border | Fondo</button>
            </div>
            <div className={styles.borde}>
                <div className={styles.zoom_ui}>
                    <p onClick={()=>cambiarZoom('0.6')}>A</p>
                    <p onClick={()=>cambiarZoom('1')}>A</p>
                    <p onClick={()=>cambiarZoom('1.4')}>A</p>
                </div>
                <p>Zoom Texto</p>
            </div>
        </div>
    )
}


//modificar : antes de entrar y hacer la peticion | verificar si hay un token en el localStorage