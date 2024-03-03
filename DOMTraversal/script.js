function solve() {
    return function() {
        var asideElement = document.querySelector('aside');

        var nonSpecialAnchorChildren = Array.from(asideElement.children).filter(child => {
            return !child.classList.contains('special-anchor');
        });

        nonSpecialAnchorChildren.forEach(child => {
            console.log(child.innerText);
        });

        var specialAnchorElements = document.querySelectorAll('.special-anchor');

        specialAnchorElements.forEach(element => {
            console.log(element.innerText);
        });

        var redBackgroundElements = document.querySelectorAll('[style="background-color: red;"]');

        redBackgroundElements.forEach(element => {
            console.log(element.innerText);
        });

        var mainElement = document.getElementById('main-element-id');

        var specialAnchorChildren = Array.from(mainElement.querySelectorAll('a.special-anchor')).filter(child => {
            return child.style.backgroundColor !== 'red';
        });

        specialAnchorChildren.forEach(child => {
            console.log(child.innerText);
        });
    };
}