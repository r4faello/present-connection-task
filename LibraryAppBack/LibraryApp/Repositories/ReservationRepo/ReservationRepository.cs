using LibraryApp.Common;
using LibraryApp.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryApp.Repositories.ReservationRepo
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly ApplicationDbContext _context;
        public ReservationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Result> AddNewReservationAsync(Reservation reservation)
        {
            bool isAlreadyReserved = await IsAlreadyReservedAsync(reservation);

            if (isAlreadyReserved)
            {
                return Result.Failure("Book is already reserved");
            }

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return Result.Success();
        }

        public async Task<List<Reservation>> GetUserReservationsAsync(string userId)
        {
            var userReservations = await _context.Reservations
                .Include(r => r.ReservedBook)
                .Where(r => r.OwnerId == userId)
                .ToListAsync();

            return userReservations;
        }

        public async Task<bool> IsAlreadyReservedAsync(Reservation reservation)
        {
            var userReservations = await GetUserReservationsAsync(reservation.OwnerId);

            foreach (var res in userReservations)
            {
                if (res.ReservedBook.Id == reservation.ReservedBook.Id)
                {
                    return true;
                }
            }

            return false;
        }
    }
}
