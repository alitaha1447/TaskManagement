import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { GetLoggedInUser } from '../apicalls/users';
import { SetAllUsers, SetUser } from '../redux/usersSlice';
function ProtectedPage({ children }) {
  const navigate = useNavigate();
  // const [user, setUser] = useState(null)
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users)
  const getUser = async () => {
    try {
      const response = await GetLoggedInUser()
      if (response.success) {
        // setUser(response.data)
        dispatch(SetUser(response.data))
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      message.error(error.message)
      localStorage.removeItem('token');
      navigate('/login')
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    } else {
      navigate('/login')
    }
  }, [])

  return (
    user && <div>
      <div className='flex justify-between items-center bg-primary text-white px-5 py-4'>
        <h1 className='text-2xl cursor-pointer' onClick={() => navigate('/')}>TrackManagement</h1>
        <div className='flex items-center bg-white px-5 py-2 rounded'>
          <span className='text-primary cursor-pointer'
            onClick={() => navigate('/profile')}>{user?.firstName}</span>
          <i className="ri-notification-line text-white mx-2 bg-gray-500 p-2 rounded-full"></i>
          <i class="ri-logout-box-r-line ml-10 text-primary cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login")
            }}></i>
        </div>
      </div>
      <div className='px-5 py-3'>
        {children}
      </div>
    </div>
  )
}

export default ProtectedPage
