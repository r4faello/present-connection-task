namespace LibraryApp.DTOs
{
    public class BookListView
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public int PublishYear { get; set; }
        public string Author { get; set; }
        public string CoverImageUrl { get; set; }
    }
}
