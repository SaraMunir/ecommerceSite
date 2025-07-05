// import React from 'react'
import { Button, Dropdown, Navbar, SplitButton } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Category } from '../../types/Category';
import { useGetCategoriesByStoreIdQuery, useGetCategoriesQuery, useGetSubCategoriesQuery } from '../../hooks/categoryHooks';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import { ApiError } from '../../types/ApiError';
import { getError } from '../../utils';
import DropDownSubNavs from './DropDownSubNavs';
import { Link, useParams } from 'react-router-dom';
// import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, MouseEventHandler } from 'react';

function Header(props: { 
    
    mode: string ; 
    switchModeHandler: ()=>void; 
    signoutHandler: ()=>void; 
    userInfo: any }) {
        const params = useParams()
        const { storeId } = params

    // const { data: categories, isLoading, error} = useGetCategoriesQuery()
    // const { data: categories, isLoading, error} = useGetCategoriesByStoreIdQuery()
    const { data: categories, isLoading, error } =useGetCategoriesByStoreIdQuery(storeId!)
    
    return isLoading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{ getError( error as ApiError ) }</MessageBox>
    ) :
    (
        <header className='p-0 m-0'>
            <Navbar expand="md" className="" variant='dark' bg="dark">
                <Container className='w-100' fluid>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto d-flex justify-content-between w-100">
                            <div className="col-md-10 d-md-flex">
                                <Nav.Link href={"/Store/"+storeId}>Home</Nav.Link>
                                <Nav.Link href="/About">About</Nav.Link>
                                <NavDropdown title="Categories" id="basic-nav-dropdown">
                                    {
                                        categories!.map((cat:Category)=>
                                            !cat.parentId ?
                                            <NavDropdown.Item href={`/Store/${storeId}/Category/`+ cat.name +"/"+cat._id} className={cat.subCategories.length>0?'d-flex justify-content-between align-items-center position-relative hover-box':'d-flex justify-content-between align-items-center'} key={cat._id}>
                                                {cat.name}
                                                {
                                                    cat.subCategories.length>0 ?
                                                    <div className='position-relative hover-toggle'>
                                                        <Button variant="link" className=''> <i className="fas fa-chevron-right"></i></Button>
                                                        <DropDownSubNavs  category={cat} categories={categories}/>
                                                    </div>
                                                    : <></>
                                                }
                                            </NavDropdown.Item>
                                            : null
                                        )
                                    }
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href={"/Category"}>All</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                            <div className="justify-content-end  col-md-2 d-md-flex pe-3">
                                {
                                    props.userInfo ? 
                                    (
                                        <NavDropdown title={props.userInfo.name} id="basic-nav-dropdown">
                                            <Link
                                            className='dropdown-item'
                                            to="#signout"
                                            onClick={props.signoutHandler}
                                            >
                                            Sign Out
                                            </Link>
                                        </NavDropdown>
                                    ):(
                                        <Nav.Link href="/signin">Sign In</Nav.Link>
                                    )
                                }
                                <Button variant={props.mode} onClick={props.switchModeHandler}>
                                    <i className={props.mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
                                </Button>
                            </div>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    )
}

export default Header