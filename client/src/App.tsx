import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import TopNav from "./components/Navbar";

import GetUsers from "./pages/ListUsers";
import GetCommands from "./pages/ListCommands";
import GetMessages from "./pages/ListMessages";
import GetStatus from "./pages/Status";
import GetTOS from "./pages/TermsOfUse";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";

import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

// TODO: add admin interface
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TopNav />
        <Routes>
          <Route element={<PersistLogin />}>
            <Route index element={<Home />}></Route>
            <Route path="/tos" element={<GetTOS />}></Route>
            <Route path="/status" element={<GetStatus />}></Route>

            <Route path="/login" element={<LoginPage />}></Route>

            <Route element={<RequireAuth />}>
              <Route path="/users" element={<GetUsers />}></Route>
              <Route path="/commands" element={<GetCommands />}></Route>
              <Route path="/messages" element={<GetMessages />}></Route>
            </Route>

            <Route path="*" element={<Home />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
