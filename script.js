document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('clear');
    const deleteButton = document.getElementById('del');
    const equalButton = document.getElementById('equal');
    const percentageButton = document.getElementById('percentage');

    let currentInput = '';
    let operator = '';
    let operand1 = '';
    let operand2 = '';

    // Function to update display
    function updateDisplay(value) {
        display.value = value;
    }

    // Handle button clicks
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            if (value === 'pi') {
                currentInput += Math.PI.toFixed(2);
                updateDisplay(currentInput);
            } else if (!isNaN(value) || value === '.') {
                currentInput += value;
                updateDisplay(currentInput);
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    operand1 = currentInput;
                    operator = value;
                    currentInput = '';
                }
            }
        });
    });