import React from "react";
import "./BookCard.css";
import { Link } from "react-router-dom";
import { ImageSection, InfoSection } from "./CardParts";

type BookCardProps = {
  id: string;
  title: string;
  year: number;
  author: string;
  coverImageUrl: string;
};

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  year,
  author,
  coverImageUrl,
}) => {
  return (
    <Link to={`/books/${id}`}>
      <div className="bg-third w-[379px] h-[218px] mb-[53px] p-[10px] rounded-[8px] shadow-custom flex items-center cursor-pointer">
        <ImageSection coverImageUrl={coverImageUrl} />
        <InfoSection title={title} year={year} author={author} />
      </div>
    </Link>
  );
};

export default BookCard;
