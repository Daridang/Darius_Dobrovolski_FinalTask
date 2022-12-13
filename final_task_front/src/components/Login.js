import React, { useRef, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Context } from '..'

function Login() {
  const { store } = useContext(Context)
  const { state } = useLocation()
  const nav = useNavigate()

  const emailInput = useRef()
  const passInput = useRef()

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    store.login(
      emailInput.current.value,
      passInput.current.value
    ).then(() => {
      nav(state?.path || '/products')
    })
  }
  return (
    <form className='login-form shdw' onSubmit={handleOnSubmit}>
      <h4>Log in</h4>
      <input ref={emailInput} type='text' placeholder='Email' required />
      <input ref={passInput} type='password' placeholder='Password' required />
      <input type='submit' />
    </form>
  )
}

export default Login