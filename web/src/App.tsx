// React modules
import { Route, BrowserRouter, Routes } from "react-router-dom";

// Pages
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import User from "./pages/User";
import Profile from "./pages/Profile";
import Lab from "./pages/Lab";
import Password from "./pages/Password";
import { NOTFOUND } from "dns";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/password" element={<Password/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/user" element={<User/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/lab" element={<Lab/>}></Route>
        <Route path="/*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
