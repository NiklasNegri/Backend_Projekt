using AutoMapper;
using WebApi.Entities;
using WebApi.Models.Bookings;
using WebApi.Models.Rooms;
using WebApi.Models.Users;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            //registeruser -> user
            CreateMap<RegisterUser, User>();

            //updateuser -> user
            CreateMap<UpdateUser, User>();

            //registeroom -> room
            CreateMap<RegisterRoom, Room>();

            // registerbooking -> booking
            CreateMap<RegisterBooking, Booking>();

            // User -> AuthenticateResponse
            CreateMap<User, AuthenticateResponse>();
        }
    }
}
