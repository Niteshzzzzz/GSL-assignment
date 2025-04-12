import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productContext } from '../utils/Context'
import CartCount from './cartCount'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faShopify } from '@fortawesome/free-brands-svg-icons'

function Nav({cartCount, setCartCount}) {


    const getCount = () => {
        const data = JSON.parse(localStorage.getItem('cartData'))
        if (data) {
            setCartCount(data.length)
        }
    }

    useEffect(() => {
        getCount()
    }, [])

    const handleLogout = (e) => {
        localStorage.setItem('token', JSON.stringify())
    }

    return (
        <nav>
            <div className="logo"><FontAwesomeIcon icon={faShopify} /></div>
            <div className="np2">           
                <Link to={'/'} >Home</Link>
                <Link onClick={handleLogout} to={'/login'} >Logout</Link>
                <Link to={'/cart'} className='cc' ><FontAwesomeIcon icon={faCartShopping} /> <CartCount cartCount={cartCount} /></Link>
            </div>

        </nav>
    )
}

export default Nav