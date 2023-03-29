function arrayEqualityCheck(a, b) {
	// Check for basic properties first
	if (a === b) return true; // If array is the exact same, return true
	if (a.length !== b.length) return false; // If length is different, return false

	// Check for equality for all index. If inequality is found, returns false
	for (let i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}

	return true; // If it passed the test, return true
}

function arrayInArrayOccurence(arr1, arr2) {
	let bool = false;

	arr1.forEach((v) => {
		if (arrayEqualityCheck(v, arr2)) {
			bool = true;
		}
	});

	return bool;
}
