import React, { useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductsService from '../services/ProductsService'
import '../style/create-product.css'

function CreateProduct() {

  const { id } = useParams()
  const navigate = useNavigate()

  const imageInput = useRef()
  const titleInput = useRef()
  const descriptionInput = useRef()
  const priceInput = useRef()

  useEffect(() => {
    if (id) {
      async function fetch() {
        const response = await ProductsService.getOne(id)
        titleInput.current.value = response.data.title
        imageInput.current.value = response.data.imgUrl
        descriptionInput.current.value = response.data.description
        priceInput.current.value = response.data.price
      }
      fetch()
    }
  }, [])

  function submit(e) {
    e.preventDefault()
    const obj = {
      title: titleInput.current.value,
      imgUrl: imageInput.current.value,
      description: descriptionInput.current.value,
      price: priceInput.current.value
    }

    if (id) {
      update(id, obj)
    } else {
      create(obj)
    }
  }

  const update = async (id, product) => {
    await ProductsService.edit(id, product)
    navigate(-1)
  }

  const create = async (product) => {
    await ProductsService.create(product)
    navigate(-1)
  }

  return (
    <div className='upload shdw'>
      <h2>{id ? 'Edit' : 'Create'} product</h2>
      <form className='upload__form' onSubmit={submit}>
        <input
          ref={imageInput}
          type="text"
          placeholder='Image url'
          defaultValue={'https://fakeimg.pl/250x250'}></input>

        <input
          ref={titleInput}
          type='text'
          placeholder='Title'></input>

        <textarea
          ref={descriptionInput}
          rows='5'
          placeholder='Description'></textarea>

        <input
          ref={priceInput}
          type="number"
          min="0.00" max="10000000000.00"
          step="0.01"
          placeholder='Start price' ></input>

        <input type='submit'></input>
      </form>

      <button onClick={() => navigate(-1)}>Back</button>
    </div >
  )
}

export default CreateProduct