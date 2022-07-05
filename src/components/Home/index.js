import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import Navbar from '../Navbar'
import Carousel from '../Carousel'
import PopularRestaurants from '../PopularRestaurants'
import Footer from '../Footer'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Navbar />
      <div className="home-container">
        <Carousel />
        <PopularRestaurants />
      </div>
      <Footer />
    </>
  )
}

export default Home
