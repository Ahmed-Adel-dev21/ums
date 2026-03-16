import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'

export default function 
() {
  return (
    <>

    <div className="d-flex">
        
            <div className=" ">
                <SideBar/>
            </div>
            <div className='w-100'>

              <NavBar/>
            <div className="content ">
              <Outlet/>
              </div>
            </div>
        </div>
    
    

    </>
  )
}
