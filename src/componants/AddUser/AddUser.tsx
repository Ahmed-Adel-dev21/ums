import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function AddUser() {

  interface addUserData {
    id: number;
    image: string;
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    phone: string;
    birthDate: string;
  }

  let { register,reset, handleSubmit, formState: { errors } } = useForm<addUserData>();
  const location = useLocation();
  const navigate = useNavigate();

   // استلام البيانات لو موجودة (في حالة التعديل)
  const isEdit = location.state?.isEdit || false;
  const userData = location.state?.user || null;

  //-----------------
  let onSubmit = async (data: addUserData) => {
    try {
      if (isEdit) {
        // (PUT)
        await axios.put(`https://dummyjson.com/users/${userData.id}`, data);
        toast.success('Updated successfully');
      } else {
        // (POST)
        await axios.post("https://dummyjson.com/users/add", data);
        toast.success('Added successfully');
      }

      reset();
      navigate('/dashboard/users-list');
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

   // ملء الفورم بالبيانات لو إحنا في وضع التعديل
  useEffect(() => {
    if (isEdit && userData) {
      reset(userData);
    }
  }, [isEdit, userData, reset]);



  return (
    <div>
      <div className=" mb-5 pb-5">
        <div className="d-flex justify-content-between align-items-center my-3 mx-4  ">
          <h4 className="fw-semibold" >{isEdit ? 'Update User' : 'Add New User'}</h4>
        </div>
        <hr />
        <div className=" d-flex justify-content-center mt-5">
          <form onSubmit={handleSubmit(onSubmit)} className="  w-75  p-3 rounded-4 shadow-lg" >
            <div className="row">
              <div className="col-lg-6">
                <label className='p-2   text-muted fw-semibold'> First Name </label>
                <input type="text" className='form-control p-2 mb-2 bg-secondary bg-opacity-10' placeholder='Enter your First Name'
                {...register('firstName',{required:'firstName is requrid !!!!'})}
                />
                {errors.firstName&&<span className='text-danger'>{errors.firstName.message}</span>}

              </div>
              <div className="col-lg-6">
                <label className='p-2   text-muted fw-semibold'> Last Name </label>
                <input type="text" className='form-control p-2 mb-2 bg-secondary bg-opacity-10' placeholder='Enter your Last Name'
                {...register('lastName',{required:'lastName is requrid !!!!'})}
                />
                {errors.lastName&&<span className='text-danger'>{errors.lastName.message}</span>}

              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label className='p-2   text-muted fw-semibold'> Email </label>
                <input type="email" className='form-control p-2 mb-2 bg-secondary bg-opacity-10' placeholder='Enter your Email'
                {...register('email',{required:'email is requrid !!!!',pattern:{
                  value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message:'email shoude be validd'
                }})}
                />
                {errors.email&&<span className='text-danger'>{errors.email.message}</span>}

              </div>
              <div className="col-lg-6">
                <label className='p-2   text-muted fw-semibold'> Age </label>
                <input type="number" className='form-control p-2 mb-2 bg-secondary bg-opacity-10' placeholder='Enter your Age'
                {...register('age',{required:'age is requrid !!!!',max:{value:60,message:"sorry max age is 60"}},)}
                />
                {errors.age&&<span className='text-danger'>{errors.age.message}</span>}

              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label className='p-2   text-muted fw-semibold'> Phone Number </label>
                <input type="text" className='form-control p-2 mb-2 bg-secondary bg-opacity-10' placeholder='Enter your Phone Number'
                {...register('phone',{required:'phone is requrid !!!!'})}
                />
                {errors.phone&&<span className='text-danger'>{errors.phone.message}</span>}

              </div>
              <div className="col-lg-6">
                <label className='p-2   text-muted fw-semibold'> birth Date </label>
                <input type="date" className='form-control p-2 mb-2 bg-secondary bg-opacity-10' placeholder='Enter your birth Date'
                {...register('birthDate',{required:'birthDate is requrid !!!!'})}
                />
                {errors.birthDate&&<span className='text-danger'>{errors.birthDate.message}</span>}

              </div>
            </div>

            <div className="d-flex mt-5  justify-content-center align-items-center">

              <button className="btn mainColor_bg text-center text-white  px-5 py-2 fw-semibold">
                {isEdit ? 'Update' : 'Save'}
              </button>
            </div>



          </form>

        </div>
      </div>
    </div>
  )
}
