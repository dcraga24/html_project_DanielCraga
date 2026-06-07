// =====================================
// AeroBlue - Auth (Login / Register)
// Uses jQuery + real C# backend API
// =====================================

const API = "http://localhost:5000/api";

$(document).ready(function () {

    // ---- Check session on page load ----
    checkSession();

    // ---- Open Login modal ----
    $("#openLoginBtn").on("click", function () {
        $("#registerModal").addClass("hidden");
        $("#loginModal").removeClass("hidden");
        $("#modalOverlay").removeClass("hidden").addClass("show");
    });

    // ---- Open Register modal ----
    $("#openRegisterBtn").on("click", function () {
        $("#loginModal").addClass("hidden");
        $("#registerModal").removeClass("hidden");
        $("#modalOverlay").removeClass("hidden").addClass("show");
    });

    // ---- Switch between modals ----
    $("#switchToRegister").on("click", function () {
        $("#loginModal").addClass("hidden");
        $("#registerModal").removeClass("hidden");
    });

    $("#switchToLogin").on("click", function () {
        $("#registerModal").addClass("hidden");
        $("#loginModal").removeClass("hidden");
    });

    // ---- Close modal ----
    $(document).on("click", "[data-close]", function () {
        $("#modalOverlay").removeClass("show").addClass("hidden");
        $("#loginModal").addClass("hidden");
        $("#registerModal").addClass("hidden");
    });

    // ---- Login form submit ----
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        const email = $("#loginEmail").val().trim();
        const password = $("#loginPassword").val().trim();

        if (!email || !password) {
            showError("#loginForm", "Please fill in all fields.");
            return;
        }

        $.ajax({
            url: API + "/auth/login",
            method: "POST",
            contentType: "application/json",
            xhrFields: { withCredentials: true },
            data: JSON.stringify({ email, password }),
            success: function (res) {
                localStorage.setItem("aeroblue_user", JSON.stringify({ userId: parseInt(res.userId || res.id || 0), name: res.name, email: res.email }));
                updateNavForLoggedInUser(res.name);
                $("#modalOverlay").removeClass("show").addClass("hidden");
                $("#loginModal").addClass("hidden");
            },
            error: function (xhr) {
                const msg = xhr.responseJSON?.message || "Login failed.";
                showError("#loginForm", msg);
            }
        });
    });

    // ---- Register form submit ----
    $("#registerForm").on("submit", function (e) {
        e.preventDefault();

        const fullName = $("#registerName").val().trim();
        const email = $("#registerEmail").val().trim();
        const password = $("#registerPassword").val().trim();
        const confirm = $("#registerConfirmPassword").val().trim();

        if (!fullName || !email || !password || !confirm) {
            showError("#registerForm", "Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            showError("#registerForm", "Password must be at least 6 characters.");
            return;
        }

        if (password !== confirm) {
            showError("#registerForm", "Passwords do not match.");
            return;
        }

        $.ajax({
            url: API + "/auth/register",
            method: "POST",
            contentType: "application/json",
            xhrFields: { withCredentials: true },
            data: JSON.stringify({ fullName, email, password }),
            success: function (res) {
                localStorage.setItem("aeroblue_user", JSON.stringify({ userId: parseInt(res.userId || res.id || 0), name: res.name, email: res.email }));
                updateNavForLoggedInUser(res.name);
                $("#modalOverlay").removeClass("show").addClass("hidden");
                $("#registerModal").addClass("hidden");
            },
            error: function (xhr) {
                const msg = xhr.responseJSON?.message || "Registration failed.";
                showError("#registerForm", msg);
            }
        });
    });

});

// ---- Check if user already has a session ----
function checkSession() {
    $.ajax({
        url: API + "/auth/me",
        method: "GET",
        xhrFields: { withCredentials: true },
        success: function (res) {
            localStorage.setItem("aeroblue_user", JSON.stringify({ userId: parseInt(res.userId || res.id || 0), name: res.name, email: res.email }));
            updateNavForLoggedInUser(res.name);
        },
        error: function () {
            const stored = localStorage.getItem("aeroblue_user");
            if (stored) {
                const user = JSON.parse(stored);
                updateNavForLoggedInUser(user.name);
            }
        }
    });
}

// ---- Update nav when logged in ----
function updateNavForLoggedInUser(name) {
    $("#openLoginBtn").text("Log out").off("click").on("click", function () {
        $.ajax({
            url: API + "/auth/logout",
            method: "GET",
            xhrFields: { withCredentials: true },
            complete: function () {
                localStorage.removeItem("aeroblue_user");
                location.reload();
            }
        });
    });
    $("#openRegisterBtn").text("Hi, " + name.split(" ")[0]).css("cursor", "default").off("click");
}

// ---- Show error inside a form ----
function showError(formSelector, message) {
    $(formSelector).find(".modal-error").remove();
    $(formSelector).append('<p class="modal-error" style="color:red;font-size:13px;margin-top:8px;">' + message + '</p>');
}
