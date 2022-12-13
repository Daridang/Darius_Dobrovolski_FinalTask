import React from 'react'

import { useNavigate } from 'react-router-dom'
import ProductsService from '../services/ProductsService'

function Actions({ id }) {
  const navigate = useNavigate()

  const onEdit = async (id) => {
    navigate('/create/' + id)
  }

  const onDelete = async (id) => {
    await ProductsService.delete(id)
    navigate('/products')
  }


  return (
    <div>
      <button onClick={() => onEdit(id)}>Edit</button>
      <button onClick={() => onDelete(id)}>Delete</button></div>
  )
}

export default Actions