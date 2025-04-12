import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from '../utils/axios'
import Loading from './Loading'
import { productContext } from '../utils/Context'
import { toast } from 'react-toastify'
// import { toast } from 'react-toastify'

function Details({ cartCount, setCartCount }) {

  const [getProduct, setGetProduct] = useContext(productContext)
  const [product, setProduct] = useState()
  const [itemCount, setItemCount] = useState(1);
  const { id } = useParams()
  const navigate = useNavigate()

  const getData = async () => {
    try {
      const { data } = await axios.get(`products/${id}`)
      setProduct(data)
    } catch (error) {
      console.log(error)
    }
  }

  // const deleteHandler = (id) => {
  //   const filteredProduct = getProduct.filter(p => p.id != id)
  //   setGetProduct(filteredProduct)
  //   localStorage.setItem('products', JSON.stringify(filteredProduct))
  //   toast.success('Product deleted successfully')
  //   navigate('/')
  // }

  const cartHandler = (product) => {
    let data = []
    let cartData = JSON.parse(localStorage.getItem('cartData'))
    product.quantity = itemCount
    if (cartData) {
      cartData.push(product)
      localStorage.setItem('cartData', JSON.stringify(cartData))
    } else {
      data.push(product)
      localStorage.setItem('cartData', JSON.stringify(data))
    }
    setCartCount(cartCount + 1)
    toast.success('Product added into the cart.')
  }


  useEffect(() => {
    getData()
    if (!product) {
      setProduct(getProduct?.filter(p => p.id == id)[0])
    }
  }, [])

  return (product ?
    <div className='details'>
      <div className="detail">
        <img src={product.image} alt="image" className='w-[30%]' />
        <div className="content">
          <h1>{product.title}</h1>
          <h3>{product.category}</h3>
          <h2>$ {product.price}</h2>
          <p>{product.description}</p>
          <hr />
          <div className="add">
            <span className='count-container'><span className='di' onClick={() => (itemCount > 1) ? setItemCount(itemCount - 1) : setItemCount(itemCount)} >-</span><span className='count'>{itemCount}</span><span className='di' onClick={() => (itemCount < 50) ? setItemCount(itemCount + 1) : setItemCount(itemCount)} >+</span></span>
            <button onClick={() => cartHandler(product)}>Add To Cart</button>
          </div>
        </div>
      </div>
    </div> : <Loading />
  )
}

export default Details