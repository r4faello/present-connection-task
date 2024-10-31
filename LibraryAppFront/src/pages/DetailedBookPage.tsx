import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const DetailedBookPage = () => {
  type BookDetails = {
    title: string;
    author: string;
    publishYear: string;
    description: string;
    coverImageUrl: string;
  };

  const { id } = useParams();
  const [type, setType] = useState("book");
  const [daysToReserve, setDaysToReserve] = useState("1");
  const [quickPickup, setQuickPickup] = useState(false);
  const [bookDetails, setBookDetails] = useState<BookDetails>({
    title: "",
    author: "",
    publishYear: "",
    description: "",
    coverImageUrl: "",
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`https://localhost:7188/books/${id}`);

        if (response.status === 200) {
          const { title, author, publishYear, description, coverImageUrl } =
            response.data;

          setBookDetails({
            title,
            author,
            publishYear,
            description,
            coverImageUrl,
          });
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleReservation = async () => {
    var jwtToken = Cookies.get("jwt");
    if (jwtToken == null) {
      window.location.href = "/login";
      return;
    }

    try {
      console.log("|" + daysToReserve + "|");
      if (daysToReserve == undefined || daysToReserve == "") {
        setDaysToReserve("1");
      }
      console.log("|" + daysToReserve + "|");

      const response = await axios.post(
        `https://localhost:7188/books/reserve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
            type: type,
            daysToReserve: daysToReserve == "" ? "1" : daysToReserve,
            quickPickup: quickPickup,
          },
        }
      );

      if (response.status === 200) {
        window.location.href = "/reservations";
      }
    } catch (error) {
      console.error(error);
      Cookies.remove("jwt");
      window.location.href = "/login";
    }
  };

  const ImageSection = ({ url }: { url: string }) => {
    return (
      <div className="w-[333px] h-[507px] rounded-[8px] overflow-hidden">
        <img className="h-full w-full" src={url} alt="" />
      </div>
    );
  };

  const TitleSection = ({ title }: { title: string }) => {
    return (
      <div className="w-full h-[219px] flex items-center">
        <h1 className="text-second font-bold text-[64px] leading-[60px]">
          {title}
        </h1>
      </div>
    );
  };

  const Property = ({ head, body }: { head: string; body: string }) => {
    return (
      <div className="flex">
        <div className="w-[244px]">
          <h1 className="font-bold">{head}</h1>
        </div>
        <div className="flex w-544px pl-[5px]">
          <p>{body}</p>
        </div>
      </div>
    );
  };

  const PropertySection = ({ bookDetails }: { bookDetails: BookDetails }) => {
    return (
      <div className=" w-full h-[370px] flex flex-col text-[21px] text-second ">
        <Property
          head="Originally published in"
          body={bookDetails.publishYear}
        />
        <Property head="Author" body={bookDetails.author} />
        <Property head="Description" body={bookDetails.description} />
      </div>
    );
  };

  const TypeSelectSection = () => {
    return (
      <div className="flex items-center mr-[15px]">
        <h1 className="mr-[5px]">Type</h1>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border border-second bg-third rounded-[8px] focus:outline-none focus:none focus:none-300 w-[110px] h-[50%]"
        >
          <option value="" disabled></option>
          <option value="book">Book</option>
          <option value="audioBook">Audiobook</option>
        </select>
      </div>
    );
  };

  const DaySelectSection = () => {
    return (
      <div className="flex items-center mr-[15px]">
        <h1 className="mr-[5px]">Days To Reserve</h1>
        <input
          type="text"
          className="h-[50%] border border-second bg-third rounded-[8px] w-[49px] pl-[4px] focus:outline-none"
          value={daysToReserve}
          onChange={(e) => setDaysToReserve(e.target.value)}
        />
      </div>
    );
  };

  const QuickPickupSelectSection = () => {
    return (
      <div className="flex items-center mr-[15px]">
        <h1 className="mr-[5px]">Quick Pick Up</h1>
        <div
          onClick={() => setQuickPickup(!quickPickup)}
          className={`${
            quickPickup ? "bg-inputFieldBorder" : "bg-third"
          } relative inline-flex items-center h-[20px] rounded-full w-[40px] cursor-pointer transition-colors duration-150 ease-in-out border border-second`}
        >
          <span
            className={`${
              quickPickup ? "translate-x-[20px]" : "translate-x-[0px]"
            } inline-block w-[18px] h-[18px] transform bg-second rounded-full transition-transform duration-300 ease-in-out`}
          ></span>
        </div>
      </div>
    );
  };

  const ReserveButtonSection = () => {
    return (
      <div className="flex items-center flex-grow h-full justify-end">
        <button
          className="bg-second text-white h-full w-[206px] rounded-[8px] font-bold"
          onClick={handleReservation}
        >
          Reserve
        </button>
      </div>
    );
  };

  const ReservationOptionSection = () => {
    return (
      <div className=" h-[36px] mt-[40px] flex items-center justify-start text-second text-[16px]">
        <TypeSelectSection />
        <DaySelectSection />
        <QuickPickupSelectSection />
        <ReserveButtonSection />
      </div>
    );
  };

  const InfoAndReservationSection = ({
    bookDetails,
  }: {
    bookDetails: BookDetails;
  }) => {
    return (
      <div className="h-full pt-[39px] pb-[39px] w-[812px] ml-[19px] flex flex-col">
        <TitleSection title={bookDetails.title} />
        <PropertySection bookDetails={bookDetails} />
        <ReservationOptionSection />
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-third w-[1274px] h-[744px] mb-[200px] rounded-[8px] shadow-custom pr-[55px] pl-[55px] flex items-center">
        <ImageSection url={bookDetails.coverImageUrl} />
        <InfoAndReservationSection bookDetails={bookDetails} />
      </div>
    </div>
  );
};

export default DetailedBookPage;
