import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom';
import { Context } from '.';
import Home from './components/Home';
import RequireAuth from './components/RequireAuth';
import Products from './components/Products';

import './style/style.css';
import Navbar from './components/Navbar';
import Details from './components/Details';
import CreateProduct from './components/CreateProduct';


function App() {

  const { store } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  return (
    <div className='app auth'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products/:id' element={<Details />} />
        <Route path='/products' element={<RequireAuth>
          <Products />
        </RequireAuth>} />
        <Route path='/create/:id' element={<RequireAuth>
          <CreateProduct />
        </RequireAuth>} />
        <Route path='/create' element={<RequireAuth>
          <CreateProduct />
        </RequireAuth>} />
      </Routes>
    </div>
  );
}

export default observer(App)
