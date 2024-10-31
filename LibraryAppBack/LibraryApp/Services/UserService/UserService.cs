using LibraryApp.Common;
using LibraryApp.Models;
using LibraryApp.Repositories.BookRepo;
using LibraryApp.Repositories.ReservationRepo;
using LibraryApp.Repositories.UserRepo;
using LibraryApp.Services.AuthService;
using LibraryApp.Services.BookService;
using LibraryApp.Services.PasswordService;

namespace LibraryApp.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IBookRepository _bookRepository;
        private readonly IReservationRepository _reservationRepository;
        private readonly IPasswordService _passwordService;
        private readonly IAuthService _authService;

        public UserService(IUserRepository userRepository, IPasswordService passwordService, IAuthService authService, IBookRepository bookRepository, IReservationRepository reservationRepository)
        {
            _userRepository = userRepository;
            _bookRepository = bookRepository;
            _reservationRepository = reservationRepository;
            _passwordService = passwordService;
            _authService = authService;
        }

        public async Task<Result> AddNewReservationAsync(string userId, string bookId, BookType type, int daysToReserve, bool quickPickup)
        {
            // Check if book is not already reserved
            var book = await _bookRepository.GetByIdAsync(bookId);
            if (book == null)
            {
                return Result.Failure("Book with specified id does not exist");
            }

            // Check if user exists
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                return Result.Failure("User with specified id does not exist");
            }


            var newReservation = new Reservation(Guid.NewGuid().ToString(), userId, book, type, daysToReserve, quickPickup);
            await _reservationRepository.AddNewReservationAsync(newReservation);
            return Result.Success();
        }

        public async Task<(Result, User?)> CreateUserAsync(string username, string password)
        {
            // Validate password strength
            if (!_passwordService.IsPasswordStrongEnough(password))
            {
                return (Result.Failure("Password is not strong enough. It should have upper, lower letters, numbers and special characters."), null);
            }

            // Check if username is free to use
            var existingUser = await _userRepository.GetByUsernameAsync(username);
            if (existingUser != null)
            {
                return (Result.Failure("User with specified username already exists"), null);
            }

            // Hashing password
            var (hashedPassword, salt) = _passwordService.HashPassword(password);


            var newUser = new User(Guid.NewGuid().ToString(), username, hashedPassword, salt);
            await _userRepository.AddAsync(newUser);
            return (Result.Success(), newUser);
        }

        public async Task<(Result, string)> GenerateJwtAsync(string username, string password)
        {
            // Getting user
            var user = await _userRepository.GetByUsernameAsync(username);
            if (user == null)
            {
                return (Result.Failure("User with specified username does not exist"), string.Empty);
            }

            // Checking if password is correct
            if (!IsPasswordCorrect(password, user.HashedPassword, user.Salt))
            {
                return (Result.Failure("Password is not correct"), string.Empty);
            }
            return (Result.Success(), _authService.GenerateJwtToken(user));
        }

        public async Task<(Result, List<Reservation>?)> GetAllReservationsAsync(string userId)
        {
            // Checking if user exists
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                return (Result.Failure("User with given id does not exist"), null);
            }

            var userReservations = await _reservationRepository.GetUserReservationsAsync(userId);
            return (Result.Success(), userReservations);
        }

        public bool IsPasswordCorrect(string password, string storedHashedPassword, string storedSalt)
        {
            var hashedInputPassword = _passwordService.HashPassword(password, storedSalt);
            return hashedInputPassword == storedHashedPassword;
        }
    }
}
