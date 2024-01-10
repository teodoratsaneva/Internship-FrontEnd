const minTitleLength = 2;
const maxTitleLength = 100;
const minBookLength = 1;

function solve() {
    var library = (function() {
        var books = [];
        var categories = [];

        function validateInputLength(input, minLength, maxLength, paramName) {
            if (input.length < minLength || input.length > maxLength) {
                throw new Error(`${paramName} must be between ${minLength} and ${maxLength} characters.`);
            }
        }

        function validateISBN(isbn) {
            if (!/^\d{10}$|^\d{13}$/.test(isbn)) {
                throw new Error("Invalid ISBN. It must be 10 or 13 digits.");
            }
        }

        function findCategoryByName(categoryName) {
            return categories.find(category => category.name === categoryName);
        }

        function findBookByTitle(title) {
            return books.find(book => book.title === title);
        }

        function addCategory(categoryName) {
            validateInputLength(categoryName, minTitleLenght, maxTitleLenght, "Category name");

            var category = {
                ID: categories.length + 1,
                name: categoryName
            };

            categories.push(category);

            return category;
        }

        function addBook(title, author, isbn, categoryName) {
            validateInputLength(title, minTitleLength, maxTitleLength, "Book title");
            validateInputLength(author, minBookLength, Infinity, "Author");
            validateISBN(isbn);

            var existingBook = findBookByTitle(title);

            if (existingBook) {
                throw new Error("Book with this title already exists.");
            }

            var category = findCategoryByName(categoryName) || addCategory(categoryName);

            var book = {
                ID: books.length + 1,
                title: title,
                author: author,
                ISBN: isbn,
                category: category
            };

            books.push(book);

            return book;
        }

        function listBooks() {
            return books;
        }

        function listCategories() {
            return categories;
        }

        return {
            books: {
                list: listBooks,
                add: addBook
            },
            categories: {
                list: listCategories
            }
        };
    }());

    return library;
}

module.exports = solve;