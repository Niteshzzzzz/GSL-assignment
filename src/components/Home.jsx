import React, { useContext, useEffect, useState } from 'react'
import Nav from './Nav'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { productContext } from '../utils/Context'
import Loading from './Loading'
import axios from '../utils/axios'

function Home() {
    const [getProduct] = useContext(productContext)
    const [filterProduct, setfilterProduct] = useState(null)
    const [isDrop, setisDrop] = useState(true)
    const { search } = useLocation()
    const navigate = useNavigate()
    const category = decodeURIComponent(search.split('=')[1])
    const tokens = localStorage.getItem('token')

    const getfilterProduct = async () => {
        try {
            const { data } = await axios.get(`products/category/${category}`)
            setfilterProduct(data)
        } catch (error) {
            console.log(error)
        }
    }

    const nav = () => {
        useEffect(() => {
            navigate('/login')
        }, [])
    }

    // filter 
    let filtered_Product = getProduct?.reduce((acc, cv) => [...acc, cv.category], [])
    filtered_Product = [...new Set(filtered_Product)]

    useEffect(() => {
        if (!filterProduct || category == 'undefined') setfilterProduct(getProduct);
        if (category != 'undefined') {
            // getfilterProduct();
            setfilterProduct(getProduct?.filter(p => p.category == category))
        }

    }, [category, getProduct])

    return (tokens != 'undefined') ? (filterProduct ? (
        <>

            <div className='card-container'>
                <div className="filter-container">
                    <h3 onClick={() => (isDrop === true) ? setisDrop(false) : setisDrop(true)}>Filter</h3>
                    <div className={`filter ${(isDrop === true) ? 'drop' : ''}`}>
                        <Link to={`/`} key='i' onClick={() => setisDrop(true)}>All</Link>
                        {filtered_Product.map((c, i) =>
                            <Link to={`/?category=${c}`} key={i} onClick={() => setisDrop(true)}>{c}</Link>
                        )}
                    </div>
                </div>
                {filterProduct && filterProduct.map(product => (
                    <Link key={product.id} to={`/details/${product.id}`} className="card">
                        <div style={{ backgroundImage: `url(${product.image})` }}></div>
                        <h1>{product.title}</h1>
                    </Link>
                ))}
            </div>
        </>
    ) : <Loading />) : nav()
}

export default Home