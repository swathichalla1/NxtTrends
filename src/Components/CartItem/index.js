import {useState} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import ContextFile from '../../context/contextfile'

import './index.css'

const CartItem = props => {
  
  const {cartItemDetails} = props
  const {title, brand, quantity:initialQuantity, price, imageUrl,id} = cartItemDetails
  const [quantity,changeQuantity] = useState(initialQuantity);
  
  

  return(

  <ContextFile.Consumer>
  {(value) => {

    const {deleteCartItem,cartItemsList,updateCartItemsList} = value ;
    const deleteCartItems = ()=>(
      deleteCartItem(id)
    )
    
    const AddQuantity = ()=>{
    const newquantity = quantity+1;
     changeQuantity(newquantity)

     // Update quantity in cartItemsList
     const updatedCartItemsList = cartItemsList.map((item) =>
     item.id === id ? { ...item, quantity: newquantity } : item
   );

   updateCartItemsList(updatedCartItemsList);
  };

   const SubQuantity = ()=>{
    if (quantity===1){
      deleteCartItem(id)
    }
    else{
      const newquantity = quantity-1
    changeQuantity(newquantity)
    
    // Update quantity in cartItemsList
    const updatedCartItemsList = cartItemsList.map((item) =>
    item.id === id ? { ...item, quantity: newquantity } : item
  );

  updateCartItemsList(updatedCartItemsList);
    }
 
  }
    
    

    return (
      <li className="cart-item">
        <img className="cart-product-image" src={imageUrl} alt={title} />
        <div className="cart-item-details-container">
          <div className="cart-product-title-brand-container">
            <p className="cart-product-title">{title}</p>
            <p className="cart-product-brand">by {brand}</p>
          </div>
          <div className="cart-quantity-container">
            <button type="button" className="quantity-controller-button" onClick={SubQuantity}>
              <BsDashSquare color="#52606D" size={12} />
            </button>
            <p className="cart-quantity">{quantity}</p>
            <button type="button" className="quantity-controller-button" onClick={AddQuantity}>
              <BsPlusSquare color="#52606D" size={12} />
            </button>
          </div>
          <div className="total-price-delete-container">
            <p className="cart-total-price">Rs {price * quantity}/-</p>
            <button className="remove-button" type="button" onClick={deleteCartItems}>
              Remove
            </button>
          </div>
        </div>
        <button className="delete-button" type="button" onClick={deleteCartItems}>
          <AiFillCloseCircle color="#616E7C" size={20} />
        </button>
      </li>
    )
    
  }}
  
  </ContextFile.Consumer>
  )
  
}

export default CartItem
