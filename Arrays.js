const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//TASK 1
function inicializeArray(N) {
    let array = new Array(N);

    for (let i = 0; i < N; ++i) {
        array[i] = i * 5;
    }

    return array;
}

function printArray(array) {
    array.forEach(element => {
        console.log(element);
    });
}

rl.question("Enter N: ", (N) => {
    let array = inicializeArray(parseInt(N));
    printArray(array);
    rl.close();
})

//TASK 2
function compareArrays(array1, array2) {
    if (array1.length < array2.length) {
        return "<";
    } else if (array1.length > array2.length) {
        return ">";
    } else {
        return "=";
    }
}

rl.question("Enter first array: ", (array) => {
    rl.question("Enter second array: ", (array2) => {
        const result = compareArrays(array, array2);
        console.log(result);
        rl.close();
    })
})

//TASK 3
function maxSequence(array) {
    let currLength = 1;
    let maxLength = 1;

    for (let i = 0; i < array.length; i++) {
        if (array[i] === array[i - 1]) {
            currLength++;
        } else {
            maxLength = Math.max(maxLength, currLength);
            currLength = 1;
        }
    }

    maxLength = Math.max(maxLength, currLength);

    return maxLength;
}

let array = [];

rl.question("Enter N: ", (N) => {
    let count = 0;

    function askForElement() {
        rl.question(`Enter element ${count + 1}: `, (element) => {
            array.push(parseInt(element));
            count++;

            if (count === parseInt(N)) {
                const maxLength = maxSequence(array);
                console.log(`Length of the maximal sequence: ${maxLength}`);
                rl.close();
            } else {
                askForElement();
            }
        });
    }

    askForElement();
});

//TASK 4
function maxIncreasingSeq(array) {
    let currLength = 1;
    let maxLength = 1;

    for (let i = 0; i < array.length; i++) {
        if (array[i] > array[i - 1]) {
            currLength++;
        } else {
            maxLength = Math.max(maxLength, currLength);
            currLength = 1;
        }
    }

    maxLength = Math.max(maxLength, currLength);
    return maxLength;
}

let arrayTask4 = [];

rl.question("Enter N: ", (N) => {
    let count = 0;

    function askForElement() {
        rl.question(`Enter element ${count + 1}: `, (element) => {
            arrayTask4.push(parseInt(element));
            count++;

            if (count === parseInt(N)) {
                const maxLength = maxIncreasingSeq(arrayTask4);
                console.log(`Length of the maximal sequence: ${maxLength}`);
                rl.close();
            } else {
                askForElement();
            }
        });
    }

    askForElement();
});

//TASK 5
function selectionSort(array) {
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        const temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }

    return array;
}

let arrayTask5 = [];

rl.question("Enter N: ", (N) => {
    let count = 0;

    function askForElement() {
        rl.question(`Enter element ${count + 1}: `, (element) => {
            arrayTask5.push(parseInt(element));
            count++;

            if (count === parseInt(N)) {
                const sortedArray = selectionSort(arrayTask5);
                sortedArray.forEach((num) => {
                    console.log(num);
                });
                rl.close();
            } else {
                askForElement();
            }
        });
    }

    askForElement();
});

//TASK 6
function findMostFrequentNumber(array) {
    let mostFrequentNumber;
    let maxFrequency = 0;
    let currentNumber;
    let currentFrequency = 0;

    array = selectionSort(array);

    for (let i = 0; i < array.length; i++) {
        if (array[i] !== currentNumber) {
            if (currentFrequency > maxFrequency) {
                mostFrequentNumber = currentNumber;
                maxFrequency = currentFrequency;
            }
            currentNumber = array[i];
            currentFrequency = 1;
        } else {
            currentFrequency++;
        }
    }

    if (currentFrequency > maxFrequency) {
        mostFrequentNumber = currentNumber;
        maxFrequency = currentFrequency;
    }

    return { mostFrequentNumber, maxFrequency };
}

let arrayTask6 = [];

rl.question("Enter N: ", (N) => {
    let count = 0;

    function askForElement() {
        rl.question(`Enter element ${count + 1}: `, (element) => {
            arrayTask6.push(parseInt(element));
            count++;

            if (count === parseInt(N)) {
                const { mostFrequentNumber, maxFrequency } = findMostFrequentNumber(arrayTask6);
                console.log(`${mostFrequentNumber} (${maxFrequency} times)`);
                rl.close();
            } else {
                askForElement();
            }
        });
    }

    askForElement();
});

//TASK 7
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}

let arrayTask7 = [];
let target;

rl.question("Enter N: ", (N) => {
    let count = 0;

    function askForElement() {
        rl7.question(`Enter element ${count + 1}: `, (element) => {
            arrayTask7.push(parseInt(element));
            count++;

            if (count === parseInt(N)) {
                rl.question("Enter X: ", (X) => {
                    target = parseInt(X);
                    const index = binarySearch(arrayTask7, target);
                    console.log(index);
                    rl.close();
                });
            } else {
                askForElement();
            }
        });
    }

    askForElement();
});


//TASK 8
function hasSubsetWithSum(array, sum) {
    const isSubsetSumPossible = [];

    for (let i = 0; i <= array.length; i++) {
        isSubsetSumPossible[i] = [];
        isSubsetSumPossible[i][0] = true;
    }

    for (let i = 1; i <= array.length; i++) {
        for (let j = 1; j <= sum; j++) {
            if (array[i - 1] <= j) {
                isSubsetSumPossible[i][j] = isSubsetSumPossible[i - 1][j] || isSubsetSumPossible[i - 1][j - array[i - 1]];
            } else {
                isSubsetSumPossible[i][j] = isSubsetSumPossible[i - 1][j];
            }
        }
    }

    return isSubsetSumPossible[array.length][S];
}

const arrayTask8 = [2, 1, 2, 4, 3, 5, 2, 6];
const sumToFind = 14;

const result = hasSubsetWithSum(arrayTask8, sumToFind);

if (result) {
    console.log('Yes');
} else {
    console.log('No');
}

//TAST 9
function isPrimeNumber(N) {
    const isPrime = new Array(N + 1);
    isPrime.fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i = 2; i <= Math.sqrt(N); i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= N; j += i) {
                isPrime[j] = false;
            }
        }
    }

    return isPrime;
}

function findLargestPrime(N) {
    const primes = isPrimeNumber(parseInt(N));

    for (let i = N; i >= 2; i--) {
        if (primes[i]) {
            return i;
        }
    }

    return -1;
}

rl.question("Enter N: ", (N) => {
    const largestPrime = findLargestPrime(N);
    console.log(largestPrime);
    rl.close();
});


//TASK 10
function sumArray(array) {
    let sum = 0;

    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }

    return sum;
}
let arrayTask10 = [];

rl.question("Enter N: ", (N) => {
    let count = 0;

    function askForElement() {
        rl.question(`Enter element ${count + 1}: `, (element) => {
            arrayTask10.push(parseInt(element));
            count++;

            if (count === parseInt(N)) {
                const sum = sumArray(array11);
                console.log(sum);
                rl.close();
            } else {
                askForElement();
            }
        });
    }

    askForElement();
});