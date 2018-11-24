/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
    return MyDate(date);
};


function MyDate(dateStr) {
    var parsed = dateStr.match(/\d+/g);
    this.date = new Date(Date.UTC(parsed[0], parsed[1] - 1, 
                                  parsed[2], parsed[3], parsed[4]));                       

    this.value = dateToStr(this.date);    

    this.add = function(quantity, unit) {
        check(quantity, unit);
        this._update(quantity, unit);
        return this;
    };

    this.subtract = function(quantity, unit) {
        check(quantity, unit);
        this._update(-1*quantity, unit);
        return this;
    };

    this._update = function(quantity, unit) {
        switch (unit) {
        case 'years':
            this.date.setUTCFullYear(this.date.getUTCFullYear() + quantity);
            break;
        case 'months':
            this.date.setUTCMonth(this.date.getUTCMonth() + quantity);
            break;
        case 'days':
            this.date.setUTCDate(this.date.getUTCDate() + quantity);
            break;
        case 'hours':
            this.date.setUTCHours(this.date.getUTCHours() + quantity);
            break;
        case 'minutes':
            this.date.setUTCMinutes(this.date.getUTCMinutes() + quantity);
            break;
        default:
            ; // cannot be here
        };
        this.value = dateToStr(this.date);
    }; 

    return this;
};

var availableUnits = ['years', 'months', 'days', 'hours', 'minutes'];


function check(quantity, unit) {
    if (quantity < 0) {
        throw TypeError('Invalid argument quantity: ' + quantity);
    }
    if (availableUnits.indexOf(unit) === -1) {
        throw TypeError('Invalid argument unit: ' + unit);
    };
};

function dateToStr(date) {
    return ''.concat(date.getUTCFullYear(), '-', addLeadingZero(date.getUTCMonth() + 1), '-', 
                addLeadingZero(date.getUTCDate()), ' ', addLeadingZero(date.getUTCHours()), ':',
                addLeadingZero(date.getUTCMinutes()));
};  

function addLeadingZero(time) {
    return time.toString().length < 2 ? '0' + time : time;
};
