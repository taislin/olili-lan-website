var forwardTimeout, backwardTimeout;
$(document).ready(function () {
	$("#english-text").focus();
	$(".translate-container .english").on("input", function (e) {
		clearTimeout(forwardTimeout);
		forwardTimeout = setTimeout(function () {
			var english = $("#english-text").val();
			var olililan = translate(english);
			$("#olililan-text").val(olililan);
		}, 200);
	});
	$(".translate-container .olililan").on("input", function (e) {
		clearTimeout(backwardTimeout);
		backwardTimeout = setTimeout(function () {
			var olililan = $("#olililan-text").val();
			var english = translate(olililan, "backward");
			$("#english-text").val(english);
		}, 200);
	});
});
