//TASK 1
function printNumbersUpToN(arr) {
    const n = parseInt(arr[0], 10);

    if (Number.isInteger(n) && n > 0) {
        for (let i = 1; i <= n; i++) {
            process.stdout.write(i + ' ');
        }
        process.stdout.write('\n');
    } else {
        console.log('Invalid input. Please provide a valid positive integer.');
    }
}

const inputArray = ['5'];
printNumbersUpToN(inputArray);

//TASK 2
function analyzeNumbers(numbers) {
    const floatNumbers = numbers.map(parseFloat);

    const min = Math.min(...floatNumbers);
    const max = Math.max(...floatNumbers);
    const sum = floatNumbers.reduce((acc, num) => acc + num, 0);
    const avg = sum / floatNumbers.length;

    const formattedMin = min.toFixed(2);
    const formattedMax = max.toFixed(2);
    const formattedSum = sum.toFixed(2);
    const formattedAvg = avg.toFixed(2);

    const output = "min=${formattedMin}\nmax=${formattedMax}\nsum=${formattedSum}\navg=${formattedAvg}';

    return output;
}

const numbersArray = ["3.5", "6", "1.2", "8.7"];
const result = analyzeNumbers(numbersArray);
console.log(result);


//TASK 3
function printMatrix(n) {
    n = parseInt(n);

    for (let i = 1; i <= n; i++) {
        let row = '';
        for (let j = i; j < i + n; j++) {
            row += j + ' ';
        }
        console.log(row.trim());
    }
}

printMatrix("5");


//TASK 5
function hexToDecimal(hexNumber) {
    const hexDigits = '0123456789ABCDEF';
    let decimalResult = 0;

    for (let i = 0; i < hexNumber.length; i++) {
        const currentDigit = hexDigits.indexOf(hexNumber[i].toUpperCase());
        if (currentDigit === -1) {
            return 'Invalid hexadecimal number';
        }

        decimalResult = decimalResult * 16 + currentDigit;
    }

    return decimalResult.toString();
}

const hexNumber = "123abc";
const hexNumber2 = "7b2";

const decimal = hexToDecimal(hexNumber);
const decimal2 = hexToDecimal(hexNumber2);

console.log(decimal);
console.log(decimal2);