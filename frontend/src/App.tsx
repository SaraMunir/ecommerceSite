import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import './App.scss';
import Header from './components/Structure/Header';
import AdminTabs from './components/Structure/AdminTabs';
import { Container, ListGroup, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import StoreFront from './pages/Store/StoreFront';
const ADMIN_SIDEBAR_WIDTH = 280;

function App() {
  let location = useLocation();
  const navigate = useNavigate()
  const { search } = useLocation()
    const [menuOpen, setMenuOpen] = useState(true)
    const [bodyContent, setBodyContent] = useState(true)
    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
        if(bodyContent){
            setTimeout(() => {
                setBodyContent(!bodyContent)
            }, 300);
        }
        if(!bodyContent){
            setBodyContent(!bodyContent)
        }
    }
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

  const signoutAdminHandler =()=>{
    dispatch({ type: 'ADMIN_USER_SIGNOUT'})
    localStorage.removeItem('storeInfo')
    localStorage.removeItem('userAdminInfo')
    window.location.href = '/Admin/signin'
  }

    // ✨ Derived layout styles based on sidebar state
  const contentMarginLeft = menuOpen ? '280px' : "calc(0px)";
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
                            <Link className='dropdown-item' to={"/Store/"+storeInfo.storeId}>Preview Store</Link>
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
            <div className="container-fluid p-0 adminContainer">
              {/* Render the fixed sidebar */}
              <AdminTabs
                storeNumber={storeInfo.storeNumber}
                toggleMenu={toggleMenu}
                menuOpen={menuOpen}
                bodyContent={bodyContent}
              />

              {/* Main content shifts and resizes relative to the sidebar */}
              <div
                className="bg-lightGrayDark p-3 min-vh-100" id='adminBodyContent'
                style={{
                  marginLeft: contentMarginLeft,
                  transition: 'margin-left 250ms ease',
                  width: `calc(100% - 0)`,
                }}
              >
                <Outlet />
              </div>
            </div>
            : 
            <Outlet />
          }
        </>
        :
      <StoreFront />
      }
    </div>
  )
}

export default App
