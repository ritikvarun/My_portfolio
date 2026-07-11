import React, { createContext } from 'react'

export const authDataContext = createContext()
function AuthContext({children}) {
    let serverUrl = import.meta.env.VITE_API_URL || "https://my-portfolio-kn46.onrender.com"
    let frontendUrl = import.meta.env.VITE_FRONTEND_URL || "http://localhost:3000"

    let value = {
      serverUrl,
      frontendUrl
    }
  return (
    <div>
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
      
    </div>
  )
}

export default AuthContext
