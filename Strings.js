//TASK 1
function reverseString(string) {
    var splitString = string.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("");

    return joinArray;
}

console.log(reverseString("hello"));

//TASK 2
function isCorrectBrackets(string) {
    var countBrackets = 0;

    for (var i = 0; i < string.length; i++) {
        if (string[i] === '(') {
            countBrackets++;
        } else if (string[i] === ')') {
            countBrackets--;
        }
    }

    return countBrackets === 0;
}

console.log(isCorrectBrackets("(hello)"));

//TASK 3
function countInstances(string, word) {
    const newString = string.toLowerCase();
    const newWord = word.toLowerCase();

    return newString.split(newWord).length - 1;
}
console.log(countInstances('We are living in an yellow submarine. We don\'t have anything else. inside the submarine is very tight. So we are drinking all the day. We will move out of it in 5 days.', 'in'));

//TASK 4
function processText(string) {
    const upcaseRegex = /<upcase>(.*?)<\/upcase>/g;
    const lowcaseRegex = /<lowcase>(.*?)<\/lowcase>/g;
    const orgcaseRegex = /<orgcase>(.*?)<\/orgcase>/g;

    const processedString = string.replace(upcaseRegex, (_, match) => match.toUpperCase())
        .replace(lowcaseRegex, (_, match) => match.toLowerCase())
        .replace(orgcaseRegex, (_, match) => match);

    return processedString;
}

console.log(processText("We are <orgcase>liViNg</orgcase> in a <upcase>yellow submarine</upcase>. We <orgcase>doN\'t</orgcase> have <lowcase>anYTHING</lowcase> else."));


//TASK 5
function replaceSpacesWithNbsp(string) {
    var newString = string.replace(/ /g, '&nbsp;');

    return newString;
}

console.log(replaceSpacesWithNbsp("This text contains 4 spaces!!"));

//TASK 6
function extractHtmlContent(input) {
    const htmlText = input.join('');
    const regex = /<[^>]*>([^<]*)<\/[^>]*>/g;
    const extractedContent = htmlText.replace(regex, (_, content) => content.trim());

    return extractedContent;
}

const input = [
    '<html>',
    '  <head>',
    '    <title>Sample site</title>',
    '  </head>',
    '  <body>',
    '    <div>text',
    '      <div>more text</div>',
    '      and more...',
    '    </div>',
    '    in body',
    '  </body>',
    '</html>'
];

console.log(extractHtmlContent(input));

//TASK 7
function parseUrl(url) {
    const regex = /^(.*?):\/\/(.*?)(\/.*)$/;

    const match = url.match(regex);

    if (match) {
        const protocol = match[1];
        const server = match[2];
        const resource = match[3];

        console.log(`protocol: ${protocol}`);
        console.log(`server: ${server}`);
        console.log(`resource: ${resource}`);
    } else {
        console.log('Invalid URL format');
    }
}

parseUrl("http://telerikacademy.com/Courses/Courses/Details/239");

//TASK 8
function replaceATags(htmlString) {
    const regex = /<a\s+href="([^"]+)">([^<]+)<\/a>/g;
    const replacedString = htmlString.replace(regex, '[$2]($1)');

    return replacedString;
}

const inputTask8 = [
    '<p>Please visit <a href="http://academy.telerik.com">our site</a> to choose a training course. Also visit <a href="www.devbg.org">our forum</a> to discuss the courses.</p>'
];

console.log(replaceATags(inputTask8[0]));


//TASK 9
function extractEmails(text) {
    const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = text.match(regex);

    return emails;
}

const text = "Hello, my email is tedy@gmail.com and also you can faind me on info@gmail.com";
console.log(extractEmails(text));

//TASK 10
function findPalindromes(string) {
    const newString = reverseString(string);

    return string === newString;
}

console.log(findPalindromes("ABABBA"));

//TASK 11
function stringFormat(format, ...args) {
    return format.replace(/{(\d+)}/g, (match, index) => {
        return typeof args[index] !== 'undefined' ? args[index] : match;
    });
}

var str1 = stringFormat('Hello {0}!', 'Peter');
console.log(str1);

var format = '{0}, {1}, {0} text {2}';
var str2 = stringFormat(format, 1, 'Pesho', 'Gosho');
console.log(str2);