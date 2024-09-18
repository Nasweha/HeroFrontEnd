
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import DashBoard from './pages/DashBoard'

function App() {
  

  return (
    <>

    <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/dashboard' element={<DashBoard/>}/>
    </Routes>
      
    </>
  )
}

export default App
