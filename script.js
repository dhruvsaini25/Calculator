document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('clear');
    const deleteButton = document.getElementById('del');
    const equalButton = document.getElementById('equal');
    const percentageButton = document.getElementById('percentage');
    const minButton = document.querySelectorAll('btnminus');
    const opButtons = document.getElementById('btn operators');
    const periodButtons = document.getElementById('btnperiod');



    let currentInput = '';
    let operator = '';
    let operand1 = '';
    let operand2 = '';
    let isNegativeAllowed = true;
    eqButtonOFF();
    minButtonON();
    percentageButtonOFF();
    // opButtonsOFF();

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
                percentageButtonON();
            } else if (!isNaN(value) || value === '.') {
                currentInput += value;
                updateDisplay(currentInput);
                if (!operator) {
                    operand1=currentInput;
                    percentageButtonON();
                } else {
                    operand2=currentInput;
                    eqButtonON();
                    percentageButtonON();
                }
                isNegativeAllowed=false; //disable negative sign input after number
            } else if (value === '-' && isNegativeAllowed) {
                currentInput += value;
                updateDisplay(currentInput);
                isNegativeAllowed = false; //disable consecutive negative signs
                
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (operand1 && operand2 && operator) {
                    performOperation();

                }

                if (currentInput) {
                    operator = value;
                    currentInput = '';
                    eqButtonOFF();
                    delButtonOFF();
                    isNegativeAllowed=true; //allow negative number after operator
                    console.log(operator);
                }
                
            }
        });
    });

    //equal button
    equalButton.addEventListener('click', function () {
        // operand2 = currentInput;
        if (operand1 && operand2 && operator) {
            performOperation();
            eqButtonOFF();
        }
    });
    function performOperation() {
        operand1=parseFloat(operand1);
        operand2=parseFloat(operand2);

        switch (operator) {
            case '+':
                operand1 += operand2;
                break;
            case '-':
                operand1 -= operand2;
                break;
            case '*':
                operand1 *= operand2;
                break;
            case '/':
                operand1 = operand2 !== 0 ? operand1 / operand2 : 'Error';
                break;
        }
        operand2='';
        updateDisplay(operand1);
    }

    //allclear button
    clearButton.addEventListener('click', function () {
        console.log("Clear button clicked");  // Debugging output
        currentInput = '';
        operator = '';
        operand1 = '';
        operand2 = '';
        updateDisplay('');
        isNegativeAllowed = true;
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

    // MINUS BUTTON ON
    function minButtonON() {
        minButton.disabled = false;
    };

    // MINUS BUTTON OFF
    function minButtonOFF() {
        minButton.disabled = true;
    };

    //PERIOD BUTTON ON
    function periodButtonON() {
        periodButton.disabled = false;
    };

    //PERIOD BUTTON OFF
    function periodButtonOFF() {
        periodButton.disabled = true;
    };
    
    // OPERATION BUTTONS ON
    function opButtonsON() {
        opButtons.disabled = false;
    };
    
    //OPERATION BUTTONS OFF
    function opButtonsOFF() {
        opButtons.disabled = true;
    };
    
    // DELETE BUTTON ON
    function delButtonON() {
        deleteButton.disabled = false;
    };
    
    //DELETE BUTTON OFF
    function delButtonOFF() {
        deleteButton.disabled = true;
    };
    
    //PERCENTAGE BUTTON ON
    function percentageButtonON() {
        percentageButton.disabled = false;
    };
    
    //PERCENTAGE BUTTON OFF
    function percentageButtonOFF() {
        percentageButton.disabled = true;
    };
        


    
});