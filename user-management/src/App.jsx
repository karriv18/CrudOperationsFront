import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import List from './Pages/List';
import Add from './Pages/Add';
import Edit from './Pages/Edit';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<List />} />
          <Route path='/User/Add' element={<Add />} />
          <Route path='/User/Edit/:id' element={<Edit />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
