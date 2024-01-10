//TASK 5 
function countLargerThanNeighbors(arr) {
    let count = 0;

    for (let i = 1; i < arr.length - 1; i++) {
        if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
            count++;
        }
    }

    return count;
}

//TASK 6
function indexOfFirstLargerThanNeighbors(array) {
    for (let i = 1; i < array.length - 1; i++) {
        if (array[i] > array[i - 1] && array[i] > array[i + 1]) {
            return i;
        }
    }

    return -1;
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let array = [];

rl.question("Enter N: ", (N) => {
    let count = 0;

    function askForElement() {
        rl.question(`Enter element ${count + 1}: `, (element) => {
            array.push(parseInt(element));
            count++;

            if (count === parseInt(N)) {
                const count = countLargerThanNeighbors(array);
                const index = indexOfFirstLargerThanNeighbors(array);
                console.log(count);
                console.log(index);
                rl.close();
            } else {
                askForElement();
            }
        });
    }

    askForElement();
});