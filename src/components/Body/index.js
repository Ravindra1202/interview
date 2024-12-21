import React from 'react'
 
import { Outlet } from 'react-router-dom'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'

const Body = () => {
    return (
        <div>
            <Header />
            <Outlet/> 
            <Footer/>
        </div>
    )
}

export default Body