import Home from './pages/Home'
import Inventory from './pages/Inventory'
import Similar from './pages/Similar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/App.css'

const App = () => (
  <div className="app">
    <BrowserRouter>
      <Routes>
        <Route path="/inventory" element={<Inventory />}></Route>
        <Route path="/product/:id" element={<Similar />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  </div>
)

export default App
