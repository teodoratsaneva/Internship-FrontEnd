//TASK 1
const inputArrayTask1 = ['2.5', '-3', '4'];

var a1 = parseFloat(inputArrayTask1[0]);
var b1 = parseFloat(inputArrayTask1[1]);
var c1 = parseFloat(inputArrayTask1[2]);

if (a1 > b1) {
    const temp = a1;
    a1 = b1;
    b1 = temp;
}

console.log(`${a1} ${b1}`);


//TASK 2
const inputArrayTask2 = ['2.5', '-3', '4'];

var a2 = parseFloat(inputArrayTask2[0]);
var b2 = parseFloat(inputArrayTask2[1]);
var c2 = parseFloat(inputArrayTask2[2]);

let productSign;

if (a2 === 0 || b2 === 0 || c2 === 0) {
    productSign = '0';
} else if ((a2 < 0 && b2 < 0 && c2 < 0) || (a2 > 0 && b2 > 0 && c > 0)) {
    productSign = '+';
} else {
    productSign = '-';
}

console.log(productSign);

//TASK 3
const inputArrayTask3 = ['5', '2.3', '-1'];

var a3 = parseFloat(inputArrayTask3[0]);
var b3 = parseFloat(inputArrayTask3[1]);
var c3 = parseFloat(inputArrayTask3[2]);

function findTheBiggestOfThree(a3, b3, c3) {
    const biggestNumberTask3 = (a3 >= b3) ? ((a3 >= c3) ? a3 : c3) : ((b3 >= c3) ? b3 : c3);

    return biggestNumberTask3;
}

console.log(findTheBiggestOfThree(a3, b3, c3));

//TASK 4
const inputArrayTask4 = ['5', '2.3', '-1'];

var a4 = parseFloat(inputArrayTask4[0]);
var b4 = parseFloat(inputArrayTask4[1]);
var c4 = parseFloat(inputArrayTask4[2]);

let first, second, third;

first = findTheBiggestOfThree(a4, b4, c4);

if (a4 === first) {
    second = findTheBiggestOfThree(b4, c4);

    if (b4 === second) {
        third = c4;
    } else {
        third = b4;
    }
} else if (b4 === first) {
    second = findTheBiggestOfThree(a4, c4);

    if (a4 === second) {
        third = c4;
    } else {
        third = a4;
    }
} else {
    second = findTheBiggestOfThree(a4, b4);

    if (b4 === second) {
        third = c4;
    } else {
        third = b4;
    }
}

console.log(`${first} ${second} ${third}`);


//TASK 5
const inputArrayTask5 = ['3'];

const inputStringTask5 = inputArrayTask5[0];

var digit = parseInt(inputStringTask5);

switch (digit) {
    case 0:
        console.log('zero');
        break;
    case 1:
        console.log('one');
        break;
    case 2:
        console.log('two');
        break;
    case 3:
        console.log('three');
        break;
    case 4:
        console.log('four');
        break;
    case 5:
        console.log('five');
        break;
    case 6:
        console.log('six');
        break;
    case 7:
        console.log('seven');
        break;
    case 8:
        console.log('eight');
        break;
    case 9:
        console.log('nine');
        break;
    default:
        console.log('not a digit');
        break;
}

//TASK 6
const inputArrayTask6 = ['1', '-3', '2'];

var a6 = parseFloat(inputArrayTask6[0]);
var b6 = parseFloat(inputArrayTask6[1]);
var c6 = parseFloat(inputArrayTask6[2]);

var discriminant = b6 * b6 - 4 * a6 * c6;

let root1, root2;

if (discriminant > 0) {
    root1 = (-b6 + Math.sqrt(discriminant)) / (2 * a6);
    root2 = (-b6 - Math.sqrt(discriminant)) / (2 * a6);
    console.log(`${root1.toFixed(2)} ${root2.toFixed(2)}`);
} else if (discriminant === 0) {
    root1 = -b6 / (2 * a6);
    console.log(root1.toFixed(2));
} else {
    console.log('no real roots');
}

//TASK 7
const inputArrayTask7 = ['5', '2.3', '-1', '10', '7'];

var a7 = parseFloat(inputArrayTask7[0]);
var b7 = parseFloat(inputArrayTask7[1]);
var c7 = parseFloat(inputArrayTask7[2]);
var d7 = parseFloat(inputArrayTask7[3]);
var e7 = parseFloat(inputArrayTask7[4]);

let biggestNumberTask7;

biggestNumberTask7 = findTheBiggestOfThree(a7, b7, c7);
biggestNumberTask7 = findTheBiggestOfThree(biggestNumberTask7, d7, e7);
console.log(biggestNumberTask7);


//TASK 8
const inputArrayTask8 = ['356'];

const inputStringTask8 = inputArrayTask8[0];

var number = parseInt(inputStringTask8, 10);

function convertToWords(num) {
    const units = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (num < 10) {
        return units[num];
    } else if (num < 20) {
        return teens[num - 11];
    } else if (num < 100) {
        const tenDigit = Math.floor(num / 10);
        const unitDigit = num % 10;
        return `${tens[tenDigit - 1]}${unitDigit !== 0 ? ' ' + units[unitDigit] : ''}`;
    } else {
        const hundredDigit = Math.floor(num / 100);
        const remainder = num % 100;

        return remainder === 0 ? `${units[hundredDigit]} Hundred` : `${units[hundredDigit]} Hundred and ${convertToWords(remainder)}`;
    }
}

const result = convertToWords(number);

console.log(result);