import React, { useEffect } from 'react';
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from '../../components/Divider';
import { RegisterUser } from '../../apicalls/users';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '../../redux/loaderSlice';
import { getAntdFormInputRules } from "../../utils/helpers";


function Register() {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.loaders);
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true))
      const response = await RegisterUser(values);
      dispatch(SetLoading(false))
      if (response.success) {
        message.success(response.message);
        navigate("/login")
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      dispatch(SetLoading(false))
      message.error(error.message)
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate("/")
    }
  });

  return (
    <div className='grid grid-cols-2'>
      <div className='bg-primary h-screen flex flex-col justify-center items-center'>
        <h1 className='text-7xl text-white'>
          Task Management
        </h1>
        <span className="text-white mt-5">
          One place to track all your business records
        </span>
      </div>
      <div className='flex justify-center items-center'>
        <div className='w-[420px]'>
          <h1 className='text-2xl text-gray-700'>
            Register to your account
          </h1>
          <Divider />
          <Form layout='vertical' onFinish={onFinish}>
            <Form.Item label="First Name" name="firstName" rules={getAntdFormInputRules}>
              <Input />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName" rules={getAntdFormInputRules}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={getAntdFormInputRules}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={getAntdFormInputRules}>
              <Input type='password' />
            </Form.Item>
            <Button type='primary' htmlType='submit' block
              loading={loading}>
              {loading ? "Loading" : "Register"}
            </Button>
            <div className='flex justify-center mt-5'>
              <span>
                Already have an account? <Link to="/login">Login</Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div >
  );
}

export default Register;
