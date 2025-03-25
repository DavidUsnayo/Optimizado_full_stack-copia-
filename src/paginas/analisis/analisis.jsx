import styles from './analisis.module.css'

//CONTEXTO
import { useContext } from 'react';
import { Contexto } from '../../contexto/Contexto';

export function Analisis(){
    const { analisis } = useContext(Contexto)
            
    return(
        <>
        <p className={styles.title}>ESTADISTICAS - analisis</p>
        <div className={styles.caja_analisis}>
            <div>
                <h2> {analisis.total_clientes} </h2>
                <p>Total Clientes</p>
            </div>
            <div>
                <h2> {analisis.total_notas} </h2>
                <p>Total Notas</p>
            </div>
            <div>
                <h2> {analisis.total_admins} </h2>
                <p>Total Admins</p>
            </div>
            <div>
                <h2>/</h2>
                <p>Total Endpoints</p>
            </div>
        </div>
        </>
    )
}