import { Route, Routes } from "react-router-dom"
import Register from "./pages/register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/profile"
import SendTokens from "./pages/SendTokens"
import Transactions from "./pages/Transactions"
import Welcome from "./pages/Welcome"
import HelpSupport from "./pages/HelpSupport"
import ForgetPM from "./pages/ForgetPM"



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
          <Route path="profile" element={<Profile />} />
          <Route path="send" element={<SendTokens />} />
          <Route path="transactions" element={<Transactions />} />
            <Route path="help" element={<HelpSupport />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
