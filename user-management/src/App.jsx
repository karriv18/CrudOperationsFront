import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
