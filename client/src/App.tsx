import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import TopNav from "./components/Navbar";

import GetUsers from "./pages/ListUsers";
import GetCommands from "./pages/ListCommands";
import GetMessages from "./pages/ListMessages";
import GetStatus from "./pages/Status";
import GetTOS from "./pages/TermsOfUse";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();

  // TODO: why does this redirect us even when logged in on users, commands and messages
  return (
    <div className="App">
      <BrowserRouter>
        <TopNav />
        <div className="pages">
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/tos" element={<GetTOS />}></Route>
            <Route path="/status" element={<GetStatus />}></Route>
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/users"
              element={user ? <GetUsers /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/commands"
              element={user ? <GetCommands /> : <Navigate to="/login" />}
            ></Route>
            <Route
              path="/messages"
              element={user ? <GetMessages /> : <Navigate to="/login" />}
            ></Route>
            <Route path="*" element={<Home />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
