import './App.css'
import  {Routes,Route, useLocation} from 'react-router-dom'
import ShowClients from './views/ShowClients/ShowClients'
import ShowBatidoras from './views/ShowBatidoras/ShowBatidoras'
import ShowReductores from './views/ShowReductores/ShowReductores'
import FormClient from './views/FormClient/FormClient'


function App() { 
  //hooks
  const location=useLocation()
  
  return (
    <div> 
      {
        location.pathname!=='/postClient' && (<>
          <button className='btn btn-primary'>Clientes</button>   
          <ShowClients/>
          <ShowBatidoras/>
          <ShowReductores/>
        
        </>)
      } 
      <Routes>
        <Route path='/postClient' element={<FormClient/>}/>
      </Routes>
    </div>
  )
}

export default App
