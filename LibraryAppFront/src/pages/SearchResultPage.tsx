import { useLocation } from "react-router-dom";
import BookCard from "../components/BookCard";

type Book = {
  id: string;
  title: string;
  publishYear: number;
  author: string;
  coverImageUrl: string;
};

const SearchResultPage = () => {
  const location = useLocation();
  const searchResults = (location.state?.results || []) as Book[];

  return (
    <>
      <h1 className="text-[32px] font-bold text-second mb-[100px] ml-[100px]">
        Search results
      </h1>
      <div
        className="grid grid-cols-[auto-fit] place-items-center pl-[83px] pr-[83px]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))" }}
      >
        {searchResults.map((book) => (
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
    </>
  );
};

export default SearchResultPage;
