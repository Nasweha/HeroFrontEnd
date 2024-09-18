
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import { toast,ToastContainer } from 'react-toastify'
import login from '../assets/login.png'
import { faMasksTheater } from '@fortawesome/free-solid-svg-icons/faMasksTheater'
import { useNavigate } from 'react-router-dom'
import { loginApi } from '../service/allApi'
import 'react-toastify/dist/ReactToastify.css';

function Auth() {
  const [userDetails, setUserDetails] = useState({
   
    email: "",
    password: ""
  });

  const navigate = useNavigate();



  const handleLogin = async () => {
    const { email, password } = userDetails;
    if (!email || !password) {
      toast.success('Please fill the fields completely');
      return;
    }
  
    try {
      const result = await loginApi({ email, password });
  
      if (result && result.status === 200) {
        toast.success('Login successful');
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser));
        sessionStorage.setItem("token", result.data.token);
        console.log(result.data.token);
        setUserDetails({ email: "", password: "" });
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        toast.info(result.response?.data || 'An error occurred');
      }
    } catch (error) {
      toast.info('An error occurred');
    }
  };
  
  return (
    <div className='bg-primary'>
         <div className=' d-flex justify-content-center align-items-center flex-column' style={{height:'100vh'}}>
       
          <div className="  p-5  mt-2 rounded"style={{backgroundImage: 'radial-gradient(circle at 50.4% 50.5%, rgb(251, 32, 86) 0%, rgb(135, 2, 35) 90%)'}}>
            <Row>
              <Col sm={12} md={6} className=' d-flex justify-content-center align-items-center'>
              <img src={login} alt="no image"  className='w-100'/>
              </Col>
              <Col sm={12} md={6} className='d-flex justify-content-center align-items-center text-light flex-column'>
              <h3><FontAwesomeIcon icon={faMasksTheater} spin spinReverse  size='xl' style={{color: "#2275b4",}} className='me-2 text-center mt-4' />YourHero</h3>
            
              <h5 className='text-center'>Login</h5>


              <form className='mt-4 w-100'>
               
                <div className='mb-3'>
                  <input type="text" placeholder='Email' className='form-control'onChange={(e)=>setUserDetails({...userDetails, email:e.target.value})}  />
                </div>
                <div className='mb-3'>
                  <input type="password" placeholder='Password' className='form-control' onChange={(e)=>setUserDetails({...userDetails, password:e.target.value})}  />
                </div>
                <div className='mb-3'>
                 <div>
                  <button className='btn btn-warning w-100' type='button' onClick={handleLogin}>Login</button>
                  </div>
                </div>

              </form>
              </Col>

            </Row>
            
          </div>
        
        </div>
        {  <ToastContainer theme='colored' position='top-center' autoClose = '2000' /> }
    </div>
  )
}

export default Auth