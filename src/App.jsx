import {useDispatch} from 'react-redux'
import './App.css'
import { useState, useEffect } from 'react'
import authService from './Appwrite/auth'
import {login,logout} from './Store/authSlice'
import {Header,Footer} from './Components'
import { Outlet } from 'react-router-dom'

function App() {
  
  const [loading,setLoading] = useState(true) //by default it is kept true so, that useEffect() will be action

  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  }, [])
  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          {/* <Outlet/> --> will do later*/}
          <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App


/*
1. Handling Login and Logout
Working: Whenever the application starts -> this will load the data using useEffect and provide login and logout services based on conditions.
  a. Import useDispatch() -> to dispatch the service login and logout created in authslice.js
  b. useEffect() -> import authService from auth.js
    i. get the data of current User -> if userData exist -> dispatch login service 
      if userdata don't exist -> dispatch logout service.
    ii. finally -> setLoading to false

2. return() -> Conditional Rendering 
  a. styling
  b. Import Header and Footer
  c. Later import Outlet -> react router dom
*/