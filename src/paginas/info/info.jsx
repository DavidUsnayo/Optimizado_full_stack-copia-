import styles from './info.module.css'
import { useContext } from 'react'

//CONTEXTO
import { Contexto } from '../../contexto/Contexto'

export function Info(){
    const { infoUser} = useContext(Contexto)
    
    return(
        <div className={styles.caja_info}>
            {
            infoUser ?
            <>
                <div className={styles.uno_info}> {infoUser.id} </div>
                <div className={styles.dos_info}> {infoUser.usuario} </div>
                <div className={styles.tres_info}>||</div>
                <div className={styles.cuatro_info}> {infoUser.rol} </div>
            </> : <p>Cargando INFO</p>
            }
        </div>
    )
}