import React from 'react'
import { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import {login, signup} from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'  // we will use this gif when we click on sign-in or sign-up, then login image will be displayed, and once we are logged in that will be removed.



const Login = () => {

   const [signState, setSignState] = useState("Sign In");

// now we will create the state variable that will store the form data where input fields are like name, email, password.
// so we will store these forms data in the state variable.

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   // after witing these, we have to connect these State variable with the input fields.
   // so that when we add data in the input fields, that will be saved in these states variable.

  const [loading, setLoading] = useState(false);   // whenever we will click login or sign up button, this this loading state will be true.


  // now we have to create function for user-authentication.
   const user_auth = async (event)=>{
    event.preventDefault();                        // whenever we submit the form we will get the event here. 
   
    setLoading(true);
    
    if(signState==="Sign In"){                 // Using this event we will add prevent default,                                             
      await login(email, password);            // so it will not reload the web page whenever we submit the form.
    } else {
      await signup(name, email, password)      
    }
    setLoading(false);
   } 
   // next we have to connect this user_auth function with this submit button


  return (

    loading? <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:

    <div className='login'>

      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">

        <h1> {signState} </h1>

        <form>
          {signState==="Sign Up"? <input value={name} onChange={ (e) => { setName(e.target.value)} } 
          type="text" placeholder='Your Name' />: <></>}

          <input value={email} onChange={ (e) => { setEmail(e.target.value)} }   
          type="email" placeholder='email' />

          <input value={password} onChange={ (e) => {setPassword(e.target.value)} }
           type="password" placeholder='Password' />

          <button onClick={user_auth} type='submit' > {signState} </button> 

 {/* So now whenever we will enter any data into our input field, those values will be stored in the state variable. */}
          <div className="form-help">

            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>

            <p>Need Help</p>
          </div>
        </form>
        <div className="form-switch">

          { signState==="Sign In" ? <p>New to Netflix? <span onClick={ () =>{setSignState("Sign Up")}}>Sign Up Now</span> </p> 
          : <p>Already have account <span onClick={ () =>{setSignState("Sign In")}}>Sign In Now</span> </p>  }
        </div>
      </div>
        
    </div>
  )
}

export default Login