module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {
	this.data = [];
}


// Методы коллекции
Collection.prototype.values = function () {
	return this.data;
};

Collection.prototype.count = function() {
	return this.data.length;
};

Collection.prototype.at = function(position) {
	return this._validPosition(position)
						? this.data[position - 1]
						: null;
};

Collection.prototype.append = function(items) {
	if (items instanceof Collection) {
		this.data = this.data.concat(items.values());
	} else if (items instanceof Array) {
		this.data = this.data.concat(items);
	} else {
		this.data.push(items);
	}
};

Collection.prototype.removeAt = function(position) {
	var valid = this._validPosition(position);
	if (valid) {
		this.data.splice(position - 1, 1);
	}
	return valid;
};

Collection.prototype._validPosition = function(position) {
	return (position > 0 && position <= this.count());
};


/**
 * Создание коллекции из массива значений
 */
Collection.from = function (source) {
	return source.reduce(function(collection, item) {
		collection.append(item);
		return collection;
	}, new Collection());
};
