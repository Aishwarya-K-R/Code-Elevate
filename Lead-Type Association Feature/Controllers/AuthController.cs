using LSQ.Data;
using LSQ.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace LSQ.Controllers
{
    [ApiController]
    [Route("api/")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        private string GenerateJwtToken(string role, string id)
        {
            var jwtSettings = _config.GetSection("Jwt");
            var claims = new[]
            {
                new Claim(ClaimTypes.Role, role),
                new Claim(ClaimTypes.NameIdentifier, id)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("signup")]
        public IActionResult Signup([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid user data !!!");
            }    

            string? email = _context.Users.Where(u => u.Email == user.Email).Select(u => u.Email).FirstOrDefault();
            if(email != null)
            {
                return Conflict("User with the same email already exists !!!");
            }

            var passwordHasher = new PasswordHasher<User>();
            user.Password = passwordHasher.HashPassword(user, user.Password);

            User addUser = new()
            {
                Email = user.Email,
                Password = user.Password,
                Role = Enum.Parse<User.UserRole>("User")
            };

            _context.Users.Add(addUser);
            _context.SaveChanges();
            return Ok("User registered successfully !!!");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid user data !!!");
            }

            var userByEmail = _context.Users.Where(u => u.Email == user.Email).FirstOrDefault();
            if(userByEmail == null)
            {
                return NotFound("User with the given email does not exist !!!");
            }

            var passwordHasher = new PasswordHasher<User>();
            var result = passwordHasher.VerifyHashedPassword(userByEmail, userByEmail.Password, user.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return Unauthorized("Incorrect password !!!");
            }

            var token = GenerateJwtToken(userByEmail.Role.ToString(), userByEmail.Id.ToString());
            return Ok(new { message = "Login successful !!!", token = token });
        }
    }
}