//TASK 1
const inputArray1 = ['2.5', '-3', '4'];

var a1 = parseFloat(inputArray1[0]);
var b1 = parseFloat(inputArray1[1]);
var c1 = parseFloat(inputArray1[2]);

if (a1 > b1) {
  const temp = a1;
  a1 = b1;
  b1 = temp;
}

console.log(`${a1} ${b1}`);


//TASK 2
const inputArray2 = ['2.5', '-3', '4'];

var a2 = parseFloat(inputArray2[0]);
var b2 = parseFloat(inputArray2[1]);
var c2 = parseFloat(inputArray2[2]);

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
const inputArray3 = ['5', '2.3', '-1'];

var a3 = parseFloat(inputArray3[0]);
var b3 = parseFloat(inputArray3[1]);
var c3 = parseFloat(inputArray3[2]);

let biggestNumber3;

if (a3 >= b3) {
  if (a3 >= c3) {
    biggestNumber3 = a3;
  } else {
    biggestNumber3 = c3;
  }
} else {
  if (b3 >= c3) {
    biggestNumber3 = b3;
  } else {
    biggestNumber3 = c3;
  }
}

console.log(biggestNumber3);

//TASK 4
const inputArray4 = ['5', '2.3', '-1'];

var a4 = parseFloat(inputArray4[0]);
var b4 = parseFloat(inputArray4[1]);
var c4 = parseFloat(inputArray4[2]);

let first, second, third;

if (a4 >= b4) {
  if (b4 >= c4) {
    first = a4;
    second = b4;
    third = c4;
  } else if (a4 >= c4) {
    first = a4;
    second = c4;
    third = b4;
  } else {
    first = c4;
    second = a4;
    third = b4;
  }
} else {
  if (a4 >= c4) {
    first = b4;
    second = a4;
    third = c4;
  } else if (b4 >= c4) {
    first = b4;
    second = c4;
    third = a4;
  } else {
    first = c4;
    second = b4;
    third = a4;
  }
}

console.log(`${first} ${second} ${third}`);


//TASK 5
const inputArray5 = ['3'];

const inputString5 = inputArray5[0];

var digit = parseInt(inputString5);

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
const inputArray6 = ['1', '-3', '2'];

var a6 = parseFloat(inputArray6[0]);
var b6 = parseFloat(inputArray6[1]);
var c6 = parseFloat(inputArray6[2]);

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
const inputArray7 = ['5', '2.3', '-1', '10', '7'];

var a7 = parseFloat(inputArray7[0]);
var b7 = parseFloat(inputArray7[1]);
var c7 = parseFloat(inputArray7[2]);
var d7 = parseFloat(inputArray7[3]);
var e7 = parseFloat(inputArray7[4]);

let biggestNumber7;

if (a7 >= b7) {
  if (a7 >= c7) {
    if (a7 >= d7) {
      if (a7 >= e7) {
        biggestNumber7 = a7;
      } else {
        biggestNumber7 = e7;
      }
    } else {
      if (d7 >= e7) {
        biggestNumber7 = d7;
      } else {
        biggestNumber7 = e7;
      }
    }
  } else {
    if (c7 >= d7) {
      if (c7 >= e7) {
        biggestNumber7 = c7;
      } else {
        biggestNumber7 = e7;
      }
    } else {
      if (d >= e) {
        biggestNumber7 = d7;
      } else {
        biggestNumber7 = e7;
      }
    }
  }
} else {
  if (b7 >= c7) {
    if (b7 >= d7) {
      if (b7 >= e7) {
        biggestNumber7 = b7;
      } else {
        biggestNumber7 = e7;
      }
    } else {
      if (d >= e) {
        biggestNumber7 = d7;
      } else {
        biggestNumber7 = e7;
      }
    }
  } else {
    if (c7 >= d7) {
      if (c7 >= e7) {
        biggestNumber7 = c7;
      } else {
        biggestNumber7 = e7;
      }
    } else {
      if (d7 >= e7) {
        biggestNumber7 = d7;
      } else {
        biggestNumber7 = e7;
      }
    }
  }
}

console.log(biggestNumber7);


//TASK 8
const inputArray8 = ['356'];

const inputString8 = inputArray8[0];

var number = parseInt(inputString8, 10);

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
    if (remainder === 0) {
      return `${units[hundredDigit]} Hundred`;
    } else {
      return `${units[hundredDigit]} Hundred and ${convertToWords(remainder)}`;
    }
  }
}

const result = convertToWords(number);

console.log(result);
