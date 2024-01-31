import Header from '../Header'
import CartListView from '../CartListView'
import ContextFile from '../../context/contextfile'
import EmptyCartView from "../EmptyCartView"

import './index.css'

const Cart = () => (

  
  <ContextFile.Consumer>
  {value=>{
    const {cartItemsList,clearCartItems} = value;
    const ItemsInCart = cartItemsList.length === 0;

    const clearAllItems = ()=>(
      clearCartItems()
    )
    return(
      <>
      <Header />
      <div className="cart-container">
        <div className="cart-content-container">
        <div className="cartHeading">
        <h1 className="cart-heading">My Cart</h1>
        <button type="button" className="clearcart" onClick={clearAllItems}>
        <h1>Clear Cart</h1>
        </button>
        
        </div>
          

          {ItemsInCart ? <EmptyCartView/> : <CartListView /> }
          
        </div>
      </div>
      </>
    )

  }}
  </ContextFile.Consumer>
    
)

export default Cart
