import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedPage from "./components/ProtectedPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProjectInfo from "./pages/ProjectInfo";

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedPage>
              <Home />
            </ProtectedPage>
          }></Route>
          <Route
            path="/project/:id"
            element={
              <ProtectedPage>
                <ProjectInfo />
              </ProtectedPage>
            }
          />
          <Route path="/profile" element={
            <ProtectedPage>
              <Profile />
            </ProtectedPage>
          }></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes></BrowserRouter>
    </div>
  );
}

export default App;
