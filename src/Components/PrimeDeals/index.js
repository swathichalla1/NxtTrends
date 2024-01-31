import {Component} from 'react'
import Cookies from 'js-cookie'
import ClipLoader from "react-spinners/ClipLoader";

import ProductCard from '../ProductCard'
import './index.css'

const apiStatus = {
    SUCCESS : "success",
    FAILURE:"failure",
    INPROGRESS:"inprogress",
    INITIAL:"initial"
}

class PrimeDeals extends Component {
  state = {
    primeDeals: [],
    status : apiStatus.INITIAL,
  }

  componentDidMount() {
    this.getPrimeDeals()
  }

  getPrimeDeals = async () => {
    this.setState({status:apiStatus.INPROGRESS})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/prime-deals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.prime_deals.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        primeDeals: updatedData,
        status:apiStatus.SUCCESS
      })
    }
  
  else if (response.status === 401){
    this.setState({status:apiStatus.FAILURE})
  }
}

  renderPrimeDealsList = () => {
    const {primeDeals} = this.state
    return (
      <div className="products-list-container">
        <h1 className="primedeals-list-heading">Exclusive Prime Deals</h1>
        <ul className="products-list">
          {primeDeals.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderPrimeDealsFailureView = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="Register Prime"
      className="register-prime-image"
    />
  )

  renderLoadingView = (override) => (
    
    <div className="products-loader-container">
    <ClipLoader
    color="red"
    loading="true"
    cssOverride={override}
    size={20}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
    </div>
  )

  render() {
    const {status} = this.state;
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };
    switch (status) {
        case apiStatus.SUCCESS :
            return this.renderPrimeDealsList() 
            
        case apiStatus.FAILURE:
            return this.renderPrimeDealsFailureView()
            
        case apiStatus.INPROGRESS:
            return this.renderLoadingView(override)
            
        default:
            return null
    }

  }
}

export default PrimeDeals

