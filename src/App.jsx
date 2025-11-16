//router imports
import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css'
import Home from './pages/home/Home.jsx';
import Cart from './pages/cart/Cart.jsx';
import Products from './pages/Products/Products.jsx';

function App() {
    return( 
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} >
            <Route index element={<Products />} />
            <Route path='cart' element={<Cart />} />
          </Route>
        </Routes>
    </BrowserRouter>
    );
  }

export default App
