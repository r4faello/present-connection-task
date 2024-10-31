using LibraryApp.Models;
using LibraryApp.Repositories.BookRepo;
using Microsoft.EntityFrameworkCore;

namespace LibraryApp.Repositories.BookRepo
{
    public class BookRepository : IBookRepository
    {
        private readonly ApplicationDbContext _context;
        public BookRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void GenerateMockBooks()
        {
            List<Book> newBooks = new List<Book>
                {
                    new Book
                    {
                        Id = Guid.NewGuid().ToString(),
                        Title = "Countdown To Zero Day",
                        Author = "Kim Zetter",
                        PublishYear = 2014,
                        Description = "Good book shakar makar bla bla bla ",
                        CoverImageUrl = "https://i.imgur.com/T82RkDd.jpeg",
                        Type = "Scientific"
                    },
                    new Book
                    {
                        Id = Guid.NewGuid().ToString(),
                        Title = "Innovation In Real Places",
                        Author = "Dan Breznitz",
                        PublishYear = 2012,
                        Description = "Extremely good book bla bla shakar makar ",
                        CoverImageUrl = "https://i.imgur.com/3Z0wXHo.jpeg",
                        Type = "Scientific"
                    },
                    new Book
                    {
                        Id = Guid.NewGuid().ToString(),
                        Title = "Your Face Belongs To Us",
                        Author = "Kashmir Hill",
                        PublishYear = 2015,
                        Description = "Good book shakar makar bla bla bla ",
                        CoverImageUrl = "https://i.imgur.com/3aQFGpj.jpeg",
                        Type = "Scientific"
                    },
                    new Book
                    {
                        Id = Guid.NewGuid().ToString(),
                        Title = "The Code",
                        Author = "Kim Zetter",
                        PublishYear = 2014,
                        Description = "Good book shakar makar bla bla bla ",
                        CoverImageUrl = "https://i.imgur.com/VOWNfPt.jpeg",
                        Type = "Scientific"
                    },
                    new Book
                    {
                        Id = Guid.NewGuid().ToString(),
                        Title = "The Innovators",
                        Author = "Walter Isaacson",
                        PublishYear = 2014,
                        Description = "Inspiring ideas, lalallalalla bla bla bla",
                        CoverImageUrl = "https://i.imgur.com/C2Aa2Vt.jpeg",
                        Type = "Scientific"
                    },
                    new Book
                    {
                        Id = Guid.NewGuid().ToString(),
                        Title = "Bad Blood",
                        Author = "Kim Zetter",
                        PublishYear = 2011,
                        Description = "Good book shakar makar bla bla bla ",
                        CoverImageUrl = "https://i.imgur.com/l9bhWPF.jpeg",
                        Type = "Scientific"
                    },
                    new Book
                    {
                        Id = Guid.NewGuid().ToString(),
                        Title = "The Assassin's Blade",
                        Author = "Sarah J. Maas",
                        PublishYear = 2014,
                        Description = "When Celaena's scheming master, Arobynn Hamel, dispatches her on missions that take her from remote islands to hostile deserts, she finds herself acting independently of his wishes—and questioning her own allegiance. Along the way, she makes friends and enemies alike, and discovers that she feels far more for Sam than just friendship. But by defying Arobynn’s orders, Celaena risks unimaginable punishment, and with Sam by her side, he is in danger, too. They will have to risk it all if they hope to escape Arobynn’s clutches—and if they fail, they’ll lose not just a chance at freedom, but their lives",
                        CoverImageUrl = "https://i.imgur.com/GdmobEk.jpeg",
                        Type = "Action"
                    },
                    new Book
                    {
                        Id = Guid.NewGuid().ToString(),
                        Title = "Six of Crows",
                        Author = "Leigh Bardugo",
                        PublishYear = 2015,
                        Description = "Six dangerous outcasts. One impossible heist. Kaz’s crew is the only thing that might stand between the world and destruction—if they don’t kill each other first.",
                        CoverImageUrl = "https://i.imgur.com/ITsrwbp.jpeg",
                        Type = "Action"
                    },
                    new Book
                    {
                        Id = Guid.NewGuid().ToString(),
                        Title = "Karlsson on the Roof",
                        Author = "Astrid Lindgren",
                        PublishYear = 1955,
                        Description = "Imagine Smidge's delight when, one day, a little man with a propeller on his back appears hovering at the window! It's Karlsson and he lives in a house on the roof. Soon Smidge and Karlsson are sharing all sorts of adventures, from tackling thieves and playing tricks to looping the loop and running across the rooftops. Fun and chaos burst from these charming, classic stories.",
                        CoverImageUrl = "https://i.imgur.com/Dy5FhTk.png",
                        Type = "Fiction"
                    },
                    new Book
                    {
                        Id = Guid.NewGuid().ToString(),
                        Title = "An Ember in the Ashes",
                        Author = "Sabaa Tahir",
                        PublishYear = 2015,
                        Description = "An Ember in the Ashes is a young adult fantasy romance novel written by American author Sabaa Tahir. It was published on April 28, 2015 by Razorbill, an imprint of Penguin Random House. It is the first book in the An Ember in the Ashes series, followed by A Torch Against the Night. In a fantasy world inspired by Ancient Rome, the story follows a girl named Laia spying for rebels against the reigning empire in exchange for their help in rescuing her captive brother; and a boy named Elias struggling to free himself from being an enforcer of a tyrannical regime. The novel is narrated in the first-person, alternating between the points of view of Laia and Elias.",
                        CoverImageUrl = "https://i.imgur.com/1EkGTle.jpeg",
                        Type = "Action"
                    }
            };

            _context.Books.AddRange(newBooks);
            _context.SaveChanges();
        }

        public async Task<Book?> GetByIdAsync(string id)
        {
            var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == id);
            return book;
        }

        public async Task<List<Book>> GetAllAsync()
        {
            var books = await _context.Books.ToListAsync();
            return books;
        }

        public async Task<List<Book>> GetFilteredBooksAsync(string title, string type, int year)
        {
            List<Book> books = await _context.Books.ToListAsync();

            if (title != "")
            {
                books = books.Where(b => b.Title.ToLower().Contains(title.ToLower())).ToList();
            }

            if(type.ToLower() != "any")
            {
                books = books.Where(b => b.Type.ToLower() == type).ToList();
            }

            if(year != 0)
            {
                books = books.Where(b => b.PublishYear == year).ToList();
            }

            return books;
        }
    }
}
