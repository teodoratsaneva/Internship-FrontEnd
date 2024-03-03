function solve() {
    return function(element, contents) {
        if (!element || !contents) {
            throw new Error('Both element and contents must be provided');
        }

        let targetElement;

        if (typeof element === "string") {
            targetElement = document.getElementById(element);
        } else if (element instanceof Element) {
            targetElement = element;
        } else {
            throw new Error('Invalid element type');
        }

        contents.forEach(content => {
            if (typeof content !== "number" && typeof content !== "string") {
                throw new Error("Invalid content type");
            }

            const divElement = document.createElement("div");
            const divText = document.createTextNode(content);
            divElement.appendChild(divText);
            targetElement.appendChild(divElement);
        });
    };
}