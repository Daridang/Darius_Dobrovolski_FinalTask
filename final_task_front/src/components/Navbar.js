import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/navbar.css'
import { Context } from '..'
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom'


const Navbar = () => {
  const { store } = useContext(Context)

  const nav = useNavigate()
  const { state } = useLocation()

  async function logout() {
    store.logout().then(() => {
      nav(state?.path || '/')
    })
  }

  function create() {
    nav('/create')
  }

  const classNames = ({ isActive }) => {
    return isActive ? 'active_link' : ""
  }
  return (
    <header className='header shdw'>
      <div className="nav-wrapper">

        <nav className='navbar'>
          <ul>
            {
              store.isAuth &&
              <div>
                <button onClick={logout}>Logout</button>
                <button onClick={create}>Create</button>
              </div>
            }
            <NavLink className={classNames} to="/" >Home</NavLink>
            <NavLink className={classNames} to="/products">Products</NavLink>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default observer(Navbar)