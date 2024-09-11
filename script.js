const rgbDisplay = document.getElementById('rgbDisplay');
const colorDivs = document.querySelectorAll('.color');
const messageDisplay = document.getElementById('message');
const newColorsButton = document.getElementById('newColors');
const easyBtn = document.getElementById('easyBtn');
const hardBtn = document.getElementById('hardBtn');
let numColors = 6;
let colors = [];
let pickedColor;

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomColors(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function pickColor() {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function reset() {
    colors = generateRandomColors(numColors);
    pickedColor = pickColor();
    rgbDisplay.textContent = pickedColor;
    colorDivs.forEach((div, index) => {
        if (colors[index]) {
            div.style.display = 'block';
            div.style.backgroundColor = colors[index];
        } else {
            div.style.display = 'none';
        }
        div.addEventListener('click', function() {
            const clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = 'Riktig!';
                changeColors(clickedColor);
            } else {
                this.style.backgroundColor = '#f5f5f5';
                messageDisplay.textContent = 'Prøv igjen';
            }
        });
    });
    messageDisplay.textContent = '';
}

function changeColors(color) {
    colorDivs.forEach(div => {
        div.style.backgroundColor = color;
    });
}

newColorsButton.addEventListener('click', function() {
    reset();
});

easyBtn.addEventListener('click', function() {
    numColors = 3;
    easyBtn.classList.add('selected');
    hardBtn.classList.remove('selected');
    reset();
});

hardBtn.addEventListener('click', function() {
    numColors = 6;
    hardBtn.classList.add('selected');
    easyBtn.classList.remove('selected');
    reset();
});

reset();