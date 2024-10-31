using LibraryApp.Common;
using LibraryApp.Models;
using Microsoft.AspNetCore.SignalR;

namespace LibraryApp.Repositories.UserRepo
{
    public interface IUserRepository
    {
        public Task<User?> GetByIdAsync(string id);
        public Task<User?> GetByUsernameAsync(string username);

        public Task AddAsync(User user);
    }
}
