import "./LoginForm.css";
import React from 'react';
import {Button} from 'react-bootstrap';

function LoginForm(props) {
  const {handleSubmit,handleChange,username,password} = props;
  return (
        <div style={{"background":"grey"}}>
          <form id="loginForm" onSubmit={handleSubmit}>
            <br/>
            <input type="text" 
                  value={username}    
                  onChange={handleChange}           
                  id="username"
                  name="username"
                  placeholder="username"/>
                  
            <input type="password" 
                  value={password} 
                  onChange={handleChange}  
                  id="password" 
                  name="password"
                  placeholder="password" 
                  style={{"marginLeft":"10px"}}/>         
          <Button type="submit" style={{"marginLeft":"10px"}}>Login</Button>
          </form>
        </div>
  )
}

export default LoginForm