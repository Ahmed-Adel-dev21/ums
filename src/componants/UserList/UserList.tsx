import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export default function UserList() {
  let navegate = useNavigate()

  // data (state , interface )
  interface userData {
    id: number;
    image: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
  }
  const [users, setUsers] = useState<userData[]>([]);
  
  // ---------------------


  // modal edit and send current data to update page (addUser.tsx)
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<userData | null>(null);
  const handleCloseEdit = () => setShowEditModal(false);
  const handleShowEdit = (user: userData) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };
  const confirmEdit = () => {
    // لما يوافق، نبعته لصفحة الإضافة مع البيانات
    navegate('/dashboard/add-user', { state: { user: selectedUser, isEdit: true } });
    handleCloseEdit();
  };
  // ------------------- finish modal edit -----------------------------------

  // user data show in modal
  const [usersData, setUsersData] = useState<userData | null>(null);

  // modale delete user 

  const [usersID, setUsersId] = useState<number | null>(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (user: userData) => {
    setShow(true);
    setUsersId(user?.id)
    setUsersData(user)
  }

  let deletUser = async () => {
    await axios.delete(`https://dummyjson.com/users/${usersID}`);
    handleClose();
    toast.success('deleted is success ')
    getData();
  }
  // end  modale delete user


  //  get data from api 
  let getData = async () => {
    let response = await axios.get('https://dummyjson.com/users')
    setUsers(response?.data?.users);
    // end get data from api 

  }
  // navegate pages 
  let moveToAddUser = () => {
    navegate('/dashboard/add-user')
  }

  useEffect(() => {
    getData();
    return () => {
    };
  }, []);


  return (
    <div>
      <div className="container ">
        <div className="d-flex justify-content-between w-100 align-items-center my-md-3 mx-md-4  ">
          <h4 className="fw-semibold">Users List </h4>
          <button onClick={moveToAddUser} className="btn mainColor_bg text-white px-md-5 py-md-2 fw-semibold">ADD NEW USER</button>
        </div>
        <hr className='my-0' />
        {/* ------------------- show data in table ---------------- */}
        <Table className={`my-4 text-center custom_table`} hover size="sm">
          <thead >
            <tr >
              <th className='text-secondary'>#</th>
              <th className='text-secondary'>Images</th>
              <th className='text-secondary'>First Name</th>
              <th className='text-secondary'>Last Name</th>
              <th className='text-secondary'>E-mail</th>
              <th className='text-secondary'>Phone</th>
              <th className='text-secondary'>BirthDate</th>
              <th className='text-secondary'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user =>
              <tr className='' key={user?.id}>
                <td>{user?.id}</td>
                <td><img className='w-25 ' src={user?.image} alt="profile image" /></td>
                <td>{user?.firstName}</td>
                <td>{user?.lastName}</td>
                <td>{user?.email}</td>
                <td>{user?.phone}</td>
                <td>{user?.birthDate}</td>
                <td>
                  <FaRegEdit size={20} className='mainColor cursor_pointer'
                    onClick={() => handleShowEdit(user)} />
                  <BsFillTrash3Fill onClick={() => handleShow(user)} size={20} className='text-danger cursor_pointer mx-2' />
                </td>

              </tr>
            )}
          </tbody>
        </Table>

        {/* modale Delete */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header className='bg-danger   ' closeButton>
            <Modal.Title className='text-white'>Confirm delet <span className='text-black'>{usersData?.firstName}</span></Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you wante to delet <span className='text-danger'>{usersData?.firstName} !!!!</span>  </Modal.Body>
          <Modal.Footer>
            <Button className='' variant="outline-danger fw-semibold rounded-4 " onClick={deletUser}>
              Delete
            </Button>
            <Button variant="outline-secondary fw-semibold rounded-4 px-3" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* modal Edit */}
        <Modal show={showEditModal} onHide={handleCloseEdit} >
          <Modal.Header closeButton className="mainColor_bg bg-opacity-25">
            <Modal.Title>Confirm Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you want to edit data for <span className="fw-bold mainColor">{selectedUser?.firstName} {selectedUser?.lastName}</span>?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" className="fw-semibold" onClick={handleCloseEdit}>
              Cancel
            </Button>
            <Button variant="warning" className="fw-semibold" onClick={confirmEdit}>
              Yes, Go to Edit
            </Button>
          </Modal.Footer>
        </Modal>

      </div>


    </div>
  )
}

