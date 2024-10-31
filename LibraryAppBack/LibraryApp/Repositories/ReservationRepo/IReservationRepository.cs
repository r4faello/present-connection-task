using LibraryApp.Common;
using LibraryApp.Models;

namespace LibraryApp.Repositories.ReservationRepo
{
    public interface IReservationRepository
    {
        public Task<List<Reservation>> GetUserReservationsAsync(string userId);
        public Task<Result> AddNewReservationAsync(Reservation reservation);
        public Task<bool> IsAlreadyReservedAsync(Reservation reservation);
    }
}
