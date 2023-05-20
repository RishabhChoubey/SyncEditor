import React from 'react'

function useEmail(email) {
   
        let re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        if (email && re.test(email)) {
          return true;
        } else {
          return false
        }
      
}

export default useEmail