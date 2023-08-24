import "./LoginForm.css";
import React from 'react';
import {useState} from 'react';
import {Form,Button} from 'react-bootstrap';


function LoginForm(props) {
  
  return (
    
        <div style={{"background":"grey"}}>
          <form id="loginForm" onSubmit={props.handleSubmit}>
            <br/>
            <input type="text" 
                  value={props.username}               
                  id="username"
                  name="username"
                  placeholder="username"/>
                  
            <input type="password" 
                  value={props.password} 
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