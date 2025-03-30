import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import './App.scss';
import Header from './components/Structure/Header';
import AdminTabs from './components/Structure/AdminTabs';
import { Container, ListGroup, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import { Store } from './Store';

function App() {
  let location = useLocation();
  const navigate = useNavigate()
  const { search } = useLocation()
  const {state:{ mode, userInfo, userAdminInfo, exceptionError, storeInfo}, dispatch } = useContext(Store)

  useEffect(()=>{
    document.body.setAttribute('data-bs-theme',mode)
    console.log("exceptionError: ", exceptionError)
    if (location.pathname.includes('/Admin')) {
        if(!userAdminInfo && !location.pathname.includes('/Admin/signup')){
          navigate('/Admin/signin')
        }
    }
  }, [mode, userAdminInfo, exceptionError])
  const switchModeHandler = () =>{
    dispatch({ type: 'SWITCH_MODE'})
  }
  const signoutHandler =()=>{
    dispatch({ type: 'USER_SIGNOUT'})
    localStorage.removeItem('userInfo')
    window.location.href = '/signin'
  }
  const signoutAdminHandler =()=>{
    dispatch({ type: 'ADMIN_USER_SIGNOUT'})
    localStorage.removeItem('storeInfo')
    localStorage.removeItem('userAdminInfo')
    window.location.href = '/Admin/signin'
  }
  return (
    <div className='container-fluid p-0 h-100 mt-0 bg-light w-100'>
      {
        location.pathname.includes('/Admin') ? 
        <>
          <Navbar expand="md" className="" variant='dark' bg="dark">
            <Container className='w-100 d-flex' fluid>
              <Nav className='col-11'>
                <div className="col-md-3">
                  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                </div>
                <div className="col-md-9 d-flex justify-content-end">
                  
                  <div >
                    {
                      userAdminInfo ? 
                      (
                        <NavDropdown title={userAdminInfo.firstName} id="basic-nav-dropdown">
                            <Link className='dropdown-item'
                              to="#signout" onClick={signoutAdminHandler}>
                              Sign Out
                            </Link>
                            {/* <Link className='dropdown-item' to="/Admin/Profile">Profile</Link> */}
                            <Link className='dropdown-item' to="/Admin/Profile">Profile</Link>
                            <Link className='dropdown-item' to="/Admin/Stores">Store</Link>
                        </NavDropdown>
                    ):(
                        <ListGroup.Item  href="/Admin/signin">Sign In</ListGroup.Item>
                    )
                    }
                  </div>
                  <div >
                    {
                      storeInfo ? 
                      (
                        <NavDropdown title={storeInfo.storeNumber} id="basic-nav-dropdown">
                          
                            {
                              userAdminInfo!.stores ?
                              userAdminInfo?.stores.map((store:any)=>
                              ( 
                                <Link key={'storeTab-'+store} to={"/Admin/Store/"+store} className={
                                  location.pathname ==`/Admin/Store/${store}`?'dropdown-item active' :
                                  'dropdown-item'}> {store} </Link> 

                              ))
                              : null
                            }
                            <Link className='dropdown-item' to="/Admin/Stores">All Stores</Link>
                
                        </NavDropdown>
                      ):
                      (
                        <ListGroup.Item  href="/Admin/signin">Sign In</ListGroup.Item>
                      )
                    }
                  </div>
                </div>

              </Nav>
            </Container>
          </Navbar>
          {
            exceptionError ?
            <div role='alert' className={exceptionError?.exceptionErr?.type =='error'?'fade alert alert-danger show' :'col-md-6  border border-danger p-3 mt-2 rounded-3 bg-success-subtle start-25 left-25 text-center mx-auto' }> 
              {exceptionError?.exceptionErr?.message }
            </div>
            : <></>
          }
          {
            userAdminInfo && !location.pathname.includes('/Admin/Stores')?
            <div className='container-fluid p-0'>
              <Row className='w-100 row m-0'>
                <AdminTabs storeNumber={storeInfo.storeNumber}/>
                <div className="col-md-9 col-lg-10 mx-auto bg-light-grey p-3">
                  <Outlet />
                </div>
              </Row>
            </div>
            : 
            <Outlet />
          }
        </>
        : 
        <Row>
          <Header switchModeHandler={switchModeHandler} mode={mode} userInfo={userInfo} signoutHandler={signoutHandler}/>
          <Outlet />
        </Row>
      }
    </div>
  )
}

export default App
