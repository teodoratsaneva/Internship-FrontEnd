function solve() {
    return function(selector) {
        if (!selector) {
            throw new Error('Element is not exist');
        }

        let element;

        if (typeof selector === "string") {
            element = document.getElementById(selector);
        } else if (selector instanceof Element) {
            element = selector;
        } else {
            throw new Error('Invalid element type');
        }

        let buttons = document.querySelectorAll(".button");

        buttons.forEach(button => {
            button.innerHTML = "hide";
            button.addEventListener('click', handleClick);
        })
    };

    function handleClick(e) {
        let clickedButton = e.target;
        let contentElement = findContent(clickedButton);

        if (contentElement) {
            if (contentElement.style.display === "none") {
                contentElement.style.display = "block";
                clickedButton.innerHTML = "hide";
            } else {
                contentElement.style.display = "none";
                clickedButton.innerHTML = "show";
            }
        }
    }

    function findContent(button) {
        let currentElement = button.previousElementSibling;

        while (currentElement) {
            if (currentElement.classList.contains("content")) {
                let nextButton = currentElement.nextElementSibling;

                if (nextButton && nextButton.classList.contains("button")) {
                    return currentElement;
                } else {
                    return null;
                }
            }

            currentElement = currentElement.previousElementSibling;
        }

        return null;
    }
};