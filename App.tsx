import "./global.css";
import React, { useState } from "react";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import BookPage from "./pages/book";
import { Book } from "./types/book";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  if (selectedBook) {
    return <BookPage book={selectedBook} onBack={() => setSelectedBook(null)} />;
  }

  return (
    <HomePage
      onOpenBook={(book) => setSelectedBook(book)}
      onLogout={() => setIsLoggedIn(false)}
    />
  );
}
