class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
    }

    get first() {
        return this.head.data;
    }

    get last() {
        let current = this.head;

        while (current && current.next) {
            current = current.next;
        }

        return current ? current.data : null;
    }

    get listLength() {
        return this.length;
    }

    append(...data) {
        for (const el of data) {
            const node = {
                data: el,
                next: null
            };

            if (this.head === null) {
                this.head = node;
            } else {
                let current = this.head;

                while (current && current.next) {
                    current = current.next;
                }

                current.next = node;
            }

            this.length++;
        }

        return this;
    }

    prepend(...data) {
        const newNodes = data.map(el => ({
            data: el,
            next: this.head
        }));

        if (newNodes.length > 0) {
            this.head = newNodes[0];
            this.length += newNodes.length;

            if (this.tail === null) {
                this.tail = newNodes[newNodes.length - 1];
            }
        }

        return this;
    }

    *
    [Symbol.iterator]() {
        let current = this.head;

        while (current) {
            yield current.data;

            current = current.next;
        }
    }


    toArray() {
        let array = [];
        let i = 0;

        for (const value of list) {
            array[i] = value;
            i++;
        }

        return array;
    }

    toString() {
        let string = "";
        let i = 0;

        for (const value of this) {
            string += value;

            if (i < this.length - 1) {
                string += " -> ";
            }

            i++;
        }

        return string;
    }
}

const list = new LinkedList();
list.append(1, 2, 3).prepend(0);

for (const value of list) {
    console.log(value);
}

console.log("First:", list.first);
console.log("Last:", list.last);
console.log("Length:", list.length);

const array = list.toArray();

console.log(array);
console.log(array instanceof Array);

console.log(list.toString());