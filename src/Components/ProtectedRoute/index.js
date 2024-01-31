import {Navigate,Route,Routes} from 'react-router-dom'
import React from 'react'
import Cookies from 'js-cookie'



const ProtectedRoute = props =>{
          const jwtToken = Cookies.get("jwt_token");
          if (jwtToken === undefined){
            return <Navigate to="/login"/>
          }
          return <Routes><Route {...props}/></Routes>
}

export default ProtectedRoute