const output = document.querySelector('.output');
const history = document.querySelector('.history');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        if (!isNaN(value) || value === '.') {
            handleNumber(value);
        } else if (value === 'AC') {
            clearAll();
        } else if (value === 'DEL') {
            deleteLast();
        } else if (value === '=') {
            calculate();
        } else {
            handleOperator(value);
        }
        updateDisplay();
    });
});

function handleNumber(value) {
    if (value === '.' && currentInput.includes('.')) return;
    currentInput += value;
}

function handleOperator(value) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = value;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operator = '';
    previousInput = '';
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = '';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
}

function updateDisplay() {
    output.textContent = currentInput;
    if (operator !== '') {
        history.textContent = `${previousInput} ${operator}`;
    } else {
        history.textContent = '';
    }
}
