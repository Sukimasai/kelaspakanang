import "./global.css";
import React, { useState } from "react";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import BookPage from "./pages/book";
import BorrowPage from "./pages/borrow";
import { Book } from "./types/book";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isBorrowing, setIsBorrowing] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  if (selectedBook && isBorrowing) {
    return (
      <BorrowPage book={selectedBook} onBack={() => setIsBorrowing(false)} />
    );
  }

  if (selectedBook) {
    return (
      <BookPage
        book={selectedBook}
        onBack={() => setSelectedBook(null)}
        onBorrow={() => setIsBorrowing(true)}
      />
    );
  }

  return (
    <HomePage
      onOpenBook={(book) => setSelectedBook(book)}
      onLogout={() => setIsLoggedIn(false)}
    />
  );
}
