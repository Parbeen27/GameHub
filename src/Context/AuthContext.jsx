import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {api} from "../services/api"


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
 
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [dark, setDark] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if(!token){
            setUser(null)
            setLoading(false)
            return;
        }
        api.get("/api/user/me",{
            headers: { Authorization: `Bearer ${token}`},
            withCredentials: true
        }).then((res) => {
            setUser(res.data)
        })
        .catch(() => {
            setUser(null)
            localStorage.removeItem("accessToken")
        })
        .finally(() => {setLoading(false)})
 
    },[])

   
    if(loading) return <div><PageLoader/></div>

    return (
        <AuthContext.Provider value={{ user, setUser, dark,setDark}}>
            {children}
        </AuthContext.Provider>
    )
}
function PageLoader() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
export const useAuth = () => useContext(AuthContext)
