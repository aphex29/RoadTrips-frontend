import React from 'react'
import Button from 'react-bootstrap/Button';
import './CreateForm.css';

function CreateForm(props) {

  const {handleSubmit, handleChange, firstName, lastName, email, username, password} = props;


  return (
    <div style={{"background":"grey"}}>
          <form id="loginForm" onSubmit={handleSubmit}>
            <br/>
            <input type="text" 
                  value={firstName}    
                  onChange={handleChange}           
                  name="firstName"            
                  placeholder="First Name"/>
                  
            <input type="text" 
                  value={lastName} 
                  onChange={handleChange}  
                  name="lastName"          
                  placeholder="Last Name"/>
            <br/>
            <input className="mt-2"
                  type="email" 
                  value={email} 
                  onChange={handleChange}  
                  name="email"          
                  placeholder="Email"/>

            <br/>
            <input className="mt-2"
                  type="text" 
                  value={username} 
                  onChange={handleChange}  
                  name="username"          
                  placeholder="Username"/>

            <br/>
            <input className="mt-2"
                  type="password" 
                  value={password} 
                  onChange={handleChange}  
                  name="password"          
                  placeholder="Password"/>

          <br/>
          <Button type="submit" className="mt-3 mb-3" >Create</Button>
          </form>
        </div>
  )
}

export default CreateForm