import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/Context';
import axios from 'axios';

export default function Profile() {

  const {userData}:any=useContext(AuthContext);

  // const [usersID, setUsersId] = useState<number | null>(null);

  // data (state , interface )
  interface userData {
  
    age: number;
  phone: string;
  birthDate: string;
  }
    const [usersData, setUsersData] = useState<userData | null>(null);

  

    
    let getUser = async (id: number) => {
  try {
    const response = await axios.get(`https://dummyjson.com/users/${id}`);
    setUsersData(response?.data);
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};




  useEffect(() => {
  if (userData?.id) {
    // setUsersId(userData.id); 
    getUser(userData.id);   
  }
}, [userData]);
  return (
    
      < >
        <div className="d-flex justify-content-between align-items-center  mx-4  ">
          <h4 className="fw-semibold" >Profile</h4>
        </div>
        <hr />
        <div className="d-flex justify-content-center align-items-center mb-5 pt-4">
          <form 
           className="m-md-5 w-75 mx-auto p-md-5 p-2 rounded-4  shadow-lg position-relative" >
            <div>
              <img className='profileImage '  src={userData?.image} alt="" />
            </div>
            <div className="row my-2 mt-5 pt-5">
              <div className="col-lg-6">
                <label className='p-2   text-muted fw-semibold'> First Name </label>
                <input readOnly type="text" className='form-control fw-bold p-2 mb-2 bg-secondary bg-opacity-10' value={userData?.firstName}
                />

              </div>
              <div className="col-lg-6">
                <label className='p-2   text-muted fw-semibold'> Last Name </label>
                <input readOnly type="text" className='form-control p-2 fw-bold mb-2 bg-secondary bg-opacity-10' value={userData?.lastName}
                />

              </div>
            </div>
            <div className="row my-2">
              <div className="col-lg-6">
                <label className='p-2   text-muted fw-semibold'> Email </label> //email
                <input readOnly type="email" className='form-control p-2 mb-2 bg-secondary bg-opacity-10' value={userData?.email}
            
                />

              </div>
              <div className="col-lg-6">
                <label className='p-2   text-muted fw-semibold'> Age </label>
                <input readOnly type="number" className='form-control p-2 mb-2 bg-secondary bg-opacity-10' value={usersData?.age}
                />

              </div>
            </div>
            <div className="row my-2">
              <div className="col-lg-6">
                <label className='p-2   text-muted fw-semibold'> Phone Number </label>
                <input readOnly type="text" className='form-control p-2 mb-2 bg-secondary bg-opacity-10' value={usersData?.phone}
                />

              </div>
              <div className="col-lg-6">
                <label className='p-2   text-muted fw-semibold'> birth Date </label>
                <input readOnly type="text" className='form-control p-2 mb-2 bg-secondary bg-opacity-10' value={usersData?.birthDate}
                />

              </div>
            </div>

            



          </form>

        </div>
      </>
    
  )
}
