import { useState } from 'react'
import Navbar from './component/Navbar'
import Todo from './component/Todo'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
   <Todo />
    </>
  )
}

export default App
