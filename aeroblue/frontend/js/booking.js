// =====================================
// AeroBlue - Booking submission
// =====================================

$(document).ready(function () {

    const bookingData = JSON.parse(sessionStorage.getItem("aeroblue_booking") || "{}");
    if (bookingData.price) {
        const passengers = bookingData.passengers || 1;
        const total = bookingData.price * passengers;
        $(".summary-line.total span:last").text("€" + total);
    }

    $("#paymentForm").on("submit", function (e) {
        e.preventDefault();

        const fullName = $("#fullName").val().trim();
        const email = $("#email").val().trim();
        const cardNumber = $("#cardNumber").val().trim();
        const expiry = $("#expiry").val().trim();
        const cvv = $("#cvv").val().trim();

        if (!fullName || !email || !cardNumber || !expiry || !cvv) {
            $("#paymentError").text("Please fill in all required fields.");
            return;
        }
        if (cardNumber.replace(/\s/g, "").length < 16) {
            $("#paymentError").text("Please enter a valid 16-digit card number.");
            return;
        }
        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            $("#paymentError").text("Expiry must be in MM/YY format.");
            return;
        }
        if (cvv.length < 3) {
            $("#paymentError").text("CVV must be at least 3 digits.");
            return;
        }

        const booking = JSON.parse(sessionStorage.getItem("aeroblue_booking") || "{}");
        const passengers = parseInt(booking.passengers) || 1;
        const totalPrice = parseFloat(booking.price || 104) * passengers;

        // Try to get userId from localStorage, default to 1 if not found
        const userRaw = localStorage.getItem("aeroblue_user");
        const user = userRaw ? JSON.parse(userRaw) : {};
        const userId = parseInt(user.userId || user.id || 1);

        const payload = {
            userId: userId,
            origin: booking.origin || "Tirana (TIA)",
            destination: booking.destination || "Rome (FCO)",
            departureDate: booking.departureDate || "",
            returnDate: booking.returnDate || null,
            passengers: passengers,
            tripType: booking.tripType || "return",
            price: totalPrice
        };

        $.ajax({
            url: "http://localhost:5000/api/bookings",
            method: "POST",
            contentType: "application/json",
            xhrFields: { withCredentials: true },
            data: JSON.stringify(payload),
            success: function (res) {
                sessionStorage.setItem("aeroblue_confirmation", JSON.stringify({
                    confirmationCode: res.confirmationCode,
                    ...payload
                }));
                window.location.href = "success.html";
            },
            error: function (xhr) {
                const msg = xhr.responseJSON?.message || "Booking failed.";
                $("#paymentError").text(msg);
            }
        });
    });

    $("#cardNumber").on("input", function () {
        let val = $(this).val().replace(/\D/g, "").substring(0, 16);
        val = val.replace(/(.{4})/g, "$1 ").trim();
        $(this).val(val);
    });

    $("#expiry").on("input", function () {
        let val = $(this).val().replace(/\D/g, "").substring(0, 4);
        if (val.length >= 2) val = val.substring(0, 2) + "/" + val.substring(2);
        $(this).val(val);
    });

    $("#cvv").on("input", function () {
        $(this).val($(this).val().replace(/\D/g, "").substring(0, 4));
    });

});
