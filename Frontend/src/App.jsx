import React from "react";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import SignIn from "./pages/signIn";
import SignUp from "./pages/SignUp";
export const serverURL = "http://localhost:5000";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
