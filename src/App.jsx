import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import SendTokens from "./pages/SendTokens"
import Transactions from "./pages/Transactions"
import Welcome from "./pages/Welcome"
import HelpSupport from "./pages/HelpSupport"
import ForgetPM from "./pages/ForgetPM"
import Prrofile from "./pages/Prrofile"



function App() {


  return (
    <>
      <Routes>
         <Route path="/" element={<Register/>}/>
         <Route path="/login" element={<Login/>} />
         <Route path="/check-mail" element={<ForgetPM/>}/>
         <Route path="/home/:id" element={<Home />}>
         <Route index element={<Welcome />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Prrofile />} />
          <Route path="send" element={<SendTokens />} />
          <Route path="transactions" element={<Transactions />} />
            <Route path="help" element={<HelpSupport />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
