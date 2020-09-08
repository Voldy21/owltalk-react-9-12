import React, {createContext, useReducer} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'


export const OwltalkContext = createContext()

const OwltalkReducer = (state, action) => {
   switch (action.type) {
      case "CREATE_ACCOUNT":
         return {
            ...state,
            isLoggedIn: true,
            loading: false
         }
      case "LOGIN":
         return {
            ...state,
            isLoggedIn: true,
            loading: false
         }
      case "SET_ALERT":
         return {
            ...state,
            alert: {
               type: action.payload.type, 
               text: action.payload.text
            }
         }
      case "REMOVE_ALERT":
         return {
            ...state,
            alert: {
               type: "",
               text: ""
            }
         }
      case "LOGOUT" : 
         return {
            ...state,
            isLoggedIn: false
         }
      default: 
         return state
   }
}

export const OwltalkState = props => {
   const cookies = new Cookies()
   
   let initialState = {
      user: {},
      users: [],
      alert: {type: "", text: ""},
      loading: false,
      isLoggedIn: false,
   }
   if(cookies.get("token")){
      initialState.isLoggedIn = true
   }

   const [state, dispatch] = useReducer(OwltalkReducer, initialState)
   
   //Create Account
   const createAccount = async (data) => {
      let {email, name, password} = data
      
      axios.post("api/users", {
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
         dispatch({
            type: "SET_ALERT",
            payload: {text: "Account Created!", type: "success"}
         })

         setTimeout(() => {
            dispatch({
               type: "REMOVE_ALERT",
            })
         }, 3000);
      }).catch(() => {
         dispatch({
         type: "SET_ALERT",
         payload: {text: "Could not create account", type: "danger"}
      })
   })
   }
   //Login
   const login = async (data) => {
      let {email, password} = data
      
      axios.post("api/auth", {
         email,
         password
      }).then(res => {
         cookies.set('token', res.data.token, { 
            path: '/',
            maxAge: 3600
         })
   
         dispatch({
            type: "LOGIN"
         })
         dispatch({
            type: "SET_ALERT",
            payload: {text: "Logged in!", type: "success"}
         })

         setTimeout(() => {
            dispatch({
               type: "REMOVE_ALERT",
            })
         }, 3000);

      }).catch(() => {
         dispatch({
         type: "SET_ALERT",
         payload: {text: "Could not log in", type: "danger"}
      })
   })
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
            createAccount,
            login,
            logout
         }}
         >
            {props.children}
      </OwltalkContext.Provider>
   )  
}