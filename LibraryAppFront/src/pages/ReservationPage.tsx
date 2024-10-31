import { useEffect, useState } from "react";

import ReservationCard from "../components/ReservationCard";
import axios from "axios";
import Cookies from "js-cookie";

type Book = {
  id: string;
  title: string;
  publishYear: number;
  author: string;
  coverImageUrl: string;
};

type Reservation = {
  id: string;
  reservedBook: Book;
  typeOfBook: number;
  daysToReserve: number;
  quickPickUp: boolean;
  totalPrice: number;
};

const ReservationPage = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setReservations([]);

        var jwtToken = Cookies.get("jwt");
        if (jwtToken == null) {
          window.location.href = "/login";
          return;
        }

        const response = await axios.get(
          `https://localhost:7188/books/reservations`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (response.status === 200) {
          setReservations(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch books:", error);
        Cookies.remove("jwt");
        window.location.href = "/login";
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="ml-[82px] mr-[82px]">
      <div className="w-full h-[64px]  flex items-center">
        <h1 className="text-[64px] font-bold text-second mb-[31px]">
          Your reservations
        </h1>
      </div>
      {reservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          id={reservation.id}
          title={reservation.reservedBook.title}
          year={reservation.reservedBook.publishYear}
          author={reservation.reservedBook.author}
          coverImageUrl={reservation.reservedBook.coverImageUrl}
          typeOfBook={reservation.typeOfBook === 0 ? "Book" : "Audiobook"}
          daysToReserve={reservation.daysToReserve}
          quickPickUp={reservation.quickPickUp}
          price={reservation.totalPrice}
        />
      ))}
    </div>
  );
};

export default ReservationPage;
