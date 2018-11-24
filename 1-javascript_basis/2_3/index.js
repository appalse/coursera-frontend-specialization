// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
    var parts = command.split(' ');
    var commandName = parts[0];

    if (commandName == 'ADD') {
        var contactName = parts[1];
        var phones = parts[2];
        return addContact(contactName, phones);
    } 
    if (commandName == 'REMOVE_PHONE') {
        var phone = parts[1];
        return removePhone(phone);
    } 
    if (commandName == 'SHOW') {
        return getPhoneBook();
    }

};

function addContact(name, newPhones) {
    var wasAdded = false;
    var newPhonesList = newPhones.split(',');
    if (!phoneBook.hasOwnProperty(name)) {
        phoneBook[name] = [];
    }
    for (var i = 0; i < newPhonesList.length; i++) {
        if (phoneBook[name].some(phone => phone === newPhonesList[i])) {
            continue; // такой номер уже есть в списке
        }
        phoneBook[name].push(newPhonesList[i]);
        wasAdded = true;
    }
    return wasAdded;
};



function removePhone(phone) {
    var wasDeleted = false;
    for (var name in phoneBook) {
        var phoneIndex = phoneBook[name].indexOf(phone);
        if (phoneIndex === -1) {
            continue; // у контакта отсутствует такой номер телефона (phone)
        }
        phoneBook[name].splice(phoneIndex, 1);
        if (phoneBook[name].length === 0) {
            delete phoneBook[name];
        }
        wasDeleted = true;            
    }
    return wasDeleted;
};


function getName(contactField) {
    return contactField.slice(0, contactField.indexOf(':'));
};

function sortFunction(left, right) {
    var leftName = getName(left);
    var rightName = getName(right);
    if (leftName < rightName) {
        return -1;
    }
    if (rightName < leftName) {
        return 1;
    }
    return 0;
};

function getPhoneBook() {
    var names = Object.keys(phoneBook);
    names.sort();
    return names.map(function(name) {
        return name + ': ' + phoneBook[name].join(', ');
    });
};
