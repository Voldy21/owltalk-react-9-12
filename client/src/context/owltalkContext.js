import React, {createContext, useReducer} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import OwltalkReducer from './owltalkReducer'

export const OwltalkContext = createContext()

export const OwltalkState = props => {
   const cookies = new Cookies()
   
   let initialState = {
      user: {},
      users: [],
      posts: [],
      id: "",
      alert: {type: "", text: ""},
      loading: false,
      isLoggedIn: false,
   }

   if(cookies.get("token")){
      initialState.isLoggedIn = true
   }


   const [state, dispatch] = useReducer(OwltalkReducer, initialState)

   //Alert handler
   const setAlert = (text, type) => {
      dispatch({
         type: "SET_ALERT",
         payload: {text, type}
      }
   )
   setTimeout(() => {
      dispatch({
         type: "REMOVE_ALERT",
      })
   }, 3000)}

   //Create Account
   const createAccount = async (data) => {
      let {email, name, password} = data
      
      axios.post("http://localhost:5000/api/users", {
         email,
         name,
         password
      }).then(res => {
         cookies.set('token', res.data.token, { 
            path: '/',
            maxAge: 3600
         })
         dispatch({
            type: "CREATE_ACCOUNT"
         })
         setAlert("Account Created!", "success")
      }).catch(() => setAlert("Could not create account", "danger"))
   }
   //Login
   const login = async (data) => {
      let {email, password} = data
      
      axios.post("http://localhost:5000/api/auth", {
         email,
         password
      }).then(res => {
         cookies.set('token', res.data.token, { 
            path: '/',
            maxAge: 360000
         })
         dispatch({
            type: "LOGIN"
         })
         setAlert("Logged in!", "success")
      }).catch(() => setAlert("Could not log in", "danger"))
   }

   //Logout
   const logout = () => {
      cookies.remove('token')
      dispatch({type: "LOGOUT"})
   }

   

   return (
      <OwltalkContext.Provider
         value={{
            isLoggedIn: state.isLoggedIn,
            loading: state.loading,
            posts: state.posts,
            alert: state.alert,
            test: state.test,
            id: state.id,
            createAccount,
            login,
            logout,
            setAlert
         }}
         >
            {props.children}
      </OwltalkContext.Provider>
   )  
}