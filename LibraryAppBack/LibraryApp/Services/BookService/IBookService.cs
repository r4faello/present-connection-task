using LibraryApp.Models;

namespace LibraryApp.Services.BookService
{
    public interface IBookService
    {
        public Task<List<Book>> SearchForBooksAsync(string query, string type, string year);
    }
}
