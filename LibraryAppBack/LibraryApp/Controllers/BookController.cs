using AutoMapper;
using LibraryApp.Common;
using LibraryApp.DTOs;
using LibraryApp.Repositories.BookRepo;
using LibraryApp.Repositories.UserRepo;
using LibraryApp.Services.BookService;
using LibraryApp.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace LibraryApp.Controllers
{
    [ApiController]
    [Route("books")]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IBookService _bookService;

        public BookController(IBookRepository bookRepository, IMapper mapper, IUserService userService, IBookService bookService)
        {
            _bookRepository = bookRepository;
            _mapper = mapper;
            _userService = userService;
            _bookService = bookService;
        }

        [HttpGet("", Name = "GetBookList")]
        public async Task<IEnumerable<BookListView>> GetBookList()
        {
            var allBooks = await _bookRepository.GetAllAsync();
            var bookList = _mapper.Map<IEnumerable<BookListView>>(allBooks);

            return bookList;
        }

        [HttpGet("{id}", Name = "GetBook")]
        public async Task<ActionResult<BookDetailedView>> GetBook(string id)
        {
            var requiredBook = await _bookRepository.GetByIdAsync(id);
            if(requiredBook == null)
            {
                return NotFound();
            }

            return _mapper.Map<BookDetailedView>(requiredBook);
        }

        [HttpPost("reserve/{id}", Name = "ReserveBook")]
        [Authorize]
        public async Task<ActionResult> ReserveBook(string id,
                    [FromQuery] string type,
                    [FromQuery] int daysToReserve,
                    [FromQuery] bool quickPickup)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("Authentication credentials were not found");
            }

            BookType bType = type.ToLower() == "audiobook" ? BookType.Audiobook : BookType.Book;


            var result = await _userService.AddNewReservationAsync(userId, id, bType, daysToReserve, quickPickup);
            if (!result.IsSuccess)
            {
                return BadRequest(result.Message);
            }
            return Ok();
        }

        [HttpGet("reservations", Name = "GetReservatedBooks")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<BookListView>>> GetReservatedBooks()
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized("Authentication credentials were not found");
            }

            if (IsTokenExpired())
            {
                return Unauthorized("Token has expired. Please reauthenticate.");
            }

            var (result, reservedUserBooks) = await _userService.GetAllReservationsAsync(userId);
            if (!result.IsSuccess)
            {
                return BadRequest(result.Message);
            }

            var sanitizedBookList = _mapper.Map<IEnumerable<ReservationListView>>(reservedUserBooks);

            return Ok(sanitizedBookList);
        }


        [HttpGet("search", Name = "GetSearchResults")]
        public async Task<IEnumerable<BookListView>> GetSearchResults(
                    [FromQuery] string? search = null,
                    [FromQuery] string? type = null,
                    [FromQuery] string? year = null)
        {
            if(search is null)
            {
                search = "";
            }

            if (type is null)
            {
                type = "any";
            }

            if (year is null)
            {
                year = "any";
            }

            var requiredBooks = await _bookService.SearchForBooksAsync(search, type, year);
            var sanitizedBookList = _mapper.Map<IEnumerable<BookListView>>(requiredBooks);
            return sanitizedBookList;
        }


        private bool IsTokenExpired()
        {
            var expirationClaim = HttpContext.User.FindFirstValue("exp");
            if (expirationClaim == null)
            {
                return true;
            }

            var expirationTime = DateTimeOffset.FromUnixTimeSeconds(long.Parse(expirationClaim));
            var currentTime = DateTimeOffset.UtcNow;

            if (expirationTime <= currentTime)
            {
                return true;
            }

            return false;
        }

    }
}
