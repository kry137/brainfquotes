const loops = {
    18: '>++++++[<+++>-]<',
	40: '>+++++[<++++>-]<',
    64: '>++++++++[<++++++++>-]<',
    80: '>++++++++++[<++++++++>-]<',
}

export default function getBrainf(text) {
    let memo = 0;
    let syntax = '';
    for (let i = 0; i < text.length; i++) {
		
		let asciiCode = text.charCodeAt(i);
		
		if (asciiCode > 255) {
			asciiCode = '?'.charCodeAt(0);
		}

		let different = asciiCode - memo;
		
		while (different != 0) {
			const absolute = Math.abs(different);
			const normalized = Math.sign(different);

			let newSyntax = loops[absolute] ?? '+';
			let numGap = loops.hasOwnProperty(absolute) ? absolute : 1;
			
			if (normalized == -1) newSyntax = invertSigns(newSyntax);
			numGap *= normalized;

			syntax += newSyntax;
			different -= numGap;
		}
		syntax += '.';

		memo = asciiCode;
    }
	// console.log(syntax);
	
    return syntax;
}

function invertSigns(brainf) {
  return brainf
    .split('')
    .map(ch => {
      if (ch === '+') return '-';
      if (ch === '-') return '+';
      return ch;
    })
    .join('');
}