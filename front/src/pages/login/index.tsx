import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@arco-design/web-react';
import './index.scss'


const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="form">
      <Button type='primary' onClick={() => navigate('/')}>返回首页</Button>
      LOGIN
    </div>
    
  )
}



export default Login;