using LibraryApp.Common;

namespace LibraryApp.Models
{
    public class Reservation
    {
        public string Id { get; set; }
        public string OwnerId { get; set; }
        public Book ReservedBook { get; set; }
        public BookType TypeOfBook { get; set; }
        public int DaysToReserve { get; set; }
        public bool QuickPickUp { get; set; }

        public decimal TotalPrice {
            get
            {
                decimal totalSum = 0;

                if(TypeOfBook == BookType.Book)
                {
                    totalSum += Constants.BookDayPrice * DaysToReserve;
                }
                else
                {
                    totalSum += Constants.AudiobookDayPrice * DaysToReserve;
                }


                // Discount
                if(DaysToReserve > Constants.SecondLevelDayLimit)
                {
                    totalSum = ((100 - Constants.SecondLevelDiscountPercentage) / (decimal)100) * totalSum;
                }
                else if(DaysToReserve > Constants.FirstLevelDayLimit)
                {
                    totalSum = ((100 - Constants.FirstLevelDiscountPercentage) / (decimal)100) * totalSum;
                }

                if (QuickPickUp)
                {
                    totalSum += Constants.QuickPickUpPrice;
                }

                totalSum += Constants.ServiceFee;

                return totalSum;
            }
        }

        public Reservation(string id, string ownerId, Book reservedBook, BookType typeOfBook, int daysToReserve, bool quickPickUp)
        {
            Id = id;
            OwnerId = ownerId;
            ReservedBook = reservedBook;
            TypeOfBook = typeOfBook;
            DaysToReserve = daysToReserve;
            QuickPickUp = quickPickUp;
        }

        public Reservation()
        {
        }
    }
}
