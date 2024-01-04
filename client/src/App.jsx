import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import ShowClients from './views/ShowClients/ShowClients'
import ShowBatidoras from './views/ShowBatidoras/ShowBatidoras'
import ShowReductores from './views/ShowReductores/ShowReductores'
import FormClient from './views/FormClient/FormClient'
import FormBatidora from './views/FormBatidora/FormBatidora'
import FormReductor from './views/FormReductor/FormReductor'
import NavBar from './views/NavBar/NavBar'

function App() {
  //hooks
  const location = useLocation()

  return (
    <div className='d-flex flex-column align-items-center'>
      <NavBar />      
      <Routes>
        <Route path='/' element={<ShowClients />} />
        <Route path='/postCliente' element={<FormClient />} />
        <Route path='/postBatidora' element={<FormBatidora />} />
        <Route path='/postReductor' element={<FormReductor />} />
        <Route path='/batidoras' element={<ShowBatidoras />} />
        <Route path='/reductores' element={<ShowReductores />} />
      </Routes>
    </div>
  )
}

export default App
