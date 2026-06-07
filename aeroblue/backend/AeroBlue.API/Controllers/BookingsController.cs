using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using AeroBlue.API.Data;
using AeroBlue.API.Models;

namespace AeroBlue.API.Controllers
{
    [ApiController]
    [Route("api/bookings")]
    public class BookingsController : ControllerBase
    {
        private readonly Database _db;

        public BookingsController(Database db)
        {
            _db = db;
        }

        // POST /api/bookings
        [HttpPost]
        public IActionResult CreateBooking([FromBody] BookingRequest req)
        {
            // Try session first, fall back to userId sent in request, default to 1
            var userId = HttpContext.Session.GetInt32("userId") ?? req.UserId ?? 1;

            if (string.IsNullOrWhiteSpace(req.Origin) || string.IsNullOrWhiteSpace(req.Destination))
                return BadRequest(new { message = "Origin and destination are required." });

            using var conn = _db.GetConnection();
            conn.Open();

            using var cmd = new MySqlCommand(@"
                INSERT INTO bookings (user_id, origin, destination, departure_date, return_date, passengers, trip_type, price)
                VALUES (@userId, @origin, @destination, @departureDate, @returnDate, @passengers, @tripType, @price)", conn);

            cmd.Parameters.AddWithValue("@userId", userId);
            cmd.Parameters.AddWithValue("@origin", req.Origin);
            cmd.Parameters.AddWithValue("@destination", req.Destination);
            cmd.Parameters.AddWithValue("@departureDate", req.DepartureDate);
            cmd.Parameters.AddWithValue("@returnDate", (object?)req.ReturnDate ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@passengers", req.Passengers);
            cmd.Parameters.AddWithValue("@tripType", req.TripType);
            cmd.Parameters.AddWithValue("@price", req.Price);
            cmd.ExecuteNonQuery();

            long bookingId = cmd.LastInsertedId;

            return Ok(new
            {
                message = "Booking confirmed!",
                bookingId,
                confirmationCode = $"AB-{bookingId:D4}-{DateTime.Now.Year}"
            });
        }

        // GET /api/bookings
        [HttpGet]
        public IActionResult GetMyBookings([FromQuery] int? userId = null)
        {
            var uid = HttpContext.Session.GetInt32("userId") ?? userId;
            if (uid == null)
                return Unauthorized(new { message = "You must be logged in." });

            using var conn = _db.GetConnection();
            conn.Open();

            using var cmd = new MySqlCommand(
                "SELECT * FROM bookings WHERE user_id = @userId ORDER BY booked_at DESC", conn);
            cmd.Parameters.AddWithValue("@userId", uid);

            var bookings = new List<object>();
            using var reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                bookings.Add(new
                {
                    id = reader.GetInt32("id"),
                    origin = reader.GetString("origin"),
                    destination = reader.GetString("destination"),
                    departureDate = reader.GetString("departure_date"),
                    returnDate = reader.IsDBNull(reader.GetOrdinal("return_date")) ? null : reader.GetString("return_date"),
                    passengers = reader.GetInt32("passengers"),
                    tripType = reader.GetString("trip_type"),
                    price = reader.GetDecimal("price"),
                    status = reader.GetString("status"),
                    bookedAt = reader.GetDateTime("booked_at").ToString("yyyy-MM-dd HH:mm")
                });
            }

            return Ok(bookings);
        }
    }
}
