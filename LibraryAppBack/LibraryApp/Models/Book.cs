namespace LibraryApp.Models
{
    public class Book
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int PublishYear { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string CoverImageUrl { get; set; }
    }
}
