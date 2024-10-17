import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children,authentication=true}) {
    const navigate = useNavigate();
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(()=>{
        //TODO: Simplify if needed

        if(authentication && authStatus !==authentication){
            navigate('/login')
        }
        else if(!authentication && authStatus !== authentication){
            navigate('/')
        }

        setLoader(false)
    },[authStatus,navigate,authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}


//AuthLayout -> mechanism to protect pages and routes.

/*
name of the file -> AuthLayout.jsx and name of the function -> Protected. It is possible to have different function name rather than file name.

1. useSelector -> used to get the auth.status
2. useNavigate -> used to navigate to other page if authentication is done
3. useEffect-> everytime authStatus, navigate or authentication changes than effect will take place
 if(true && true !== false) => (true && true) -> ('/login')
 else if(false && true !== true) => (false && false) -> ('/')
*/