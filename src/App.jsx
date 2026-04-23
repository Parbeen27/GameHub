import { ToastContainer } from "react-toastify"
import { AuthProvider } from "./Context/AuthContext"
import AppRoutes from "./routes/AppRoutes"
import { useEffect, useState } from "react";


function App() {
  // const [dark, setDark] = useState(false)
  // const toggle = () => {
  //   setDark(!dark)
  // }
  return (
    // <>
    // <button onClick={toggle}>Toggle</button>
    // <div className={dark ? "dark":""}>
    //   <div className="bg-primary dark:bg-primary-dark">app</div>
    // </div></>
    <AuthProvider>
      
      <ToastContainer/>
      <AppRoutes/>
    </AuthProvider>
  )
}

export default App