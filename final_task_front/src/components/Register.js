import React, { useRef, useContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Context } from '..'

function Register() {
  const { store } = useContext(Context)
  const { state } = useLocation()
  const navigate = useNavigate()

  const emailInput = useRef()
  const nameInput = useRef()
  const passInput = useRef()
  const repeatPassInput = useRef()

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    store.register(
      emailInput.current.value,
      nameInput.current.value,
      passInput.current.value,
      repeatPassInput.current.value
    ).then(() => {
      navigate(state?.path || '/products')
    })
  }

  return (
    <form className='register-form shdw' onSubmit={handleOnSubmit}>
      <h4>Register</h4>
      <input ref={emailInput} type='text' placeholder='Email' required />
      <input ref={nameInput} type='text' placeholder='Name' required />
      <input ref={passInput} type='password' placeholder='Password' required />
      <input ref={repeatPassInput} type='password' placeholder='Password' required />
      <input type='submit' />
    </form>
  )
}

export default Register