import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaStar, FaRupeeSign} from 'react-icons/fa'
import FoodItemCard from '../FoodItemCard'

import Header from '../Navbar'
import Footer from '../Footer'

import './index.css'

class RestaurantDetails extends Component {
  state = {
    restaurantData: {},
    foodItemsList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    const updatedData = {
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      foodItems: data.food_items,
      id: data.id,
      imageUrl: data.image_url,
      itemsCount: data.items_count,
      location: data.location,
      name: data.name,
      opensAt: data.opens_at,
      rating: data.rating,
      reviewsCount: data.reviews_count,
    }

    const foodItems = data.food_items.map(eachFoodItem => ({
      cost: eachFoodItem.cost,
      foodType: eachFoodItem.food_type,
      id: eachFoodItem.id,
      imageUrl: eachFoodItem.image_url,
      name: eachFoodItem.name,
      rating: eachFoodItem.rating,
    }))

    this.setState({
      restaurantData: updatedData,
      foodItemsList: foodItems,
      isLoading: false,
    })
  }

  renderRestaurantDetails = () => {
    const {restaurantData, foodItemsList} = this.state
    const {
      imageUrl,
      name,
      cuisine,
      location,
      rating,
      reviewsCount,
      costForTwo,
    } = restaurantData
    return (
      <>
        <div className="banner-bg">
          <div className="banner-container">
            <img src={imageUrl} alt="restaurant" className="res-image" />
            <div className="res-info">
              <h1 className="res-name">{name}</h1>
              <p className="res-cuisine">{cuisine}</p>
              <p className="res-location">{location}</p>
              <div className="rating-rate-container">
                <div className="rating-container">
                  <p className="rating">
                    <FaStar />
                    {rating}
                  </p>
                  <p className="sub-text">{reviewsCount}+ Ratings</p>
                </div>
                <hr className="separation-line" />
                <div className="rating-container">
                  <p className="rating">
                    <FaRupeeSign />
                    {costForTwo}
                  </p>
                  <p className="sub-text">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <ul className="food-items-list">
            {foodItemsList.map(eachItem => (
              <FoodItemCard foodItem={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoader = () => (
    <div testid="restaurant-details-loader" className="restaurant-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        {isLoading ? this.renderLoader() : this.renderRestaurantDetails()}
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
