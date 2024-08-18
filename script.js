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
    eqButtonOFF();

    // Function to update display
    function updateDisplay(value) {
        display.value = value;
        console.log("Display updated: ", value);  // Debugging output
    }

    // Button clicks
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            console.log("Button clicked: ", value);  // Debugging output

            if (value === 'pi') {
                currentInput += Math.PI.toFixed(2);
                updateDisplay(currentInput);
            } else if (!isNaN(value) || value === '.') {
                currentInput += value;
                updateDisplay(currentInput);
                if (operator) {
                    operand2=currentInput;
                    eqButtonON();
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    operand1 = currentInput;
                    operator = value;
                    currentInput = '';
                    eqButtonOFF();
                }
            }
        });
    });

    //equal button
    equalButton.addEventListener('click', function () {
        operand2 = currentInput;
        console.log("Operands and operator: ", operand1, operand2, operator);  // Debugging output
        eqButtonOFF();
        

        let result = '';
        
        if (operand1 && operand2 && operator) {

            switch (operator) {
                case '+':
                    
                    result = parseFloat(operand1) + parseFloat(operand2);
                    break;
                case '-':
                    result = parseFloat(operand1) - parseFloat(operand2);
                    break;
                case '*':
                    result = parseFloat(operand1) * parseFloat(operand2);
                    break;
                case '/':
                    if (operand2 !== '0') {
                        result = parseFloat(operand1) / parseFloat(operand2);
                    } else {
                        result = 'Error';
                    }
                    break;
            }
            updateDisplay(result);
            currentInput = result.toString(); // Update currentInput with the result for further calculations
            operator = '';
            operand1 = '';
            operand2 = '';

        }
    });

    //allclear button
    clearButton.addEventListener('click', function () {
        console.log("Clear button clicked");  // Debugging output
        currentInput = '';
        operator = '';
        operand1 = '';
        operand2 = '';
        updateDisplay('');
    });

    //delete button
    deleteButton.addEventListener('click', function () {
        console.log("Delete button clicked");
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -5);
            updateDisplay(currentInput);
        }
    });

    //percentage button
    percentageButton.addEventListener('click', function () {
        console.log("Percentage button clicked");
        if (currentInput) {
            currentInput = (parseFloat(currentInput) / 100).toFixed(15);
            updateDisplay(currentInput);
        }
    });

    // EQUALS BUTTON ON
    function eqButtonON() {
        equalButton.disabled = false;
    }
    // EQUALS BUTTON OFF
    function eqButtonOFF() {
        equalButton.disabled = true;
    }
    




    
});