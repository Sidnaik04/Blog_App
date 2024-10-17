import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { useSelector } from 'react-redux'
import { Link , useNavigate } from 'react-router-dom'


function Header() {
  
  const authStatus = useSelector((state)=> state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home', 
      slug: "/", //url
      active: true //Home page -> true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus, // conditional rendering -> depends on status
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    },
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'/>
            </Link>
          </div>

          <ul className='flex ml-auto'>
            {navItems.map((item)=>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={()=> navigate(item.slug)}
                    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                  >{item.name}</button>
                </li>
              ) : null 
            )}
            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header


/*
1. Import the components from index.js
2. Import the useSelector from redux
3. Import Link and useNavigate from router

4. authStatus -> this method is used to check , what is the current status -> whether the user is logged in or out

5. navItems -> for navigation bar -> stored in the form of array, objects inside array

6. UI -> header
  Container -> <nav>
    a. <div>logo</div> 
    b. navigation bar -> Apply map of nav items. If active then display  as per (className) and navigate to clicked item.
    If not active then display nothing (null)
    c. LogoutBtn -> {authStatus && ()} => if ((true) then (display)) -> if User is logged in then show logoutBtn
*/