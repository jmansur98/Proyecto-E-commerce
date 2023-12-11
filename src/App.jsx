import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemCount from './componert/ItemCount/ItemCount';
import NavBar from './componert/NavBar/NavBar';
import './App.css';
import ItemListContainer from './componert/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './componert/ItemDetailContainer/ItemDetailContainer';
import Productos from './pages/productos';
import Usuario from './pages/usuario';
import { getproducts } from '../src/asyncmocks'

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [product, setproducts] = useState ([])

  useEffect (()=> {
      getproducts ()
      .then(Response => {
          setproducts(Response)
      })
      .catch(Error => {
           console.error();
      })
  }, [])
  const handleAddToCart = (count) => {
    setCartCount(count);
  };
  
  return (
    <Router>
      <div className='App'>
        <NavBar cartCount={cartCount} />
        <div className='content-container'>
          <Routes>
            <Route path="/" element={<ItemListContainer product={product} greeting={'Bienvenido'} />} />
            <Route path="/category/:id" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/usuario" element={<Usuario />} />
            <Route path="/carrito" element={<ItemCount initial={0} stock={10} onAdd={handleAddToCart} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;