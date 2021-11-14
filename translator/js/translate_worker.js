self.addEventListener(
	"message",
	function (e) {
		if (e.data.startEvent) {
			initData(e.data);
			self.postMessage({ text: "", startEvent: true });
		} else {
			self.postMessage({ text: translate(e.data.text, e.data.direction), direction: e.data.direction });
		}
	},
	false
);
var phrases1;
var phrases2;
var words1;
var words2;
var intraword1;
var intraword2;
var prefixes1;
var prefixes2;
var suffixes1;
var suffixes2;
var regex1;
var regex2;
var rev_regex1;
var rev_regex2;
var ordering1;
var ordering2;
function initData(data) {
	phrases1 = data.phrases1;
	phrases2 = data.phrases2;
	words1 = data.words1;
	words2 = data.words2;
	intraword1 = data.intraword1;
	intraword2 = data.intraword2;
	prefixes1 = data.prefixes1;
	prefixes2 = data.prefixes2;
	suffixes1 = data.suffixes1;
	suffixes2 = data.suffixes2;
	regex1 = data.regex1;
	regex2 = data.regex2;
	rev_regex1 = data.rev_regex1;
	rev_regex2 = data.rev_regex2;
	ordering1 = data.ordering1;
	ordering2 = data.ordering2;
}
var doneToken = "����}�";
var sentenceCount = 0;
function translate(text, direction) {
	if (text == "") return "";
	var translatedText = "";
	if (
		!(
			[]
				.concat(
					phrases1,
					phrases2,
					words1,
					words2,
					intraword1,
					intraword2,
					prefixes1,
					prefixes2,
					suffixes1,
					suffixes2,
					regex1,
					regex2,
					rev_regex1,
					rev_regex2,
					ordering1,
					ordering2
				)
				.join("").length === 0
		)
	) {
		sentenceCount = 0;
		sentenceArray = text.split(".");
		sentenceArray = sentenceArray.filter(function (s) {
			return s !== "";
		});
		for (var i = 0; i < sentenceArray.length; i++) {
			text = sentenceArray[i];
			if (text === ".") {
				translatedText += ".";
				continue;
			}
			if (text.trim() === "") {
				translatedText += text;
				continue;
			}
			var startsWithSpace = false;
			if (text[0] === " ") {
				startsWithSpace = true;
			}
			var firstLetterIsCapital = false;
			if (text.trim()[0] === text.trim()[0].toUpperCase()) {
				firstLetterIsCapital = true;
			}
			if (direction == "backward") {
				text = intrawordSwap(intraword2, intraword1, text);
				text = " " + text + " ";
				text = text.toLowerCase();
				text = text.split("\n").join(" 985865568NEWLINETOKEN98758659 ");
				text = phraseSwap(phrases2, phrases1, text);
				text = wordSwap(words2, words1, text);
				text = prefixSwap(prefixes2, prefixes1, text);
				text = suffixSwap(suffixes2, suffixes1, text);
				text = removeDoneTokens(text);
				text = text.split(doneToken).join("");
				text = text.trim();
				text = regexReplace(rev_regex1, rev_regex2, text);
				text = wordOrdering(ordering2, ordering1, text);
			} else {
				text = intrawordSwap(intraword1, intraword2, text);
				text = " " + text + " ";
				text = text.toLowerCase();
				text = text.split("\n").join(" 985865568NEWLINETOKEN98758659 ");
				text = phraseSwap(phrases1, phrases2, text);
				text = wordSwap(words1, words2, text);
				text = prefixSwap(prefixes1, prefixes2, text);
				text = suffixSwap(suffixes1, suffixes2, text);
				text = removeDoneTokens(text);
				text = text.split(doneToken).join("");
				text = text.trim();
				text = regexReplace(regex1, regex2, text);
				text = wordOrdering(ordering1, ordering2, text);
			}
			text = text.split(" 985865568NEWLINETOKEN98758659 ").join("\n");
			text = text.split(" 985865568NEWLINETOKEN98758659").join("\n");
			text = text.split("985865568NEWLINETOKEN98758659").join("\n");
			text = text.replace(/(\b\S+\b)[ ]+\b\1\b/gi, "$1 $1");
			if (firstLetterIsCapital) {
				text = text[0].toUpperCase() + text.substr(1);
			}
			if (startsWithSpace) {
				text = " " + text;
			}
			if (i == 0) translatedText += text;
			else translatedText += ". " + text;
			sentenceCount++;
		}
		translatedText = translatedText.split("{{*DUPLICATE MARKER*}}").join("");
		if (typeof doApplySentenceCase !== "undefined") {
			if (doApplySentenceCase !== false) {
				translatedText = applySentenceCase(translatedText);
				translatedText = capitalizeFirstLetter(translatedText);
			}
		}
	} else {
		translatedText = text;
	}
	if (direction == "backward" && typeof backward === "function") {
		translatedText = backward(translatedText);
	} else if (typeof forward === "function") {
		translatedText = forward(translatedText);
	}
	return translatedText;
}
function applySentenceCase(str) {
	return str.replace(/.+?[\.\?\!](\s|$)/g, function (txt) {
		if (txt.charAt(0).match(/[a-z]/g) !== null) return txt.charAt(0).toUpperCase() + txt.substr(1);
		else return txt;
	});
}
function capitalizeFirstLetter(string) {
	if (string.charAt(0).match(/[a-z]/g) !== null) return string.charAt(0).toUpperCase() + string.slice(1);
	else return string;
}
function phraseSwap(phrases1, phrases2, text) {
	var wordSeps = new Array(" ", ",", ".", "'", "!", ":", "?", '"', ";", "/", "<", ">", ")", "(", "%", "$");
	var phrases2 = makeArrayClone(phrases2);
	for (var i = 0; i < phrases2.length; i++) {
		phrases2[i] = tokenate(phrases2[i]);
	}
	for (var i = 0; i < phrases1.length; i++) {
		for (var j = 0; j < wordSeps.length; j++) {
			if (phrases2[i] !== "")
				text = text.split(" " + phrases1[i].toLowerCase() + wordSeps[j]).join(" " + phrases2[i] + wordSeps[j]);
			else text = text.split(" " + phrases1[i].toLowerCase() + wordSeps[j]).join(" ");
		}
	}
	return text;
}
function wordSwap(words1, words2, text) {
	var wordSeps = new Array(" ", ",", ".", "'", "!", ":", "?", '"', ";", "/", "<", ">", ")", "(", "%", "$");
	text = text.replace(/(\b\S+\b)\s+\b\1\b/i, "$1  $1");
	var words2 = makeArrayClone(words2);
	for (var i = 0; i < words2.length; i++) {
		words2[i] = tokenate(words2[i]);
	}
	var words1_notags = [];
	for (var i = 0; i < words1.length; i++) {
		if (words1[i] instanceof Array) {
			words1_notags[i] = [];
			for (var j = 0; j < words1[i].length; j++) {
				words1_notags[i][j] = words1[i][j].replace(/\{\{.*\}\}/g, "");
			}
		} else {
			words1_notags[i] = words1[i].replace(/\{\{.*\}\}/g, "");
		}
	}
	for (var i = 0; i < words1_notags.length; i++) {
		if (words2[i] instanceof Array) {
			var l = words2[i].length;
			var swapWithThis = words2[i][Math.floor(Math.random() * words2[i].length)];
		} else {
			var swapWithThis = words2[i];
		}
		for (var j = 0; j < wordSeps.length; j++) {
			if (words1_notags[i] instanceof Array) {
				for (var k = 0; k < words1_notags[i].length; k++) {
					if (swapWithThis.length > 0)
						text = text
							.split(" " + words1_notags[i][k].toLowerCase() + wordSeps[j])
							.join(" " + swapWithThis + wordSeps[j]);
					else text = text.split(" " + words1_notags[i][k].toLowerCase() + wordSeps[j]).join(" ");
				}
			} else {
				if (
					words1_notags[i][0] + words1_notags[i].slice(-1) == "''" ||
					words1_notags[i][0] + words1_notags[i].slice(-1) == '""'
				) {
					text = text.split(words1_notags[i].toLowerCase() + wordSeps[j]).join(swapWithThis + wordSeps[j]);
				} else if (swapWithThis.length > 0)
					text = text.split(" " + words1_notags[i].toLowerCase() + wordSeps[j]).join(" " + swapWithThis + wordSeps[j]);
				else text = text.split(" " + words1[i].toLowerCase() + wordSeps[j]).join(" ");
			}
		}
	}
	return text;
}
function intrawordSwap(intraword1, intraword2, text) {
	var start = 0;
	var str = "";
	var finalText = "";
	for (var end = 0; end < text.length + 1; end++) {
		str = text.substring(start, end);
		for (var i = 0; i < intraword1.length; i++) {
			if (str.indexOf(intraword1[i]) !== -1) {
				finalText += str.replace(intraword1[i], intraword2[i]);
				start = end;
				break;
			}
		}
	}
	finalText += text.substring(start, end);
	text = finalText;
	return text;
}
function escapeRegex(regex) {
	return regex.replace(/([()[{*+.$^\\|?])/g, "\\$1");
}
function prefixSwap(prefixes1, prefixes2, text) {
	var prefixes2 = makeArrayClone(prefixes2);
	for (var i = 0; i < prefixes2.length; i++) {
		prefixes2[i] = tokenate(prefixes2[i]);
	}
	for (var i = 0; i < prefixes1.length; i++) {
		text = text.replace(new RegExp("\\s" + escapeRegex(prefixes1[i]) + "([^\\s])", "g"), " " + prefixes2[i] + "$1");
	}
	return text;
}
function suffixSwap(suffixes1, suffixes2, text) {
	var suffixes2 = makeArrayClone(suffixes2);
	for (var i = 0; i < suffixes2.length; i++) {
		suffixes2[i] = tokenate(suffixes2[i]);
	}
	for (var i = 0; i < suffixes1.length; i++) {
		text = text.replace(new RegExp("([^\\s])" + escapeRegex(suffixes1[i]) + "\\s", "g"), "$1" + suffixes2[i] + " ");
	}
	return text;
}
function regexReplace(regex1, regex2, text) {
	for (var i = 0; i < regex1.length; i++) {
		if (typeof regex2[0] == "string" || regex2[0] instanceof String) {
			var match = regex1[i].match(new RegExp("^/(.*?)/([gimy]*)$"));
			if (match) {
				var properRegEx = new RegExp(match[1], match[2]);
				text = text.replace(properRegEx, regex2[i]);
			}
		}
	}
	return text;
}
function wordOrdering(ordering1, ordering2, text) {
	for (var i = 0; i < ordering1.length; i++) {
		var regex = new RegExp(
			"([^\\s]+){{" + ordering1[i].trim().replace(/[\s]+/g, " ").split(" ").join("}}[\\s]+([^\\s]+){{") + "}}",
			"g"
		);
		var orderString = getRelativeOrder(
			ordering1[i].replace(/[\s]+/g, " ").split(" "),
			ordering2[i].replace(/[\s]+/g, " ").split(" ")
		);
		text = text.replace(regex, "$" + orderString.split(",").join(" $"));
	}
	var alreadyRemovedTags = [];
	for (var i = 0; i < ordering1.length; i++) {
		var tags = ordering1[i].trim().replace(/[\s]+/g, " ").split(" ");
		for (var j = 0; j < tags.length; j++) {
			if (alreadyRemovedTags.indexOf(tags[j]) === -1) {
				text = text.replace("{{" + tags[j] + "}}", "");
				alreadyRemovedTags.push(tags[j]);
			}
		}
	}
	return text;
}
function getRelativeOrder(truth, jumbled) {
	var order = [];
	for (var i = 0; i < jumbled.length; i++) {
		if (truth.indexOf(jumbled[i]) !== -1) {
			order.push(truth.indexOf(jumbled[i]) + 1);
		} else {
		}
	}
	return order.join(",");
}
function removeDoneTokens(text) {
	text = text.split(doneToken).join("");
	return text;
}
function tokenate(s) {
	if (Object.prototype.toString.call(s) === "[object Array]") {
		for (var i = 0; i < s.length; i++) {
			s[i] = doneToken + s[i].toString().split("").join(doneToken) + doneToken;
		}
		return s;
	} else {
		return doneToken + s.toString().split("").join(doneToken) + doneToken;
	}
}
function handleDuplicates(words1, words2) {
	var words1InitialLength = words1.length;
	for (var i = 0; i < words1InitialLength; i++) {
		var findDupsOf = words1[i];
		var dupArray = new Array();
		var foundDups = false;
		if (!(findDupsOf.substring(0, "{{*DUPLICATE MARKER*}}".length) == "{{*DUPLICATE MARKER*}}")) {
			for (var j = 0; j < words1InitialLength; j++) {
				if (findDupsOf == words1[j] && i != j) {
					dupArray.push(words2[j]);
					words1[i] = "{{*DUPLICATE MARKER*}}" + words1[i];
					words1[j] = "{{*DUPLICATE MARKER*}}" + words1[j];
					foundDups = true;
				}
			}
		}
		if (foundDups) {
			dupArray.push(words2[i]);
			words1.push(findDupsOf);
			words2.push(dupArray);
		}
	}
	for (var i = 0; i < words1.length; i++) {
		if (words1[i].substring(0, "{{*DUPLICATE MARKER*}}".length) === "{{*DUPLICATE MARKER*}}") {
			if (i == 0) {
				words1.shift();
				words2.shift();
				i--;
			} else {
				words1.splice(i, 1);
				words2.splice(i, 1);
			}
		}
	}
	var result = new Array(words1, words2);
	return result;
}
function makeArrayClone(existingArray) {
	var newObj = existingArray instanceof Array ? [] : {};
	for (i in existingArray) {
		if (i == "clone") continue;
		if (existingArray[i] && typeof existingArray[i] == "object") {
			newObj[i] = makeArrayClone(existingArray[i]);
		} else {
			newObj[i] = existingArray[i];
		}
	}
	return newObj;
}
