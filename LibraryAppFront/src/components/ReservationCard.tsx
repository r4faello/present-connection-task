import { ImageSection, InfoSection } from "./CardParts";

const ReservationCard = ({
  title,
  year,
  author,
  coverImageUrl,
  typeOfBook,
  daysToReserve,
  quickPickUp,
  price,
}: {
  id: string;
  title: string;
  year: number;
  author: string;
  coverImageUrl: string;
  typeOfBook: string;
  daysToReserve: number;
  quickPickUp: boolean;
  price: number;
}) => {
  const Separator = () => {
    return <div className="w-px h-full bg-black"></div>;
  };

  const ReservationProperty = ({
    head,
    body,
  }: {
    head: string;
    body: string;
  }) => {
    return (
      <div className="w-full h-[33%]">
        <div>
          <h1 className="font-bold text-[16px]">{head}</h1>
        </div>
        <div>
          <p>{body}</p>
        </div>
      </div>
    );
  };

  const ReservationPropertySection = ({
    typeOfBook,
    daysToReserve,
    quickPickUp,
  }: {
    typeOfBook: string;
    daysToReserve: number;
    quickPickUp: boolean;
  }) => {
    return (
      <div className="h-[80%] flex-grow p-[10px]">
        <div className="h-full w-full flex">
          <div className="w-full">
            <ReservationProperty head="Type of a book" body={typeOfBook} />
            <ReservationProperty
              head="Days to reserve"
              body={daysToReserve.toString()}
            />
            <ReservationProperty
              head="Quick pick up"
              body={quickPickUp ? "Yes" : "No"}
            />
          </div>
        </div>
      </div>
    );
  };

  const PriceSection = ({ price }: { price: number }) => {
    return (
      <div className="h-[20%] flex-grow flex items-center pl-[10px] text-[20px]">
        <h1>Price:</h1>
        <h1 className="ml-[5px] font-bold">{price} €</h1>
      </div>
    );
  };

  const ReservationDetailSection = ({
    typeOfBook,
    daysToReserve,
    quickPickUp,
    price,
  }: {
    typeOfBook: string;
    daysToReserve: number;
    quickPickUp: boolean;
    price: number;
  }) => {
    return (
      <div className="flex h-full flex-col flex-grow">
        <ReservationPropertySection
          typeOfBook={typeOfBook}
          daysToReserve={daysToReserve}
          quickPickUp={quickPickUp}
        />
        <PriceSection price={price} />
      </div>
    );
  };

  return (
    <div className="bg-third w-[540px] h-[218px] mb-[53px] p-[10px] rounded-[8px] shadow-custom flex items-center text-second">
      <ImageSection coverImageUrl={coverImageUrl} />
      <InfoSection title={title} year={year} author={author} />
      <Separator />
      <ReservationDetailSection
        typeOfBook={typeOfBook}
        daysToReserve={daysToReserve}
        quickPickUp={quickPickUp}
        price={price}
      />
    </div>
  );
};

export default ReservationCard;
