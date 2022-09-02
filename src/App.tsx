import { useState} from 'react'
import Routing from './routes/index';
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  
  return (
    <Routing />
  )
}

export default App
