using LibraryApp.Models;

namespace LibraryApp.Services.AuthService
{
    public interface IAuthService
    {
        public string GenerateJwtToken(User user);
    }
}
