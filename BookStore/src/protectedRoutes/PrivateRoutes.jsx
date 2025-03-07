import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const PrivateRoutes = ({children}) => {
  console.log(children)
  const {isLogin}=useContext(AuthContext)
  console.log("Private Route Check:", isLogin); 
  return isLogin ? children : <Navigate to='/'/>
  
}

export default PrivateRoutes