import AllProductsSection from '../AllProductsSection'
import PrimeDeals from  '../PrimeDeals'
import Header from '../Header'

import './index.css'

const Products = () => (
  <>
    <Header/>
    <div className="product-sections">
      <PrimeDeals/>
      <AllProductsSection />
    </div>
  </>
)

export default Products