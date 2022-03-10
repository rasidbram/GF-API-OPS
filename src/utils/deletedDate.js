const deletedDate = day => {
	// for day ==> 24(day) *60(min) * 60(sec) * 1000(mlsec)
	// for min ==> 60(min) * 60(sec) * 1000(mlsec)

	const deleteTimeSec = day * 24 * 60 * 60 * 1000;

	let now = new Date().getTime();
	let date = new Date(now + deleteTimeSec);

	return date.toISOString();
};

module.exports = deletedDate(3);
