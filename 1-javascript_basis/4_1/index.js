var PRIORITY = {filterOperation: 0, selectOperation: 1};

/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(inputCollection) {
    // сделать копию входного массива
    var operations = [].slice.call(arguments, 1);
    var collection = inputCollection.slice();
    // вернуть копию, если нет операций
    if (operations.length === 0) {
        return collection;
    };
    // отсортировать операции, сначала фильтрация, затем выбор
    operations.sort(function(leftOperation, rightOperation) {
        return PRIORITY[leftOperation.name] - PRIORITY[rightOperation.name];
    });
    // выполнить операции
    return operations.reduce(function(prevCollection, operation) {
        return operation(prevCollection);
    }, collection);
}

/**
 * @params {String[]}
 */
function select () {
    var properties = [].slice.call(arguments);
    
    return function selectOperation(collection) {
        return collection.map(function(item){
            var newItem = {};
            for (var i = 0; i < properties.length; i++) {
                var property = properties[i];
                if (item.hasOwnProperty(property)) {
                    newItem[property] = item[property];
                }
            }            
            return newItem;            
        });
    }
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) { 
    return function filterOperation(collection) {
        return collection.filter(function(item){
            return values.indexOf(item[property]) !== -1;
        });
    };
};

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};

