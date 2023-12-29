import './App.css'
import  {Routes,Route} from 'react-router-dom'
import ShowClients from './views/ShowClients/ShowClients'
import ShowBatidoras from './views/ShowBatidoras/ShowBatidoras'
import ShowReductores from './views/ShowReductores/ShowReductores'


function App() { 
  
  return (
    <div>  
      <Routes>
        <Route path='/' />
      </Routes>
      <button className='btn btn-primary'>Clientes</button>   
      <ShowClients/>
      <ShowBatidoras/>
      <ShowReductores/>
    </div>
  )
}

export default App
