import axios from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/Context';

interface LoginFormInputs{
  username:string;
  password:string;
}
interface AuthContextType{
  saveUserData:()=>void;
}
export default function Login() {


const {saveUserData}= useContext(AuthContext) as AuthContextType;

let{register,handleSubmit,formState:{errors}}=useForm<LoginFormInputs>();
let navigate=useNavigate();
//-----------------
let onSubmit=async(data:LoginFormInputs)=>{
  // api call
  try {
    let response= await axios.post("https://dummyjson.com/auth/login",data);
    localStorage.setItem('userToken',response?.data?.accessToken)
    saveUserData();
    
    
    toast.success('Looogin is successss ',
      {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",
  }
    )
    
    navigate('/dashboard')
    
    
  } catch (error:any) {
    const errorMessage = error.response?.data?.message || "Login failed! Please check your credentials.";
  
  toast.error(errorMessage, {
    position: "top-right",
    autoClose: 3000,
    theme: "colored",
  });
  }
}

  return (
    <>
    <div className="login-container">
      <div className="container">
        <div className="row mx-3 justify-content-center align-items-center vh-100">
          <div className="col-lg-4 m-3 bg-white p-5 rounded ">
            <div className=" text-center">
              <h3 className='fw-bold title px-2  border border-5 border-warning border-top-0 border-end-0 border-bottom-0'>User Management System</h3>
              <h4 className='fw-semibold'>Sign In</h4>
              <small> Enter your credentials to access your account </small>

            </div>

            <form onSubmit={handleSubmit(onSubmit)} >
              <label className='py-2'> UserName </label>
              <input type="text" className='form-control mb-2' placeholder='enter user name' 
              {...register('username',{required:'username is requrid !!!!'})}
              />
              {errors.username&&<span className='text-danger'>{errors.username.message}</span>}

              <label className='py-2 d-block' > Password </label>
              <input type="password" className='form-control' placeholder='enter password' 
               {...register('password',{required:'password is requrid !!!!'})}
              />

              {errors.password&&<span className='text-danger'>{errors.password.message}</span>}


              <button  className='btn btn-warning w-100 text-white my-3'>Login</button>
            </form>


          </div>

        </div>
      </div>
    </div>
    
    </>
  )
}
