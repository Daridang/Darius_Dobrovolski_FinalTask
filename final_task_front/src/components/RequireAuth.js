import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Context } from '..'

function RequireAuth({ children }) {
  const { store } = useContext(Context)
  const location = useLocation()

  return store.isAuth ? children : <Navigate to="/" replace state={{ path: location.pathname }} />
}

export default RequireAuth