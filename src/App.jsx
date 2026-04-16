/*------------------------------------------------------------*/
//                    app principal
/*------------------------------------------------------------*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ArbolProvider } from "./context/ArbolContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./styles/main.scss";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ArbolProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ArbolProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;