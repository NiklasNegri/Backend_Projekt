using AutoMapper;
using WebApi.Authorization;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models.Bookings;
using WebApi.Models.Users;

namespace WebApi.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        void RegisterUser(RegisterUser model);
        IEnumerable<User> GetUsers();
        User GetById(int id);
        void UpdateUser(UpdateUser model, int authenticatedUserId);
        void DeleteUser(int id);
    }

    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IJwtUtils _jwtUtils;
        private readonly IMapper _mapper;

        public UserService(
            DataContext context,
            IJwtUtils jwtUtils,
            IMapper mapper)
        {
            _context = context;
            _jwtUtils = jwtUtils;
            _mapper = mapper;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _context.Users.SingleOrDefault(x => x.Email == model.Email);
            if (user == null)
                throw new KeyNotFoundException($"{model.Email} is not registered to any account!");

            if (!BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
                throw new KeyNotFoundException("Wrong password entered!");

            // authentication successful so generate jwt token
            var response = _mapper.Map<AuthenticateResponse>(user);
            response.Token = _jwtUtils.GenerateToken(user);
            return response;
        }

        public void RegisterUser(RegisterUser model)
        {
            var emailCheck = _context.Users.Any(x => x.Email == model.Email);
            if (emailCheck)
                throw new AppException("Email is already in use!");

            var phoneCheck = _context.Users.Any(x => x.Phone == model.Phone);
            if (phoneCheck)
                throw new AppException("Phone is already in use!");

            var user = _mapper.Map<User>(model);

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);

            if (model.Role == null)
                user.Role = Role.Customer;

            if (model.Role != Role.Worker)
                model.WorkExperience = null;

            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public IEnumerable<User> GetUsers()
        {
            return _context.Users;
        }

        public User GetById(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
                throw new KeyNotFoundException("User not found!");
            return user;
        }

        public void UpdateUser(UpdateUser model, int authenticatedUserId)
        {
            /* if (model.Id != authenticatedId)
                throw new AppException("Cannot update another user!"); */

            var emailCheck = _context.Users.Any(x => x.Email == model.Email);
            if (emailCheck)
                throw new AppException("Email is already in use!");

            var phoneCheck = _context.Users.Any(x => x.Phone == model.Phone);
            if (phoneCheck)
                throw new AppException("Phone is already in use!");

            var user = GetById(model.Id);

            if (model.Email == null)
                model.Email = user.Email;

            if (model.Firstname == null)
                model.Firstname = user.Firstname;

            if (model.Lastname == null)
                model.Lastname = user.Lastname;

            if (model.Phone == null)
                model.Phone = user.Phone;

            if (model.Password == null)
            {
                model.Password = user.PasswordHash;
            }
            else
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);
            }

            _mapper.Map(model, user);
            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void DeleteUser(int id)
        {
            var user = GetById(id);
            _context.Users.Remove(user);
            _context.SaveChanges();
        }
    }
}
