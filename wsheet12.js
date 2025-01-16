let thcJSON = '{\n' +
    ' "uuid": "0176b0e6-225d-482f-b190-9bc18225ec54",\n' +
    ' "name": "name-0",\n' +
    ' "description": "description-0",\n' +
    ' "ownerEmail": "email-0@example.com ",\n' +
    ' "secretCode": "abc1234",\n' +
    ' "visibility": "UNLISTED",\n' +
    ' "startsOn": 1568880714838,\n' +
    ' "endsOn": 1568884314838,\n' +
    ' "maxDuration": 1440000,\n' +
    ' "shuffled": true,\n' +
    ' "requiresAuthentication": false,\n' +
    ' "emailResults": false,\n' +
    ' "hasPrize": false\n' +
    '}';
let tch = JSON.parse(thcJSON);
let challenges = {
    name: personObject.name,
    description: personObject.description,
    visibility: personObject.visibility
};

let weatherJSON = '{\n' +
    ' "temperatures": [23, 25, 27, 18, 35],\n' +
    ' "rainfall": [0.0, 0.1, 1.2, 2.0, 1.3]\n' +
    '}\n';
let temperatures = wprint;
let weatherJSON = `{
    "temperatures": [23, 25, 27, 18, 35],
    "rainfall": [0.0, 0.1, 1.2, 2.0, 1.3]
}`;

let weather = JSON.parse(weatherJSON); // Преобразуем JSON-строку в объект
let temperatures = weather.temperatures; // Доступ к массиву temperatures

console.log(temperatures); // Выводим массив температур на консоль

// Если нужно, можно обойти массив и вывести элементы по отдельности
for (let i = 0; i < temperatures.length; i++) {
    console.log(`Temperature ${i + 1}: ${temperatures[i]}°C`);
}

//console.log(JSON.stringify(person, null, 2));
//console.log("name,"+personObject.name+ "description"+personObject.descriptions+" visibility " + personObject.visibility);

let thcJSONResponse = '{\n' +
    ' "treasureHunts": [\n' +
    ' {\n' +
    ' "uuid": "f1a6332f-27a4-4522-b52e-4937d5d747c7",\n' +
    ' "name": "name-0",\n' +
    ' "description": "description-0",\n' +
    ' "ownerEmail": "email-0@example.com",\n' +
    ' "secretCode": "abc1234",\n' +
    ' "visibility": "PRIVATE",\n' +
    ' "startsOn": 1568883640616,\n' +
    ' "endsOn": 1568887240616,\n' +
    ' "maxDuration": 720000,\n' +
    ' "shuffled": false,\n' +
    ' "requiresAuthentication": false,\n' +
    ' "emailResults": true,\n' +
    ' "hasPrize": false\n' +
    ' },\n' +
    ' {\n' +
    ' "uuid": "05de92a7-6f7c-442c-a6c3-bd97a810002f",\n' +
    ' "name": "name-1",\n' +
    ' "description": "description-1",\n' +
    ' "ownerEmail": "email-1@example.com",\n' +
    ' "secretCode": "abc1234",\n' +
    ' "visibility": "PUBLIC",\n' +
    ' "startsOn": 1568883640617,\n' +
    ' "endsOn": 1568887240617,\n' +
    ' "maxDuration": 360000,\n' +
    ' "shuffled": false,\n' +
    ' "requiresAuthentication": false,\n' +
    ' "emailResults": true,\n' +
    ' "hasPrize": true\n' +
    ' }\n' +
    ' ],\n' +
    ' "status": "OK"\n' +
    '}';

let thcResponse = JSON.parse(thcJSONResponse);
console.log(`Status: ${thcResponse.status}`);
let treasureHunts = thcResponse.treasureHunts;

// Выводим длину массива treasureHunts
console.log(`Length of treasureHunts array: ${treasureHunts.length}`);

// Выводим имена всех treasure hunt через цикл
console.log('Names of treasure hunts:');
treasureHunts.forEach((hunt) => {
    console.log(hunt.name);
});