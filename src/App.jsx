 import React from 'react'
 import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'


 const App = () => {
   return (
     <BrowserRouter>
     <Navbar />
       <Routes>
         <Route path="/" element={<h1>Home</h1>} />
         <Route path="/products" element={<h1>Products</h1>} />
         <Route path="/about" element={<h1>About</h1>} />
         <Route path="/contact" element={<h1>Contact</h1>} />
         <Route path="/cart" element={<h1>Cart</h1>} />
       </Routes>
     </BrowserRouter>
   );
 }
 
 export default App