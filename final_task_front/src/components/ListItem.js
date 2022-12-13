import React from 'react'
import '../style/card.css'

function ListItem({ itemData, onClick }) {
  console.log('item: ', itemData)

  return (
    <div className='card shdw' onClick={onClick}>
      <img src={itemData.imgUrl ? itemData.imgUrl : 'https://fakeimg.pl/100x100'} alt="Auction item" />

      <div className='card__info'>
        <h3>{itemData.title}</h3>
        <div>
          <p className='description'>{itemData.description}</p>
          <p>{Number(itemData.price).toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}</p>
        </div>
      </div>
    </div>
  )
}

export default ListItem