import './App.css'
import { Routes, Route, Navigate,} from 'react-router-dom'

//PAGINAS
import { Login } from './paginas/login/login'
import { Register } from './paginas/register/register'

import { Dashboard } from './paginas/dashboard/dashboard'

import { Notas } from './paginas/notas/notas'
import { Info } from './paginas/info/info'
import { Analisis } from './paginas/analisis/analisis'
import { Ajustes } from './paginas/ajustes/ajustes'
import { ProtectedRoute } from './componentes/ProtectedRoute'

//CONTEXTO
import { useContext } from 'react'
import { Contexto } from './contexto/Contexto'

function App() {
  //si no hay una ruta /verificarToken | se pdria usar la ruta /notas (si te sale el objeto de las
  //  notas, quiere decir que el token es valido)

  const {person} = useContext(Contexto)

  return (
      <Routes>
          <Route path='/' element={<Navigate to="/dashboard"/>}/>   {/* Redige a /dashboard */}

          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>

          <Route path='/dashboard' element={<Dashboard/>}>
              <Route index element={<Navigate to="notas" replace/>}/> {/* Redige a /dashboard/notas */}
              <Route path='notas' element={<Notas/>}/>
              <Route path='info' element={<Info/>}/>

              {/* RUTAS protegidas | con componente ProtectedRoute */}
              <Route path='analisis' 
                element={
                  <ProtectedRoute user={!!person && (person.rol.includes('analista') || person.rol.includes('admin'))}>     {/*de esta manera para proteger solo una ruta*/}
                      <Analisis/>
                  </ProtectedRoute>                   
                }
              />
              <Route path='ajustes' 
                element={
                    <ProtectedRoute user={!!person && person.rol.includes('admin')}>     {/*de esta manera para proteger solo una ruta*/}
                        <Ajustes/>
                    </ProtectedRoute>
                }/>
          </Route>
      </Routes>
  )
}

export default App


