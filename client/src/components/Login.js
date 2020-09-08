import React, { useState, useContext } from 'react';
import Header from './sub-components/Login/Header'
import {OwltalkContext} from '../context/owltalkContext'

const Login = () => {
   const owltalkContext = useContext(OwltalkContext)
   const {alert} = owltalkContext
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

   const onSubmit = async (e) => {
      e.preventDefault()
      await owltalkContext.login({email, password});
   }

   return (
      <div>
         {alert != null && alert.text.length > 0 && 
         <div className={`alert alert-${alert.type} text-center`}>
            {alert.text}
         </div>
         }
         <Header text="Log in to your OwlTalk Account"/>
      
         {/* <!-- User Form --> */}
         <form onSubmit={onSubmit}>
            <div className="container" style={{paddingTop: "50px"}}>
               <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                     <span className="input-group-text" id="inputGroup-sizing-lg">Email</span>
                  </div>
                  <input 
                  type="text" 
                  className="form-control" 
                  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" 
                  value={email}
                  onChange={e => setEmail(e.currentTarget.value)}
                  required/>
               </div>
               <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                     <span className="input-group-text" id="inputGroup-sizing-lg">Password</span>
                  </div>
                  <input 
                  type="password" 
                  className="form-control" 
                  aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" 
                  value={password}
                  onChange={e => setPassword(e.currentTarget.value)}
                  required/>
               </div>
            </div>

            {/* <!-- Buttons --> */}
            <div className="container">
               <div className="row">
                  <div className="col-md">
                     <button className="button-style btn btn-info btn-lg" data-toggle="tooltip" data-placement="bottom" title="Login!">
                     Login
                     </button>
                  </div>
                  <div className="col-md">
                     <a href="createAccount">Create Account</a>
                     <i className="fa fa-plus-circle" style={{paddingLeft: "5px"}} aria-hidden="true"></i>
                  </div>
                  <div className="col-md">
                     <a href="resetPassword">Forgot Password</a>
                     <i className="fa fa-unlock" style={{paddingLeft: "5px"}} aria-hidden="true"></i>
                  </div>
               </div>
            </div>
         </form>
      </div>
   );
}

export default Login;
