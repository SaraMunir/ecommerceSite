import React, { useContext, useEffect, useState } from 'react'
import { Form, Link, useLocation, useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import { useSignupMutation } from '../hooks/userHooks'
import { toast } from 'react-toastify'
import { getError } from '../utils'
import { ApiError } from '../types/ApiError'
import { Button, Container, FormControl, FormGroup, FormLabel } from 'react-bootstrap'

function SignupPage() {
    const navigate = useNavigate()
    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/'
    const [ name, setName ] = useState('') 
    const [ email, setEmail ] = useState('') 
    const [ isLowerCase, setIsLowerCase ] = useState(false) 
    const [ isMinCharSize, setIsMinCharSize ] = useState(false) 
    const [ isUpperCase, setIsUpperCase ] = useState(false) 
    const [ isSpecialChar, setIsSpecialChar ] = useState(false) 
    const [ isNumerical, setIsNumerical ] = useState(false) 
    const [ isPwdSame, setIsPwdSame ] = useState(true) 

    const [ password, setPassword ] = useState('') 
    const [ confirmPassword, setConfirmPassword ] = useState('') 

    const { state, dispatch } = useContext(Store)
    const { userInfo } = state

    useEffect(()=> {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect ])

    const { mutateAsync: signup, isPending } = useSignupMutation()
    const submitHandler = async (e: React.SyntheticEvent) =>{
        console.log('test?')
        e.preventDefault()
        if(password !== confirmPassword) {
            toast.error('Password do not match')
            return
        }
        try {
            const data = await signup({
                name,
                email,
                password
            })
            dispatch({ type: 'USER_SIGNIN', payload: data })
            localStorage.setItem('userInfo', JSON.stringify(data))
            // navigate(redirect)
        } catch (error) {
            toast.error(getError(error as ApiError))
        }
    }
    const checckPassword = (e: any)=>{
        console.log(e.target.value)
        var lowerCaseLetters = /[a-z]/g;
        var numericalCase = /[0-9]/g;
        var upperCaseLetters = /[A-Z]/g;
        var specialChar = /(?=.*?[#?!@$%^&*-])/g;

        if(e.target.value.match(lowerCaseLetters)){
            setIsLowerCase(true)
        }else{
            setIsLowerCase(false)
        }
        if(e.target.value.match(upperCaseLetters)){
            setIsUpperCase(true)
        }else{
            setIsUpperCase(false)
        }
        if(e.target.value.match(numericalCase)){
            setIsNumerical(true)
        }else{
            setIsNumerical(false)
        }
        if(e.target.value.match(specialChar)){
            setIsSpecialChar(true)
        }else{
            setIsSpecialChar(false)
        }
        if(e.target.value.length < 8){
            setIsMinCharSize(false)
        }else{
            setIsMinCharSize(true)
        }
    }
    const confirmIfPasswordSame =(e:any)=>{
        if(e.target.value == password){
            setIsPwdSame(true)
        }else{
            setIsPwdSame(false)
        }
    }
    return (
        <Container className='small-container col-md-6 mx-auto border m-5 p-5 bg-white'>
            <title>Sign Up</title>
            <h1 className='my-3'>Sign up</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <FormGroup className="mb-3" controlId="name">
                        <FormLabel>Name</FormLabel>
                        <FormControl onChange={(e) => setName(e.target.value)} required />
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            type="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type="password"
                            required
                            onInput={(e) =>checckPassword(e)}
                            onChange={(e) => setPassword(e.target.value)}
                            
                        />

                    </FormGroup>
                    <FormGroup className="mb-3" controlId="confirmPassword">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type="password"
                        onInput={(e) =>confirmIfPasswordSame(e)}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onClick={(e) => setIsPwdSame(false)}
                        required
                    />
                    {!isPwdSame ?
                    <div style={{color:'red'}}>password doesnt match</div>
                    :""
                    }
                    </FormGroup>
                    <div className="mb-3">
                    <Button type="submit">Sign Up</Button>
                    </div>
                    <ul style={{color:'red'}}>
                        {
                            !isMinCharSize ?
                            <li>Password must be 8 character or more</li>
                            : ''
                        }
                        {
                            !isUpperCase ?
                            <li>Password must contain one Upper case character</li>
                            : 
                            <></>
                        }
                        {
                            !isLowerCase ?
                            <li>Password must contain one lower case character</li>
                            : 
                            <></>
                        }
                        {
                            !isSpecialChar ?
                            <li>Password must contain one special Character </li>
                            : 
                            <></>
                        }
                        {
                            !isNumerical ?
                            <li>Password must contain one Numerical Value </li>
                            : 
                            <></>
                        }
                    </ul>

                    <div className="mb-3">
                    Already have an account?{' '}
                    <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                    </div>
                </FormGroup>
            </Form>
        </Container>
    )
}

export default SignupPage