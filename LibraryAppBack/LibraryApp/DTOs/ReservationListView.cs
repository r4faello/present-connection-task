using LibraryApp.Common;

namespace LibraryApp.DTOs
{
    public class ReservationListView
    {
        public string Id { get; set; }
        public BookListView ReservedBook { get; set; }
        public BookType TypeOfBook { get; set; }
        public int DaysToReserve { get; set; }
        public bool QuickPickUp { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
