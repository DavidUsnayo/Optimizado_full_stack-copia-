import { useEffect, useState } from 'react'
import styles from './notas.module.css'

//CONTEXTO
import { useContext } from 'react';
import { Contexto } from '../../contexto/Contexto';

export function Notas(){

    const { token, notas, ajustesUI, mostrarNotas } = useContext(Contexto)

    const [textoNota, setTextoNota] = useState('') //input
    const API_URL = import.meta.env.VITE_API_URL;

    //AGREGAR NOTAS
    function agregarNota(){
        if(textoNota == ''){
            console.log('llenar')
        }else{
            fetch(`${API_URL}/notas/crearNota`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    titulo:textoNota
                })
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                mostrarNotas(token)
            })
            setTextoNota('')
        }
    }

    //ELIMINAR NOTA
    function eliminarNota(id){
        fetch(`${API_URL}/notas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            mostrarNotas(token)
        })
    }

    return(
        <>
            <div className={styles.caja_notas}>
                <div className={styles.buscador}>
                    <input type="text" value={textoNota} placeholder='escribe' onChange={(e)=>setTextoNota(e.target.value)} />
                    <button onClick={()=>agregarNota()}>Agregar</button>
                </div>
                <div className={styles.lista}>
                    { notas && ajustesUI ?
                    notas.length == 0 ? <p style={{margin:'20px auto',}}>No Hay Notas</p> : 
                    notas.map((item,index)=>{
                        return(
                            <div style={{background:ajustesUI.borde, zoom:ajustesUI.zoomCard, border:`1px solid ${ajustesUI.borde}`}} className={styles.nota} key={index} >
                                <p style={{color:ajustesUI.colorTexto}} > {item.titulo} </p>
                                <h4 onClick={()=> eliminarNota(item.id)} style={{border:`1px solid ${ajustesUI.colorTexto}`, color: ajustesUI.colorTexto}}>x</h4>
                            </div>
                        )
                    }): <p>CARGANDO</p>
                    }
                </div>
            </div>
        </>
    )
}