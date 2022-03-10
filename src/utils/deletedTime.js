const deletedTime = day => {
	return day * 24 * 60 * 60 * 1000 + Date.now();
};

module.exports = deletedTime(3);
