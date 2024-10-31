import BookCard from "../components/BookCard";
import axios from "axios";
import { useState, useEffect } from "react";

type Book = {
  id: string;
  title: string;
  publishYear: number;
  author: string;
  coverImageUrl: string;
};

const HomePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setBooks([]);
        const response = await axios.get("https://localhost:7188/books");

        console.log(response.data);

        if (response.status === 200) {
          setBooks(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const GridOfBooks = ({ books }: { books: Book[] }) => {
    return (
      <div
        className="grid grid-cols-[auto-fit] place-items-center pl-[83px] pr-[83px]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))" }}
      >
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            year={book.publishYear}
            author={book.author}
            coverImageUrl={book.coverImageUrl}
          />
        ))}
      </div>
    );
  };

  return <GridOfBooks books={books} />;
};

export default HomePage;
