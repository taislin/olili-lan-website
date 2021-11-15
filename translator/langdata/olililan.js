var jsonData = {
	phrases1: "",
	phrases2: "",
	words1: "",
	words2: "",
	suffixes1: "",
	suffixes2: "",
	intraword1: "",
	intraword2: "",
	prefixes1: "",
	prefixes2: "",
	regex1: "",
	regex2: "",
	rev_regex1: "",
	rev_regex2: "",
	ordering1: "",
	ordering2: "",
};

$.get("./langdata/words.csv", function (data) {
	[jsonData.words1, jsonData.words2] = parseCSV(data);
});
$.get("./langdata/phrases.csv", function (data) {
	[jsonData.phrases1, jsonData.phrases2] = parseCSV(data);
});
$.get("./langdata/infixes.csv", function (data) {
	[jsonData.intraword1, jsonData.intraword2] = parseCSV(data);
});
$.get("./langdata/prefixes.csv", function (data) {
	[jsonData.prefixes1, jsonData.prefixes2] = parseCSV(data);
});
$.get("./langdata/suffixes.csv", function (data) {
	[jsonData.suffixes1, jsonData.suffixes2] = parseCSV(data);
	console.log(data);
});
function parseCSV(data) {
	// By lines
	var array1 = "";
	var array2 = "";
	var lines = data.split("\n");
	for (var line = 0; line < lines.length; line++) {
		var columns = data.split("	");
		for (var column = 0; column < columns.length; column++) {
			if (column == 0) {
				array1 += columns[0];
				array1 += "\n";
			}
			if (column == 1) {
				array2 += columns[1];
				array2 += "\n";
			}
			console.log(array1);
		}
	}
	return [array1, array2];
}
