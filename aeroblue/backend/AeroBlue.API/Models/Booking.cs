namespace AeroBlue.API.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Origin { get; set; } = "";
        public string Destination { get; set; } = "";
        public string DepartureDate { get; set; } = "";
        public string? ReturnDate { get; set; }
        public int Passengers { get; set; } = 1;
        public string TripType { get; set; } = "return";
        public decimal Price { get; set; }
        public string Status { get; set; } = "confirmed";
        public DateTime BookedAt { get; set; }
    }

    public class BookingRequest
    {
        public int? UserId { get; set; }
        public string Origin { get; set; } = "";
        public string Destination { get; set; } = "";
        public string DepartureDate { get; set; } = "";
        public string? ReturnDate { get; set; }
        public int Passengers { get; set; } = 1;
        public string TripType { get; set; } = "return";
        public decimal Price { get; set; }
    }
}
