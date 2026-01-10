import React from 'react'
import Banner from '../component/Banner'
import BestSellerBook from './BestSellerBook'
import FavBook from './FavBook'
import PromoBanner from './PromoBanner'

import Review from './Review'

const Home = () =>{
    return(
        <div >
            <Banner/>
            <BestSellerBook/>
            <FavBook/>
            <PromoBanner/>
            
            <Review/>
          
        </div>
    )
}
export default Home