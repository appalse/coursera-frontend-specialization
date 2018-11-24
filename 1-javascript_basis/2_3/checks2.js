// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var phoneBook = require('./index.js');

// Добавляем телефоны контакту Ivan
console.log(phoneBook("ADD Ivan 555,666"));
console.log(phoneBook("ADD Alex 777"));
console.log(phoneBook("ADD Alex 333"));
console.log(phoneBook("REMOVE_PHONE 555"));
console.log(phoneBook("SHOW"));
console.log(phoneBook("REMOVE_PHONE 666"));
console.log(phoneBook("SHOW"));
console.log(phoneBook("ADD Ivan 888"));
console.log(phoneBook("SHOW"));

//ожидается результат: ["Alex: 777, 333","Ivan: 888"]

// Проверка работы функции SHOW
assert.deepEqual(
    // Получаем содержимое телефонной книги
    phoneBook('SHOW'),
    [
        'Alex: 777, 333',
        'Ivan: 888'
    ],
    'В телефонной книге: "Alex: 777, 333","Ivan: 888"'
);

console.info('OK!');
