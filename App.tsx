import "./global.css";
import React, { useState } from "react";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return <HomePage onLogout={() => setIsLoggedIn(false)} />;
}
