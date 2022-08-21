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
let phrases1;
let phrases2;
let words1;
let words2;
let intraword1;
let intraword2;
let prefixes1;
let prefixes2;
let suffixes1;
let suffixes2;
let regex1;
let regex2;
let rev_regex1;
let rev_regex2;
let ordering1;
let ordering2;
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
