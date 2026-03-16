
import { BsBell } from 'react-icons/bs';

export default function NavBar() {
  return (
    <>

      <nav className="navbar py-2 px-4 bg-w">
        <div className="container-fluid">
          <h4 className='fw-bold letter_space border border-5 border-warning border-top-0 border-end-0 border-bottom-0 px-1'>UMS</h4>
          <form className="d-flex align-items-center" role="search">
            <input className="form-control mx-3 bg-secondary bg-opacity-10 rounded-4 " type="search" placeholder="Search" aria-label="Search" />
            <BsBell size={25} className='text-secondary' />
          </form>
        </div>
      </nav>

    </>
  )
}
