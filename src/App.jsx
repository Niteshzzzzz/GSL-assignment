import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Nav from './components/Nav'
import Details from './components/Details'
import CartPage from './components/CartPage'

function App() {
  const [cartCount, setCartCount] = useState(0)

  return (
    <div className='container'>
      <Nav cartCount={cartCount} setCartCount={setCartCount} />
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/cart' element={<CartPage setCartCount={setCartCount} />} ></Route>
        <Route path='/details/:id' element={<Details cartCount={cartCount} setCartCount={setCartCount} />} ></Route>
      </Routes>
    </div>
  )
}

export default App
