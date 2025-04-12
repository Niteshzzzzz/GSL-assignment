import axios from './axios';
import React, { createContext, useEffect } from 'react'
import { useState } from 'react';
export const productContext = createContext();

function Context(probs) {

    const [getProduct, setGetProduct] = useState(JSON.parse(localStorage.getItem('products')) || null)

    const getData = async () => {
        try {
            const {data} = await axios.get('products')
            setGetProduct(data)
        } catch (error) {
            console.log(error)
        }
    }

    if (!JSON.parse(localStorage.getItem('products'))) {
        useEffect(() => {getData()}, [])
    }

    return (
        <productContext.Provider value={[getProduct, setGetProduct]}>
            {probs.children}
        </productContext.Provider>
    )
}

export default Context