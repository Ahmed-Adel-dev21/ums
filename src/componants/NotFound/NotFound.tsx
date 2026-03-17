import { IoHomeOutline } from "react-icons/io5"
import { Link } from "react-router-dom"


export default function NotFound() {
  return (
    <>
      <div className="container">
        <div className="row mx-3 justify-content-center align-items-center vh-100">
          <div className="col-lg-5 m-3 bg-white p-4 rounded ">
            <div className=" text-center">
              <h2 className='fw-bold fs-1 title mx-auto px-3  border border-5 border-warning border-top-0 border-end-0 border-bottom-0'>404</h2>
              <h4 className='fw-semibold'>File not found</h4>
              <small> Go To Home Page </small><Link to={'/dashboard/'}  ><IoHomeOutline size={17} className='mx-1' /> Home </Link>

            </div>

           


          </div>

        </div>
      </div>
    </>
  )
}
