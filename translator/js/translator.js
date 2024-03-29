let forwardTimeout, backwardTimeout;
$(document).ready(function () {
	$("#english-text").focus();
	$(".translate-container .english").on("input", function (e) {
		clearTimeout(forwardTimeout);
		forwardTimeout = setTimeout(function () {
			let english = $("#english-text").val();
			let olililan = translate(english);
			$("#olililan-text").val(olililan);
		}, 200);
	});
	$(".translate-container .olililan").on("input", function (e) {
		clearTimeout(backwardTimeout);
		backwardTimeout = setTimeout(function () {
			let olililan = $("#olililan-text").val();
			let english = translate(olililan, "backward");
			$("#english-text").val(english);
		}, 200);
	});
});
