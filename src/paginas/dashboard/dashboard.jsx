import { Outlet } from "react-router-dom"
import { Navegacion } from "../navegacion/navegacion"
import styles from './dashboard.module.css'

export function Dashboard(){
    return(
        <div style={{display:'flex', background:'rgb(243, 243, 243)'}}>
            <Navegacion/>
            <div className={styles.caja_subMenus}>
                <Outlet/>
            </div>
        </div>
    )
}