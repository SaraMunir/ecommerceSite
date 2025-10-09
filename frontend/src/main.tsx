import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.tsx'
import HomePage from './pages/HomePage.tsx'
import ProductPage from './pages/ProductPage.tsx'
import ListingPage from './pages/ListingPage.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AdminPage from './pages/Admin/AdminPage.tsx'
import AdminProductListingPage from './pages/Admin/AdminProductListPage.tsx'
import OrderPage from './pages/Admin/OrderPage.tsx'
import { StoreProvider } from './Store.tsx'
import SigninPage from './pages/SigninPage.tsx'
import SignupPage from './pages/SignupPage.tsx'
import AdminSigninPage from './pages/Admin/AdminSigninPage.tsx'
import AdminProfilePage from './pages/Admin/AdminProfilePage.tsx'
import AdminSignupPage from './pages/Admin/AdminSignupPage.tsx'
import CustomerPage from './pages/Admin/CustomerPage.tsx'
import AdminStorePage from './pages/Admin/AdminStorePage.tsx'
import AdminSettings from './pages/Admin/AdminSettings.tsx'
import AdminProductPage from './pages/Admin/AdminProductPage.tsx'
import AdminCategoryPage from './pages/Admin/AdminCategoryPage.tsx'
import StorePage from './pages/StorePage.tsx'
import StoreHomePage from './pages/Store/HomePage.tsx'
import StoreProductPage from './pages/Store/StoreProductPage.tsx'
import DesignTemplate from './pages/Admin/DesignTemplate.tsx'
import Site from './pages/Admin/OnlineStore/Site.tsx'
import FormatPage from './pages/Admin/OnlineStore/FormatPage.tsx'
import Pages from './pages/Admin/OnlineStore/Pages.tsx'
import Components from './pages/Admin/OnlineStore/Components.tsx'
import Navigation from './pages/Admin/OnlineStore/Navigation.tsx'
import Preferences from './pages/Admin/OnlineStore/PreferencePage.tsx'
import ContactUs from './pages/Store/ContactUs.tsx'
import AdminCategoryList from './pages/Admin/AdminCategoryList.tsx'
import AdminPromotion from './pages/Admin/promotional/AdminPromotion.tsx'
import AdminNewProdListPage from './pages/Admin/AdminNewProdListPage.tsx'
import AdminProductManagePage from './pages/Admin/ProductManagement/AdminProductManagePage.tsx'
import AdminVariants from './pages/Admin/ProductManagement/AdminVariants.tsx'
import AdminImageGallery from './pages/Admin/media/AdminImageGallery.tsx'
import ProductListingPage from './pages/Store/ProductListingPage.tsx'
import AboutPage from './pages/Store/AboutPage.tsx'

// import axios from 'axios'
// axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000':'/'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App /> }>
      <Route index={true} element={<HomePage />} />
      {/* <Route path='/About' element={<AboutPage />} /> */}
      <Route path='/signin' element={<SigninPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/Product/:slug/:id' element={<ProductPage />} />
      <Route path='/Store/:storeId/Category/:categoryName/:catId' element={<ListingPage />} />
      <Route path='/Category' element={<ListingPage />} />

      {/* admin */}
      <Route path='/Admin' element={<AdminPage />} />
      <Route path='/Admin/signin' element={<AdminSigninPage />} />
      <Route path='/Admin/signup' element={<AdminSignupPage />} />
      <Route path='/Admin/Stores' element={<AdminStorePage />} />
      <Route path='/Admin/Store/:storeNumber' element={<AdminPage />} />
      <Route path='/Admin/Store/:storeNumber/Dashboard' element={<AdminPage />} />
      <Route path='/Admin/Store/:storeNumber/Products' element={<AdminProductListingPage />} />
      <Route path='/Admin/Store/:storeNumber/Products/Categories' element={<AdminCategoryPage />} />
      {/* <Route path='/Admin/Store/:storeNumber/Products/Promotional' element={<AdminPromotion />} /> */}
      <Route path='/Admin/Store/:storeNumber/NewProducts' element={<AdminNewProdListPage />} />
      <Route path='/Admin/Store/:storeNumber/NewProducts/Variants' element={<AdminVariants />} />
      <Route path='/Admin/Store/:storeNumber/NewProducts/manageProduct/:action' element={<AdminProductManagePage />} />
      <Route path='/Admin/Store/:storeNumber/NewProducts/CategoryList' element={<AdminCategoryList />} />
      <Route path='/Admin/Store/:storeNumber/NewProducts/Promotional' element={<AdminPromotion />} />
      <Route path='/Admin/Store/:storeNumber/Product/:action' element={<AdminProductPage />} />
      <Route path='/Admin/Store/:storeNumber/Orders' element={<OrderPage />} />
      <Route path='/Admin/Store/:storeNumber/Customers' element={<CustomerPage />} />
      <Route path='/Admin/Store/:storeNumber/Site' element={<Site />} />
      <Route path='/Admin/Store/:storeNumber/Media' element={<AdminImageGallery />} />
      <Route path='/Admin/Store/:storeNumber/Site/Style' element={<Site />} />
      <Route path='/Admin/Store/:storeNumber/Site/Components' element={<Components />} />
      <Route path='/Admin/Store/:storeNumber/Site/Navigation' element={<Navigation />} />

      <Route path='/Admin/Store/:storeNumber/Site/Preferences' element={<Preferences />} />
      {/* <Route path='/Admin/Store/:storeNumber/Site/Design/:designId' element={<DesignTemplate />} /> */}
      <Route path='/Admin/Store/:storeNumber/Site/Design' element={<DesignTemplate />} />
      <Route path='/Admin/Store/:storeNumber/Site/Pages' element={<Pages />} />
      <Route path='/Admin/Store/:storeNumber/Site/Page/:pageName' element={<FormatPage />} />
      <Route path='/Admin/Store/:storeNumber/Settings' element={<AdminSettings />} />
      <Route path='/Admin/Profile' element={<AdminProfilePage />} />

      {/* site */}
      <Route path='/Store/:storeId' element={<StoreHomePage />} />
      <Route path='/Store/:storeId/product/:productId' element={<StoreProductPage />} />
      <Route path='/Store/:storeId/products' element={<ProductListingPage />} />
      <Route path='/Store/:storeId/about' element={<AboutPage />} />
      <Route path='/Store/:storeId/contact' element={<ContactUs />} />
    </Route>
  )
)
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StoreProvider>
    {/* <RouterProvider router={router}/> */}
  </StrictMode>,
)
