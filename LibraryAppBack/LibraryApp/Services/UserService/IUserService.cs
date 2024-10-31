using LibraryApp.Common;
using LibraryApp.Models;

namespace LibraryApp.Services.UserService
{
    public interface IUserService
    {
        public Task<(Result, User?)> CreateUserAsync(string username, string password);
        public Task<(Result, string)> GenerateJwtAsync(string username, string password);
        public Task<Result> AddNewReservationAsync(string userId, string bookId, BookType type, int daysToReserve, bool quickPickup);
        public Task<(Result, List<Reservation>?)> GetAllReservationsAsync(string userId);
        bool IsPasswordCorrect(string password, string storedHashedPassword, string storedSalt);
    }
}
