import { observer } from 'mobx-react-lite'
import React, { useState, useContext } from 'react'
import { Context } from '..'
import Login from './Login'
import Register from './Register'

function Home() {
  const [login, setLogin] = useState(true)
  const { store } = useContext(Context)

  return (
    <div>
      {
        store.isAuth ? <div>Logged in as {store.user.name}</div> : <div>{
          login ? <Login /> : <Register />
        }
          <button onClick={() => setLogin(!login)}>{login ? 'Register' : 'Login'}</button></div>
      }

    </div>
  )
}

export default observer(Home)