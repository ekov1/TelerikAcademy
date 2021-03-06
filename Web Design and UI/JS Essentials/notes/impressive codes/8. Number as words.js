function solveTask(number) {
	function numberToWords(number) {
		var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
		var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

		var n = ('000000000' + number).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d)(\d{2})$/);
		if (!n) {
			return;
		}
		var str = '';
		str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
		str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
		str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';

		return str;
	}

	var output = numberToWords(number);
	console.log(output);
}

solveTask(65);
solveTask(15);
solveTask(7657);
solveTask(362);
solveTask(999);