import CartItem from '../CartItem'
import ContextFile from '../../context/contextfile'

import './index.css'



const CartListView = () => (

  <ContextFile.Consumer>
  {value=>{
    const {cartItemsList} = value ;

    const getTotalValue = cartItemsList.reduce((total, each) => {
      return total + each.price * each.quantity;
    }, 0);

    return (
      <>
    <ul className="cart-list">
    {cartItemsList.map(eachCartItem => (
      <CartItem key={eachCartItem.id} cartItemDetails={eachCartItem} />
    ))}
  </ul>
  <div className="orderCheckout">
  <p className="totalItems">Total Items In Cart <span className="cartView-count-badge">{cartItemsList.length}</span></p>
  <h1 className="orderHeading">Order Total : <span className="total" >{getTotalValue}</span></h1>
  <button type="button" className="checkout">Check out</button>
  </div>
  </>
    )
  }}
  </ContextFile.Consumer>
  
)

export default CartListView
