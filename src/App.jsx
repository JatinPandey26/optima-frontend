import { useState } from 'react'
import './App.css'
import Sender from './pages/sender/Sender'
import Receiver from './pages/Receiver/Receiver'

function App() {
  const [count, setCount] = useState(0)



  return (
    <div className='optima-container'>
      <h1>Optima</h1>

      <div className="main-container">
      <Sender/>
      <Receiver/>
      </div>
    </div>
  )
}

export default App
