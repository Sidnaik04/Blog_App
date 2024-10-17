import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from '../Store/authSlice'
import {Button, Input, Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../Appwrite/auth'
import {useForm} from 'react-hook-form'

function Login() {

    const navigate = useNavigate() //variable to navigate
    const dispatch = useDispatch() //variable to disptach
    const {register, handleSubmit} = useForm() // register and handleSubmit we are using from useForm
    const [error, setError] = useState("") // to handle the error while login -> by default empty string

    const login = async(data) => {
        setError("")

        try {
            const session = await authService.loginAccount(data)
            if(session){
                const userData = await authService.getCurrentUser()

                if(userData) dispatch (authLogin(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message) // if error than print the message
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
            </p>

            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className="space-y-5">
                    <Input
                        label="Email: "
                        type="email"
                        placeholder="Enter the email"
                        {...register("email",{
                            required:true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                    />

                    <Input
                        lebel="Password: "
                        type="password"
                        placeholder="Enter the password"
                        {...register("password",{
                            required:true
                        })}
                    />

                    <Button
                    type="submit"
                    className="w-full"
                    >Sign in</Button>

                </div>
            </form>

        </div>
    </div>
  )
}

export default Login

//login component -> using React Hook Form

/*
1. Import useState -> to handle the errors
2. Import Link, useNavigate from react router-dom to navigate to other page once login successful
3. Import login from Store-> authSlice => to simplify we will call login as authLogin
4. Import Button, Input and Logo components
5. Import useDispatch -> to dispatch the service
6. Import authService -> to get the service details (getCurrentuser)
7. Import useForm -> from react-hook-form 
8. declare the variables

9. Create a method to handle the login -> using Promises
a. first thing we need to do is to  check if the error exist (setError)
b. will use try-catch -> to handle the login
c. create a variable session and store the data we get from loginAccount
d. if session exist -> get the current user and store in variable userdata
e. if userData found -> disptach the service authLogin (login)
f. if everthing is succesful than navigate to home (/) or else error.messsage will show

10. Write the UI
a. form-> onSubmit -> this will trigger the event => handleSumbit, which also acts like an event imported from react-form which will trigger the method login. handleSubmit is a keyword
b. Input (Email) -> {...register(key,{object})} from react-form
    required-> true
    validate-> to validate the patter of email
c. Input (password) -> same as email

d. Button -> Sign In
*/