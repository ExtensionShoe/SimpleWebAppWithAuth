$(document).ready(() => {
	$.get("/courses", (data, status) => {
		$("body").text(status);
	});
});