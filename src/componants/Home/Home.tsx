import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import Card from 'react-bootstrap/Card';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { PolarArea } from 'react-chartjs-2';
import { FaUsers } from "react-icons/fa";
import { TbAlarmAverage, TbAlertTriangle } from "react-icons/tb";
import { IoSettingsSharp } from "react-icons/io5";
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


// تسجيل المكونات المطلوبة
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  // 2. إعداد البيانات
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Grey', 'Green'],
    datasets: [
      {
        label: 'My Dataset',
        data: [11, 16, 9, 7, 14],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // 3. خيارات التنسيق
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Polar Area Chart Example',
      },
    },
  };


  const dataLinear = {
    labels: ['January', 'February', 'March', 'iprile', 'may'],
    datasets: [
      {
        label: 'Sales',
        data: [42, 69, 54, 74, 86],
        borderColor: 'rgb(75, 192, 192)',
      },
    ]
  }

  // data (state , interface )
  interface userData {
    id: number;
    image: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
    company: string;
    department: string;
    role: string;
    age: number;
  }
  const [users, setUsers] = useState<userData[]>([]);
  //  get data from api 
  let getData = async () => {
    let response = await axios.get('https://dummyjson.com/users')
    setUsers(response?.data?.users);
  }
  // end get data from api 

  const calculateAvgAge = (users: userData[]) => {
    

    const totalAge = users.reduce((sum, user) => sum + user.age, 0);
    const average = totalAge / users.length;

    return Math.round(average); 
  };



  
  const avgAge = calculateAvgAge(users);

  useEffect(() => {
    getData();
    console.log(users);

    return () => {
    };
  }, []);


  return (
    
      <div className="mb-5 pb-5">
        <div className="container   ">
          <div className="d-flex justify-content-between align-items-center my-3 mx-4  ">
            <h4 className="fw-semibold">Home </h4>
          </div>
          <hr className='my-0' />
          {/* ------------------- show data in table ---------------- */}

          <div className="row my-3 justify-content-between  align-items-start p-5  ">

            <div className="col-lg-6  ">
              <div className="row g-3">
                <h3 className=" mx-auto mainColor letter_space fs-1 fw-semibold">General Information</h3>

                <div className="col-lg-6 ">
                  <div>
                    <Card className="shadow-sm p-3 card_hove   rounded-5" >
                      <FaUsers size={40} className="text-primary mx-2" />
                      <h2 className="mb-2">  Total Users</h2>
                      <h3 className="fw-bold mb-0">{users.length}</h3>
                      <p className="text-muted">Database Records</p>
                    </Card>
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div>
                    <Card className="shadow-sm card_hove  p-3 rounded-5" >
                      <TbAlarmAverage size={45} className="text-success fw-bold mx-2" />
                      <h2 className="mb-2"> Avg Age</h2>
                      <h3 className="fw-bold mb-0">{avgAge}</h3>
                      <p className="text-muted">Database Records</p>
                    </Card>
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div>
                    <Card className="shadow-sm card_hove p-3    rounded-5" >
                      <IoSettingsSharp size={40} className="text-warning" />
                      <h2 className="mb-2">System Health</h2>
                      <h3 className="fw-bold mb-0">95%</h3>
                      <p className="text-muted">Database Records</p>
                    </Card>
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div>
                    <Card className="shadow-sm card_hove   p-3    rounded-5" >
                      <TbAlertTriangle size={40} className="text-danger" />
                      <h2 className="mb-2">Active Alerts</h2>
                      <h3 className="fw-bold mb-0">0</h3>
                      <p className="text-muted">Database Records</p>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6   ">
              <h3 className=" mb-4  mx-auto mainColor letter_space fs-1 fw-semibold">Average Sales</h3>

              <Line className="p-2 shadow-lg rounded-3   " data={dataLinear} />
            </div>
          </div>

          <div className="row d-flex justify-content-center align-items-start ">
            <div className="col-lg-6 mt-5 ">
              <div className="card shadow p-3">
                <h3 className="text-center mb-4">My Dataset </h3>
                <PolarArea className="position-static" data={data} options={options} />
              </div>
            </div>
            <div className="col-lg-6  ">
              <h3 className=" mx-auto mainColor letter_space fs-1 fw-semibold">Best Users</h3>
              <Table className={`my-4 text-center custom_table `} hover size="sm">
                <thead >
                  <tr  >
                    <th className='text-secondary bg-dark text-bold border rounded-2'>#</th>
                    <th className='text-secondary bg-dark text-bold border rounded-2'>Images</th>
                    <th className='text-secondary bg-dark text-bold border rounded-2'>First Name</th>
                    <th className='text-secondary bg-dark text-bold border rounded-2'>Last Name</th>
                    <th className='text-secondary bg-dark text-bold border rounded-2'>E-mail</th>
                  </tr>
                </thead>
                <tbody className="   " >
                  {users.slice(0, 8).map(user =>
                    <tr className='' key={user?.id}>
                      <td className="py-1 px-1 bg-dark  text-warning ">{user?.id}</td>
                      <td className="py-1 px-1 bg-dark  text-warning "><img className='w-25 ' src={user?.image} alt="profile image" /></td>
                      <td className="py-1 px-1 bg-dark  text-warning ">{user?.firstName}</td>
                      <td className="py-1 px-1 bg-dark  text-warning ">{user?.lastName}</td>
                      <td className="py-1 px-1 bg-dark  text-warning ">{user?.role === 'admin' ? <span className="text-success">{user?.role}</span> : <span className=" text-primary">{user?.role}</span>}</td>


                    </tr>
                  )}
                </tbody>
              </Table>

            </div>


          </div>





        </div>


      </div>

    
  )
};


