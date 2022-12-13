import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductsService from '../services/ProductsService'
import ListItem from './ListItem'
import '../style/products.css'
import { Context } from '..'

function Products() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const { store } = useContext(Context)

  useEffect(() => {
    async function fetch() {
      const response = await ProductsService.fetchProducts()
      setProducts(response.data.products)
    }
    fetch()
  }, [])

  function details(id) {
    navigate('/products/' + id)
  }

  return (
    <div className='products'>
      <h2>Products</h2>

      <div className='main-container'>
        <div className='products-wrapper'>
          {
            products
              .sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt)
              })
              .map((product, index) => {
                return <ListItem
                  key={index}
                  itemData={product}
                  onClick={() => details(product._id)} />
              })
          }

        </div>
      </div>

    </div>
  )
}

export default Products