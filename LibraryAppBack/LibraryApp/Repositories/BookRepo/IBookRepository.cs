using LibraryApp.Models;

namespace LibraryApp.Repositories.BookRepo
{
    public interface IBookRepository
    {
        public Task<List<Book>> GetAllAsync();
        public Task<Book?> GetByIdAsync(string id);
        public Task<List<Book>> GetFilteredBooksAsync(string title, string type, int year);
        void GenerateMockBooks();
    }
}
