namespace LibraryApp.Models
{
    public class User
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string HashedPassword { get; set; }
        public string Salt { get; set; }
        public List<Book> ReservatedBooks { get; set; }

        public User()
        {
            Id = Guid.NewGuid().ToString();
            Username = "";
            HashedPassword = "";
            Salt = "";
            ReservatedBooks = new List<Book>();
        }
        
        public User(string id, string username, string password, string salt)
        {
            Id = id;
            Username = username;
            HashedPassword = password;
            Salt = salt;
            ReservatedBooks = new List<Book>();
        }
    }
}
