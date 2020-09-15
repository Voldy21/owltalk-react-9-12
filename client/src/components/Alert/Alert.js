import React, { useContext } from 'react'
import {OwltalkContext} from '../../context/owltalkContext'


const Alert = () => {
   const owltalkContext = useContext(OwltalkContext)
   const {alert} = owltalkContext

   return (
      <>
      {
         alert.text.length > 0 && (
         <div className={`alert alert-${alert.type} text-center`}>
         {alert.text}
         </div>
      )}
      </>
      
   );
}

export default Alert;
