function hide_display(spoilernr) {
	if (
		document.getElementById("spoiler" + spoilernr).style.display == "none" ||
		!document.getElementById("spoiler" + spoilernr).style.display
	) {
		document.getElementById("spoiler" + spoilernr).style.display = "block";
	} else {
		document.getElementById("spoiler" + spoilernr).style.display = "none";
	}
}
