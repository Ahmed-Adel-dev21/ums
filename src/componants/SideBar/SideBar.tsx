import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FaRegUser } from 'react-icons/fa'
import { IoMdMenu } from 'react-icons/io'
import { IoHomeOutline } from 'react-icons/io5'
import { MdMenuOpen } from 'react-icons/md'
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar'
import { Link, useLocation } from 'react-router-dom'
// import profile from 'D:/1Ahmed2026/React/UMS/src/assets/testimonial-2.jpg'
import { useContext, useState } from 'react'
import { TbLogout } from 'react-icons/tb'
import { AuthContext } from '../Context/Context'

export default function SideBar() {
  
  const {userData}:any=useContext(AuthContext);
  

  const [colopse, setColopse] = useState(false);
  let colopseToggel = () => {
    setColopse(!colopse)
  }

  const location = useLocation();
   const isActive = (path:string) => location.pathname === path;

  return (
    
      <Sidebar collapsed={colopse} className='sidebar sideContainer'>
        {colopse ? <IoMdMenu onClick={colopseToggel} className='icon_hover m-2' size={30} /> :
          <MdMenuOpen onClick={colopseToggel} className='icon_hover m-2' size={30} />}
        <div className='p-3 text-center'>

          <img className=' profile_img ' src={userData?.image} alt="Profile" />
          <h5 className=' my-1'>{userData?.firstName}</h5>
          <p className='text-warning my-0 py-0'>{userData?.role}</p>


        </div>
        <div className="d-flex  flex-column justify-content-between">

          <Menu className='text-center'>
            <MenuItem className={`fw-semibold ${isActive('/dashboard/') ? 'active-link' : ''}`}  component={<Link to="/dashboard/" />}><IoHomeOutline size={17} className='mx-1' /> Home </MenuItem>
            <MenuItem className={`fw-semibold ${isActive('/dashboard/users-list') ? 'active-link' : ''}`}  component={<Link to="/dashboard/users-list" />}><FaRegUser size={17} className='mx-1' /> Users</MenuItem>
            <MenuItem className={`fw-semibold ${isActive('/dashboard/add-user') ? 'active-link' : ''}`}  component={<Link to="/dashboard/add-user" />}><AiOutlineUsergroupAdd size={22} className='mx-1' /> Add User</MenuItem>
            <MenuItem className={`fw-semibold ${isActive('/dashboard/profile') ? 'active-link' : ''}`}  component={<Link to="/dashboard/profile" />}><CgProfile size={20} className='mx-1' /> Profile </MenuItem>
          </Menu>

          <Menu className='text-center pt-5'>
            <MenuItem className='fw-semibold' component={<Link to="/" />}> Logout <TbLogout size={17} className='mx-1' /> </MenuItem>
          </Menu>

        </div>
      </Sidebar>
    
  )
}
