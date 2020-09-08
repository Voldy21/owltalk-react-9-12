import React, { useState, useContext } from 'react';
import Header from './sub-components/Login/Header'
import {OwltalkContext} from '../context/owltalkContext'

const CreateAccount = () => {
   const owltalkContext = useContext(OwltalkContext)
   const {createAccount, alert} = owltalkContext
   const [username, setUsername] = useState("")
   const [email, setEmail] = useState("")
   const [password1, setPassword1] = useState("")
   const [password2, setPassword2] = useState("")


   const onSubmit = async (e) => {
      e.preventDefault()
      if(password1 === password2){
            createAccount({
               name: username,
               email,
               password: password1
            })
      }
   }
      
   return (
      <>
         {
            alert !== null && alert.text.length > 0 && 
            <div className={`alert alert-${alert.type} text-center`}>
               {alert.text}
            </div>
         }
         <Header text="Create your OwlTalk Account"/>
         <form onSubmit={onSubmit}>
            <div className="container" style={{paddingTop: "50px"}}>
            <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                     <span className="input-group-text" id="inputGroup-sizing-lg">Email</span>
                  </div>
                  <input 
                     type="email" 
                     className="form-control" 
                     aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" 
                     value={email}
                     onChange={e => setEmail(e.currentTarget.value)}
                     required/>
               </div>
               <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                     <span className="input-group-text" id="inputGroup-sizing-lg">Username</span>
                  </div>
                  <input 
                     type="text" 
                     className="form-control" 
                     aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" 
                     value={username}
                     onChange={e => setUsername(e.currentTarget.value)}
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
                     value={password1}
                     onChange={e => setPassword1(e.currentTarget.value)}
                     required/>
               </div>
               <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                     <span className="input-group-text" id="inputGroup-sizing-lg">Confirm Password</span>
                  </div>
                  <input 
                     type="password" 
                     className="form-control" 
                     aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" 
                     value={password2}
                     onChange={e => setPassword2(e.currentTarget.value)}
                     required/>
               </div>
            </div>

            {/* <!-- Buttons --> */}
            <div className="container" style={{textAlign: "center"}}>
               <div className="row">
                  <div className="col-md">
                     <button className="button-style btn btn-info btn-lg" data-toggle="tooltip" data-placement="bottom" title="Login!">
                        Sign up
                     </button>
                  </div>
                  <div className="col-md">
                     <button className="button-style btn btn-info btn-lg" data-toggle="tooltip" data-placement="bottom" title="Login!">
                     <a href="login">Login</a>
                     </button>
                  </div>
               </div>
                  
            </div>
         </form>
		
		   
      </>
   )
}

export default CreateAccount;
