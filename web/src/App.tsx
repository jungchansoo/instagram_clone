// React modules
import { Route, BrowserRouter, Routes } from "react-router-dom";

//Components
import Header from "./components/header/Header";

// Pages
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";
import Lab from "./pages/Lab";
import Password from "./pages/Password";
import { NOTFOUND } from "dns";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/password" element={<Password/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/setting" element={<Setting/>}></Route>
        <Route path="/:username" element={<Profile/>}></Route>
        <Route path="/lab" element={<Lab/>}></Route>
        <Route path="/*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
