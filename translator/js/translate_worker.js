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
