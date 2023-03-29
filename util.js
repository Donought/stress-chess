function arrayEqualityCheck(a, b) {
	// Check for basic properties first
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	// Check for quality for all index. If it finds an inequality, it returns false
	for (let i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}

	return true;
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
