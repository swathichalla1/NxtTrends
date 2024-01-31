import React from 'react'


const ContextFile = React.createContext({
    cartItemsList : [],
    addCartItem : ()=>{},
    deleteCartItem : ()=>{},
    setCartItemsList:()=>{}
})

export default ContextFile