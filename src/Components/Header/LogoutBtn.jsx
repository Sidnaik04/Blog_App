import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../Appwrite/auth.js'
import {logout} from '../../Store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler =()=>{
        authService.logoutAccount().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button 
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn


/*
Creating a Logout Button in Header Folder
1. Import useDispatch -> to dispatch the service
2. Import authService -> authentication service is in auth
3. Import logout -> this service needed for logout

4 logoutHandler() -> method to handle the logout Services.
    a. authService.logout is a promise , so .then() is used -> this will dispatch the logout() service by saving information data in store.
5. UI of Logout Button
*/