import './App.css'
import  {Routes,Route} from 'react-router-dom'
import ShowClient from './components/ShowClient/ShowClient'

function App() { 
  
  return (
    <div>  
      <Routes>
        <Route path='/' />
      </Routes>
      <button className='btn btn-primary'>Clientes</button>   
      <ShowClient/>
    </div>
  )
}

export default App
