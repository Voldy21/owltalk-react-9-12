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

export default OwltalkReducer