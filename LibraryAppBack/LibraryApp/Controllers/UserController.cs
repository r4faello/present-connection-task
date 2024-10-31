using AutoMapper;
using LibraryApp.DTOs;
using LibraryApp.Repositories.BookRepo;
using LibraryApp.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace LibraryApp.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
        }

        [HttpPost("register", Name = "RegisterNewUser")]
        public async Task<ActionResult<string>> RegisterNewUser([FromBody] UserRegisterDto userRegisterDto)
        {
            string username = userRegisterDto.Username;
            string password = userRegisterDto.Password;

            var (result, user) = await _userService.CreateUserAsync(username, password);
            if (!result.IsSuccess)
            {
                return BadRequest(result.Message);
            }

            var (res, jwtToken) = await _userService.GenerateJwtAsync(username, password);
            if (!res.IsSuccess)
            {
                return BadRequest(res.Message);
            }

            return Ok(jwtToken);
        }

        [HttpPost("login", Name = "LoginUser")]
        public async Task<ActionResult<string>> LoginUser([FromBody] UserLoginDto userLoginDto)
        {
            string username = userLoginDto.Username;
            string password = userLoginDto.Password;


            var (res, jwtToken) = await _userService.GenerateJwtAsync(username, password);
            if (!res.IsSuccess)
            {
                return BadRequest(res.Message);
            }

            return Ok(jwtToken);
        }
    }
}
