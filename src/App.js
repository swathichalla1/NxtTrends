import React,{useState} from 'react'
import { BrowserRouter,Route,Routes} from "react-router-dom"
import LoginPage from './Components/LoginPage'
import Home from './Components/Home'
import Products from "./Components/Products"
import Cart from './Components/Cart'
import ProductDetailView from './Components/ProductDetailView'
import NotFound from './Components/NotFound'
import ContextFile from './context/contextfile'

import './App.css'


const App = ()=>{

  const [cartItemsList,setcartItemsList] = useState([])

  const addCartItem = (product)=>{
    setcartItemsList([...cartItemsList,product])
  }
  
  const clearCartItems = ()=>{
    setcartItemsList([]);
  }

  const updateCartItemsList = (updatedCartItemsList)=>{
    setcartItemsList(updatedCartItemsList);
  }

  const deleteCartItem = (id)=>{
       const filteredList = cartItemsList.filter((each)=>(
        each.id !== id 
       ))
       return setcartItemsList(filteredList)
  }

  return(

  <BrowserRouter>
  <ContextFile.Provider value={{cartItemsList,addCartItem:addCartItem,deleteCartItem:deleteCartItem,clearCartItems:clearCartItems,updateCartItemsList:updateCartItemsList}}>
  <Routes>
  <Route exact path="/login" element={<LoginPage/>}/>
  <Route exact path="/" element={<Home/>}/>
  <Route exact path="/products" element={<Products/>}/>
  <Route exact path="/products/:id" element={<ProductDetailView/>}/>
  <Route exact path="/Cart" element={<Cart/>}/>
  <Route path="/NotFound" element={<NotFound/>}/>
  <Route path="*" element={<NotFound/>}/>
</Routes>
  
  </ContextFile.Provider>
  
  </BrowserRouter>
  )
}

export default App
