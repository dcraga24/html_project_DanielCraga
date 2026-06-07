using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using AeroBlue.API.Data;
using AeroBlue.API.Models;

namespace AeroBlue.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly Database _db;

        public AuthController(Database db)
        {
            _db = db;
        }

        // POST /api/auth/register
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.FullName) ||
                string.IsNullOrWhiteSpace(req.Email) ||
                string.IsNullOrWhiteSpace(req.Password))
                return BadRequest(new { message = "All fields are required." });

            if (req.Password.Length < 6)
                return BadRequest(new { message = "Password must be at least 6 characters." });

            using var conn = _db.GetConnection();
            conn.Open();

            using var checkCmd = new MySqlCommand("SELECT id FROM users WHERE email = @email", conn);
            checkCmd.Parameters.AddWithValue("@email", req.Email);
            if (checkCmd.ExecuteScalar() != null)
                return Conflict(new { message = "Email already registered." });

            string hash = BCrypt.Net.BCrypt.HashPassword(req.Password);

            using var cmd = new MySqlCommand(
                "INSERT INTO users (full_name, email, password_hash) VALUES (@name, @email, @hash)", conn);
            cmd.Parameters.AddWithValue("@name", req.FullName);
            cmd.Parameters.AddWithValue("@email", req.Email);
            cmd.Parameters.AddWithValue("@hash", hash);
            cmd.ExecuteNonQuery();

            long newId = cmd.LastInsertedId;

            HttpContext.Session.SetInt32("userId", (int)newId);
            HttpContext.Session.SetString("userEmail", req.Email);
            HttpContext.Session.SetString("userName", req.FullName);

            return Ok(new { message = "Registered successfully.", userId = newId, name = req.FullName, email = req.Email });
        }

        // POST /api/auth/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest req)
        {
            if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
                return BadRequest(new { message = "Email and password are required." });

            using var conn = _db.GetConnection();
            conn.Open();

            using var cmd = new MySqlCommand(
                "SELECT id, full_name, email, password_hash FROM users WHERE email = @email", conn);
            cmd.Parameters.AddWithValue("@email", req.Email);

            using var reader = cmd.ExecuteReader();
            if (!reader.Read())
                return Unauthorized(new { message = "Invalid email or password." });

            int id = reader.GetInt32("id");
            string name = reader.GetString("full_name");
            string email = reader.GetString("email");
            string hash = reader.GetString("password_hash");
            reader.Close();

            if (!BCrypt.Net.BCrypt.Verify(req.Password, hash))
                return Unauthorized(new { message = "Invalid email or password." });

            HttpContext.Session.SetInt32("userId", id);
            HttpContext.Session.SetString("userEmail", email);
            HttpContext.Session.SetString("userName", name);

            return Ok(new { message = "Logged in successfully.", userId = id, name, email });
        }

        // GET /api/auth/logout
        [HttpGet("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return Ok(new { message = "Logged out." });
        }

        // GET /api/auth/me
        [HttpGet("me")]
        public IActionResult Me()
        {
            var userId = HttpContext.Session.GetInt32("userId");
            if (userId == null)
                return Unauthorized(new { message = "Not logged in." });

            return Ok(new
            {
                id = userId,
                name = HttpContext.Session.GetString("userName"),
                email = HttpContext.Session.GetString("userEmail")
            });
        }
    }
}
