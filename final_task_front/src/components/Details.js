import { observer } from 'mobx-react-lite'
import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Context } from '..'
import ProductsService from '../services/ProductsService'
import '../style/details.css'
import Actions from './Actions'

function Details() {

  const { store } = useContext(Context)

  const [product, setProduct] = useState()
  const { id } = useParams('id')
  const navigate = useNavigate()

  useEffect(() => {
    async function fetch() {
      const response = await ProductsService.getOne(id)
      console.log(response.data)
      setProduct(response.data)
    }
    fetch()
  }, [])

  const onBack = () => {
    navigate('/products')
  }

  return (
    <div className='shdw'>

      <div className='product-wrapper shdw'>

        <img src={product ? product.imgUrl : 'https://fakeimg.pl/250x250'} alt='product' />

        <div className='product-wrapper__info'>
          <h3>{product ? product.title : ''}</h3>
          <p>{product ? product.description : ''}</p>
          <p>
            <span>Price: </span>{
              Number(product ? product.price : 0)
                .toLocaleString('en-US', {
                  style: 'currency', currency: 'EUR'
                })
            }
          </p>

        </div>
      </div>
      <button onClick={onBack}>Back</button>
      {
        store.isAuth && <Actions id={id} />
      }
    </div>
  )
}

export default observer(Details)