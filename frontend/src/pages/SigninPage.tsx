import React, { useContext, useEffect, useState } from 'react'
import { Form, Link, useLocation, useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import { useSigninMutation } from '../hooks/userHooks'
import { Button, Container, FormControl, FormGroup, FormLabel, Toast } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { getError } from '../utils'
import { ApiError } from '../types/ApiError'
import LoadingBox from '../components/LoadingBox'

function SigninPage() {
    const navigate = useNavigate()
    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { state, dispatch } = useContext(Store)
    const { userInfo } = state

    const { mutateAsync: signin, isPending } = useSigninMutation()

    const submitHandler = async (e: React.SyntheticEvent)=>{
        e.preventDefault()
        try {
            const data = await signin({
                email,
                password
            })
            dispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            navigate(redirect)
        } catch (error) {
            toast.error(getError(error as ApiError))
        }
    }
    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])
    console.log('isPending ', isPending )

  return (
    <Container className='small-container col-md-6 mx-auto border m-5 p-5 bg-white'>
        <title>Home Page</title>
        <h1 className='my-3'>Sign In</h1>
        <Form onSubmit={submitHandler}>
            <FormGroup controlId="email">
                <FormLabel>Email</FormLabel>
                <FormControl
                type='email'
                required
                onChange={(e)=> setEmail(e.target.value)}
                ></FormControl>
            </FormGroup>
            <FormGroup controlId="password">
                <FormLabel>password</FormLabel>
                <FormControl
                type='password'
                required
                onChange={(e)=> setPassword(e.target.value)}
                ></FormControl>
            </FormGroup>
            <div className="mb-3">
            isPending : {isPending } //
                <Button disabled={isPending } type='submit'>
                    Sign In
                </Button>
                {
                    isPending  && <LoadingBox />
                }
            </div>
            <div className="mb-3">
                New Customer ? {' '}
                <Link to={`/signup?redirect=${redirect}`}>Create your Account</Link>
            </div>
        </Form>
    </Container>
  )
}

export default SigninPage