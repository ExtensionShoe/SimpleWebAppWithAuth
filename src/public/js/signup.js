$(document).ready(() => {
	$("#signupForm").submit(function () {
		var regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!regex.test($("#email").val())) {
			$("#error").text("Please enter a valid email address!");
			return false;
		}
		if ($("#password").val().length < 6) {
			$("#error").text("Passwords should be longer than 6 characters!");
			return false;
		}
		$.ajax("/signup", {
			data: $(this).serialize(), type: "POST", dataType: "json", success: function (data) {
				if (data.redirect) {
					window.location.href = data.redirect;
				} else {
					$("#error").text(data.error ? data.error : "Sign Up Failed");
				}
			}
		});
		return false;
	});
});