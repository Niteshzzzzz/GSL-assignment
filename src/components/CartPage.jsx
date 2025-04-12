import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function CartPage({ setCartCount }) {
  const [cartProduct, setCartProduct] = useState([])
  const [total, setTotal] = useState(0)
  const getCartData = () => {
    const data = JSON.parse(localStorage.getItem('cartData'))
    if (data) {
      setCartProduct(data)
    }

  }
  const getTotal = () => {
    let n = 0
    const data = JSON.parse(localStorage.getItem('cartData'))
    if (data != 'undefined') {
      data?.map(item => { n = (item.price * item.quantity) + n })
      setTotal(n.toFixed(3))
    }
  }

  const handleRemove = (product) => {
    const data = cartProduct.filter(item => {
      if (item.title != product.title) return item;
    })
    localStorage.setItem('cartData', JSON.stringify(data))
    setCartProduct(data)
    getTotal()
    setCartCount(data.length)
  }

  const handleCheckout = () => {
    localStorage.setItem('cartData', JSON.stringify([]))
    getCartData()
    setCartCount(0)
    toast.success('Order placed successfully!')
  }

  useEffect(() => {
    getCartData()
    getTotal()
  }, [])

  return (
    <div className='cart-container'>
      {
        cartProduct?.length != 0 ? cartProduct?.map((product, i) => (
          <div className="cart" key={i} >
            <div className="cart-deatail">
              <p className="p">Image</p>
              <div className="cart-image"><img src={product.image} alt="" /></div>
            </div>
            <div className="cart-detail">
              <p className="p">Product</p>
              <p>
                {product.title.slice(0, 16)}
              </p>

            </div>
            <div className="cart-detail">
              <p className="p">Price</p>
              <p>$ {product.price}
              </p>

            </div>
            <div className="cart-detail">
              <p className="p">Quantity</p>
              <span className='count1'>{product.quantity}</span>

            </div>
            <div className="cart-detail">
              <p className="p">Remove</p>
              <span className="rem" onClick={() => handleRemove(product)}><FontAwesomeIcon icon={faTrashCan} /></span>

            </div>
            <div className="line"></div>
          </div>
        )) : <h3 style={{ textAlign: 'center' }} >Cart is empty.</h3>
      }
      {cartProduct?.length != 0 && <div className="total-container">
        <div className="total">
          <p>Subtotal: <span>${total}</span></p>
          <p>Shipping fee: <span>$5.00</span></p>
          <hr />
          <p>Order tota: <span>${(Number(total) + 5)}</span></p>
          <button onClick={handleCheckout} >Checkout</button>
        </div>
      </div>
      }
    </div>
  )
}

export default CartPage