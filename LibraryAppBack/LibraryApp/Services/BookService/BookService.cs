using LibraryApp.Models;
using LibraryApp.Repositories.BookRepo;

namespace LibraryApp.Services.BookService
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;
        public BookService(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<List<Book>> SearchForBooksAsync(string title, string type, string year)
        {
            int yearNum = year.ToLower() == "any" ? 0 : int.Parse(year);
            var books = await _bookRepository.GetFilteredBooksAsync(title, type, yearNum);
            return books;
        }
    }
}
