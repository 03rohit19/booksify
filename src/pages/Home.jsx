import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import CardPage from "../components/Card";

const HomePage = () => {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    firebase.listAllBooks().then((books) => setBooks(books.docs));
  });
  return (
    <>
      <div className=" container">
        {books.map((book) => (
          <CardPage key={book.id} {...book.data()} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
