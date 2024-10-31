using AutoMapper;
using LibraryApp.DTOs;
using LibraryApp.Models;

namespace LibraryApp.MapperProfiles
{
    public class BookMapperProfile : Profile
    {
        public BookMapperProfile()
        {
            CreateMap<Book, BookDetailedView>();
            CreateMap<Book, BookListView>();
            CreateMap<Reservation, ReservationListView>();
        }

    }
}
