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
