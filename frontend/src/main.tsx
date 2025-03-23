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
import AboutPage from './pages/AboutPage.tsx'
import ProductPage from './pages/ProductPage.tsx'
import ListingPage from './pages/ListingPage.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// import axios from 'axios'
// axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000':'/'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path='/About' element={<AboutPage />} />
      <Route path='/Product/:id' element={<ProductPage />} />
      <Route path='/Category/:categoryName/:id' element={<ListingPage />} />
      <Route path='/Category' element={<ListingPage />} />
    </Route>
  )
)

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <RouterProvider router={router}/> */}
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
