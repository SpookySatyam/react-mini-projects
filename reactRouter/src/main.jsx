import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router'
import App from './App'
import Home from './components/Home/Home'
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import User from './components/User/User'

const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"/About",
        element:<About/> 
      },
      {
        path:"/contact-us",
        element:<Contact/> 
      },
      {
        path:"/user",
        element:<User/> 
      }
    ]
    
  }
])

// const router=createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Home/>}>
//       <Route path='/' element={<Home/>}/>
//       <Route path='/about' element={<About/>}/>
//       <Route path='/contact' element={<Contact/>}/>
//       <Route path='/Uset/:userid' element={<User/>}/>
//     </Route>
//   )
// )

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>,
)
