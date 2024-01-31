import {Component} from 'react'
//  import Bars from 'react-loader-spinner'
import ClipLoader from "react-spinners/ClipLoader";
import Cookies from 'js-cookie'
import ProductHeader from '../ProductHeader'
import ProductCard from '../ProductCard'
import './index.css'

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
    activeOptionId:sortbyOptions[0].optionId
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const {activeOptionId}=this.state
    //  console.log(activeOptionId);
    this.setState({
      isLoading: true,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        isLoading: false,
      })
    }
  }

  updateActiveId = ActiveId=>{
        this.setState({activeOptionId:ActiveId},this.getProducts)
  }

  renderProductsList = () => {
    const {productsList,activeOptionId} = this.state
    return (
      <>
        <ProductHeader sortbyOptions={sortbyOptions} activeOptionId={activeOptionId} updateActiveOptionId={this.updateActiveId}/>
        
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = (override) => (
    <ClipLoader
        color="red"
        loading="true"
        cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )

  render() {
    const override: CSSProperties = {
      display: "block",
      margin: "0 auto",
      borderColor: "red",
    };
    const {isLoading} = this.state
    return <>{isLoading ? this.renderLoader(override) : this.renderProductsList()}</>
  }
}

export default AllProductsSection
