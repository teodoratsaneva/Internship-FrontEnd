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

    // append(...data) {
    //     this.insertAt(this.length, ...data);

    //     return this;
    // }


    // prepend(...data) {
    //     this.insertAt(0, ...data);

    //     return this;
    // }

    // insertAt(index, ...data) {
    //     for (const el of data) {
    //         const node = {
    //             data: el,
    //             next: null
    //         };

    //         if (!this.head) {
    //             this.head = node;
    //             this.length++;
    //             index++;
    //             continue;
    //         }

    //         let current = this.head;

    //         while (current) {
    //             if (index == 0) {
    //                 node.next = current.next;
    //                 current = node;
    //             } else if (index == 1) {
    //                 node.next = current.next;
    //                 current.next = node;
    //                 this.length++;
    //                 index++;
    //                 break;
    //             } else {
    //                 current = current.next;
    //             }

    //             index--;
    //         }
    //     }

    //     return this;
    // }

    append(...data) {
        this.insertAt(this.length, ...data);
        return this;
    }

    prepend(...data) {
        this.insertAt(0, ...data);
        return this;
    }

    insertAt(index, ...data) {
        for (const el of data) {
            const node = {
                data: el,
                next: null
            };

            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                let current = this.head;

                while (current && index > 1) {
                    current = current.next;
                    index--;
                }

                if (current) {
                    node.next = current.next;
                    current.next = node;
                }
            }

            this.length++;
            index++;
        }

        return this;
    }


    at(index) {
        let current = this.head;

        while (current.next) {
            if (index == 1) {
                return current.data;
            } else {
                current = current.next;
                index--;
            }
        }
    }

    removeAt(index) {
        let removed;

        if (index === 0) {
            removed = this.head.data;
            this.head = this.head.next;
        } else {
            let current = this.head;

            while (current && index > 1) {
                current = current.next;
                index--;
            }

            if (current && current.next) {
                removed = current.next.data;
                current.next = current.next.next;
            }
        }

        this.length--;

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

        for (const value of this) {
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
list.append(4, 5, 6).prepend(1, 2, 3);

const list2 = new LinkedList();
list2.append(1, 4, 5).insertAt(1, 8, 9);

list2.removeAt(1);

for (const value of list2) {
    console.log(value);
}

console.log(list2.at(3));

console.log("First:", list.first);
console.log("Last:", list.last);
console.log("Length:", list.length);

const array = list.toArray();

console.log(array);
console.log(array instanceof Array);

console.log(list.toString());