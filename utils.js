//** Sanitize Posts

function sanitize(dirty) {
	// console.groupCollapsed(`Running Sanitize`);
	// console.log(`Input: ${dirty}`);

	// let caught = 0;

	// TODO add `>&'"` back into below
	const clean = dirty.replace(/[<]/g,
		function(match) {
			switch (match) {
				case '<':
					// console.log(`Found <`);
					// caught++;
					return '&lt;';
				// case '>':
				// 	console.log(`Found >`);
				// 	caught++;
				// 	return '&gt;';
				// case '&':
				// 	console.log(`Found &`);
				// 	caught++;
				// 	return '&amp;';
				// case "'":
				// 	console.log(`Found '`);
				// 	caught++;
				// 	return '&#39;';
				// case '"':
				// 	console.log(`Found "`);
				// 	caught++;
				// 	return '&quot;';
			}
		}
	);

	// if (caught == 0) { console.log(`No Characters Caught`) }

	// console.log(`Output: ${clean}`);
	// console.groupEnd();
	
	return clean;
}

//** Validate Posts

let valid = {
	name: true,
	nameWarn: ``,
	message: true,
	messageWarn: ``,
	all: true
};

function validReset() {
	valid.name = true;
	valid.nameWarn = ``;
	valid.message = true;
	valid.messageWarn = ``;
	valid.all = true;
}

module.exports = {
	sanitize,
	valid, validReset
};