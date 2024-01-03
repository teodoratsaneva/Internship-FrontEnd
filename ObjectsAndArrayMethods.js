//TASK 1
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}

function canFormTriangle(length1, length2, length3) {
    return (length1 + length2 > length3) && (length2 + length3 > length1) && (length3 + length1 > length2);
}

function processInput(input) {
    const point1 = { x: parseFloat(input[0]), y: parseFloat(input[1]) };
    const point2 = { x: parseFloat(input[2]), y: parseFloat(input[3]) };
    const point3 = { x: parseFloat(input[4]), y: parseFloat(input[5]) };
    const point4 = { x: parseFloat(input[6]), y: parseFloat(input[7]) };
    const point5 = { x: parseFloat(input[8]), y: parseFloat(input[9]) };
    const point6 = { x: parseFloat(input[10]), y: parseFloat(input[11]) };

    const length1 = calculateDistance(point1.x, point1.y, point2.x, point2.y).toFixed(2);
    const length2 = calculateDistance(point3.x, point3.y, point4.x, point4.y).toFixed(2);
    const length3 = calculateDistance(point5.x, point5.y, point6.x, point6.y).toFixed(2);

    return canFormTriangle(parseFloat(length1), parseFloat(length2), parseFloat(length3)) ? `${length1}\n${length2}\n${length3}\nTriangle can be formed` :
        `${length1}\n${length2}\n${length3}\nTriangle can't be formed`;
}

const input1 = [
    '5', '6', '7', '8',
    '1', '2', '3', '4',
    '9', '10', '11', '12'
];

console.log(`Sample Test 1\n${processInput(input1)}`);

const input2 = [
    '7', '7', '2', '2',
    '5', '6', '2', '2',
    '95', '-14.5', '0', '-0.123'
];

console.log(`Sample Test 2\n${processInput(input2)}`);

//TASK 2
Array.prototype.remove = function(value) {
    for (let i = this.length - 1; i >= 0; i--) {
        if (this[i] === value) {
            this.splice(i, 1);
        }
    }
};

function removeOccurrences(array) {
    if (array.length > 0) {
        const firstElement = array[0];
        array.remove(firstElement);
    }

    array.forEach(item => console.log(item));
}

const inputArray = ['1', '2', '1', '4', '1', '3', '4', '1', '111', '3', '2', '1', '1'];
removeOccurrences(inputArray);

//TASK 3
function deepCopy(object) {
    if (object === null || typeof object !== 'object') {
        return object;
    }

    const newObject = {};

    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            newObject[key] = deepCopy(object[key]);
        }
    }

    return newObject;
}

const object = {
    name: 'Teddy',
    age: 20,
    address: {
        city: 'Gabrovo',
        country: 'Bulgaria'
    },
    hobbies: ['reading', 'coding']
};

const copiedObject = deepCopy(object);

console.log(object);
console.log(copiedObject);

//TASK 4
function hasProperty(object, property) {
    return object.hasOwnProperty(property);
}

var hasProp = hasProperty(object, 'name');

console.log(hasProp);

//TASK 5
var people = [
    { firstname: 'Gosho', lastname: 'Petrov', age: 32 },
    { firstname: 'Bay', lastname: 'Ivan', age: 81 },
    { firstname: 'John', lastname: 'Doe', age: 42 }
];


function findYoungestPerson(people) {
    for (let i = 1; i < people.length; i++) {
        var youngestPerson = people[0];

        if (youngestPerson.age > people[i].age) {
            youngestPerson = people[i];
        }
    }

    return `${youngestPerson.firstname} ${youngestPerson.lastname}`;
}

console.log(findYoungestPerson(people));

//TASK 6
function group(people) {
    const groupedByAge = {};

    for (let i = 0; i < people.length; i++) {
        const age = people[i].age;

        if (!hasProperty(groupedByAge, age)) {
            groupedByAge[age] = [];
        }

        groupedByAge[age].push(people[i]);
    }

    return groupedByAge;
}

var people = [
    { firstname: 'Gosho', lastname: 'Petrov', age: 32 },
    { firstname: 'Bay', lastname: 'Ivan', age: 81 },
    { firstname: 'John', lastname: 'Doe', age: 42 },
    { firstname: 'Pesho', lastname: 'Pesho', age: 22 },
    { firstname: 'Asdf', lastname: 'Xyz', age: 81 },
    { firstname: 'Gosho', lastname: 'Gosho', age: 22 }
];

var groupedByAge = group(people);
console.log(groupedByAge);

//TASK 7
function createPerson(firstname, lastname, age, isFemale) {
    return {
        firstname: firstname,
        lastname: lastname,
        age: age,
        gender: isFemale ? 'female' : 'male'
    };
}

function createPeople() {
    const people = [];

    const firstnames = ['John', 'Jane', 'Alice', 'Bob', 'Eva', 'Michael', 'Sophia', 'Daniel', 'Olivia', 'David'];
    const lastnames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Lee', 'Taylor', 'Williams', 'Jones', 'Davis', 'Miller'];

    for (let i = 0; i < 10; i++) {
        const firstname = firstnames[i];
        const lastname = lastnames[i];
        const age = Math.floor(Math.random() * 30);
        const isFemale = Math.random() < 0.5;

        const person = createPerson(firstname, lastname, age, isFemale);
        people.push(person);
    }

    return people;
}

const createdPeople = createPeople();
console.log(createdPeople);

//TASK 8
function isAgeOfPeopleGreaterThan18(people) {
    return people.every(person => person.age >= 18);
}

console.log(isAgeOfPeopleGreaterThan18(createdPeople));

//TASK 9
function printUnderagedPersons(people) {
    const underagedPeople = people.filter(person => person.age < 18);

    underagedPeople.forEach(person => {
        console.log(`${person.firstname} ${person.lastname} is underaged with age ${person.age}`);
    });
}

printUnderagedPersons(createdPeople);

//TASK 10   
function findYoungestMale(people) {
    const youngestMale = people
        .filter(person => person.gender === 'male')
        .reduce((prev, current) => (prev.age < current.age ? prev : current), {});

    return youngestMale ? `The youngest male is: ${youngestMale.firstname} ${youngestMale.lastname}` : 'No males found in the given array.';
}

console.log(findYoungestMale(createdPeople));

//TASK 11
function groupPersonsByFirstLetter(people) {
    const groupedByFirstLetter = people.reduce((groups, person) => {
        const firstLetter = person.firstname.charAt(0).toLowerCase();
        groups[firstLetter] = groups[firstLetter] || [];
        groups[firstLetter].push(person);

        return groups;
    }, {});

    return groupedByFirstLetter;
}

console.log(groupPersonsByFirstLetter(createdPeople));