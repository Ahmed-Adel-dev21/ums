import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './componants/AuthLayout/AuthLayout'
import NotFound from './componants/NotFound/NotFound'
import Login from './componants/Login/Login'
import MasterLayout from './componants/MasterLayout/MasterLayout'
import Home from './componants/Home/Home'
import UserList from './componants/UserList/UserList'
import AddUser from './componants/AddUser/AddUser'
import Profile from './componants/Profile/Profile'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  
  const routes=createBrowserRouter([
    {
      path:'/',
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Login/>},
        {path:'login',element:<Login/>}
      ]
    },
    {
      path:'dashboard',
      element:<MasterLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Home/>},
        {path:'home',element:<Home/>},
        {path:'users-list',element:<UserList/>},
        {path:'add-user',element:<AddUser/>},
        {path:'profile',element:<Profile/>},
      ]
    }
  ])

  return (
    <>
    <ToastContainer />    
    <RouterProvider router={routes}></RouterProvider>
     
      
    </>
  )
}

export default App
