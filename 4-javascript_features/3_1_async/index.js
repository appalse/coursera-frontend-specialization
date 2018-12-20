/**
 * @param {Function[]} operations
 * @param {Function} callback
 */

module.exports = function (operations, callback) {
	if (operations.length === 0) {
		callback(null, []);
		return;
	}

	let promises = operations.map(function(operation) {
		return new Promise(function(resolve, reject) {
			operation(function next(error, data) {
				if (error === null) {
					resolve(data);
				} else {
					reject(error);
				}
			});
		});
	});

	Promise.all(promises)
		.then(	function(results) {
					callback(null, results);
				}, 
				function(error) {
					callback(error, null);
				});
};