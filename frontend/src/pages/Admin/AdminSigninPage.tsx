import React, { useContext, useEffect, useState } from 'react'
import { Form, Link, useLocation, useNavigate } from 'react-router-dom'
import { Store } from '../../Store'
import { useAdminSigninMutation } from '../../hooks/userHooks'
import { Button, Container, FormControl, FormGroup, FormLabel, Toast } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { getError } from '../../utils'
import { ApiError } from '../../types/ApiError'
import LoadingBox from '../../components/LoadingBox'

function AdminSigninPage() {
    const navigate = useNavigate()
    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/Admin/Stores'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { state, dispatch } = useContext(Store)
    const { userAdminInfo } = state

    const { mutateAsync: signin, isPending } = useAdminSigninMutation()

    const submitHandler = async (e: React.SyntheticEvent)=>{
        e.preventDefault()
        console.log('????????')
        try {
            console.log('where is it', email,password)
            const data = await signin({
                email,
                password
            })
            console.log('data', data)
            dispatch({ type: 'ADMIN_USER_SIGNIN', payload: data })
            console.log('data:', data)
            localStorage.setItem('userAdminInfo', JSON.stringify(data.data.adminUser))
            localStorage.setItem('storeInfo', JSON.stringify(data.data.store))
            navigate(redirect)
            location.reload()
        } catch (error) {
            console.log('error?', error)
            toast.error(getError(error as ApiError))
        }
    }
    useEffect(()=>{
        if(userAdminInfo){
            navigate(redirect)
        }
    }, [navigate, redirect, userAdminInfo])
    // console.log('isPending ', isPending )

    return (
        <Container className='small-container col-md-6 mx-auto border m-5 p-5 bg-white'>
            <title>Admin Signin Page</title>
            <h1 className='my-3'>Sign In

            redirectInUrl: {redirectInUrl}
            </h1>
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
                    <Link to={`/Admin/signup?redirect=${redirect}`}>Create your Account</Link>
                </div>
            </Form>
        </Container>
    )
}

export default AdminSigninPage