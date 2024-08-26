document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('clear');
    const deleteButton = document.getElementById('del');
    const equalButton = document.getElementById('equal');
    const percentageButton = document.getElementById('percentage');
    const minButton = document.querySelectorAll('btnminus');
    const opButtons = document.getElementById('btn operators');
    const periodButton = document.getElementById('btnperiod');



    let currentInput = '';
    let operator = '';
    let operand1 = '';
    let operand2 = '';
    let isNegativeAllowed = true;
    eqButtonOFF();
    minButtonON();
    percentageButtonOFF();
    clearButtonOFF();
    delButtonOFF();
    
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
                // currentInput += Math.PI.toFixed(2);
                const piValue = Math.PI.toFixed(2); // Use pi as a number
                if (currentInput) {
                    currentInput=(parseFloat(currentInput) * Math.PI).toFixed(2);
                    operand1=currentInput;
                } else{
                    operand1=piValue;
                    currentInput=operand1;
                }
                if (!operator) {
                    operand1 = piValue;
                } else {
                    operand2 = piValue;
                }
                // currentInput += piValue;
                operand1=currentInput;
                updateDisplay(currentInput);
                percentageButtonON();
                periodButtonOFF();
                isNegativeAllowed=true;
                eqButtonON();
            } /*else if (!isNaN(value) || value === '.') {
                currentInput += value;
                updateDisplay(currentInput);*/
            else if (!isNaN(value) || value === '.') {
                    // Check for consecutive periods
                if (value === '.' && currentInput.includes('.')) {
                    return;  // Do not allow another period if one is already present
                }
                    
                currentInput += value;
                updateDisplay(currentInput);
                if (!operator) {
                    operand1=currentInput;
                    percentageButtonON();
                } /*else {
                    operand2=currentInput;
                    eqButtonON();
                    percentageButtonON();
                }*/
                else {
                    operand2 += value;  // Add the number to operand2
                    currentInput = operand1 + ` ${operator} ` + operand2;  // Concatenate operand1, operator, and operand2
                    updateDisplay(currentInput);  // Update display to show the entire expression
                    eqButtonON();
                    percentageButtonON();
                }
                isNegativeAllowed=false; //disable negative sign input after number
            }else if (value === '-' && isNegativeAllowed) {
                if (!operator && !operand1) {
                    currentInput += value;
                    updateDisplay(currentInput);
                } else {
                    // Handle cases where minus should be treated as subtraction operator
                    if (currentInput && operand1) {
                        operator = value;
                        currentInput = '';
                        eqButtonOFF();
                        delButtonOFF();
                        isNegativeAllowed = true;
                        console.log(operator);
                    }
                }
            } /*else if (value === '-' && isNegativeAllowed) {
                currentInput += value;
                updateDisplay(currentInput);
                isNegativeAllowed = false; //disable consecutive negative signs
                
            }*/
        
            else if (['+', '-', '*', '/'].includes(value)) {
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
                // if (currentInput) {
                //     operator = value;  // Set the current operator
                //     operand1 = currentInput;  // Store the first operand
                //     currentInput += ` ${value} `;  // Add the operator to current input with spaces for readability
                //     updateDisplay(currentInput);  // Update display with the operator
                //     currentInput = '';  // Reset currentInput for the next number (operand2)
                //     eqButtonOFF();  // Disable equal button until operand2 is entered
                //     isNegativeAllowed = true;  // Allow negative number after operator
                // }
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
        if (typeof operand1==='number') {
            operand1=parseFloat(operand1.toFixed(10));
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

    delete button
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
            // currentInput = (parseFloat(currentInput) / 100).toFixed(15);
            // updateDisplay(currentInput);
            let percentageValue = parseFloat(currentInput) / 100;
        percentageValue = parseFloat(percentageValue.toFixed(10));  // Limit to 10 decimal places, then remove trailing zeroes
        updateDisplay(percentageValue);
        currentInput = percentageValue.toString();  // Update currentInput to match the formatted value
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
    
    //CLEAR BUTTON ON
    function clearButtonON() {
        clearButton.disabled = false;
    };
    
    //CLEAR BUTTON OFF
    function clearButtonOFF() {
        clearButton.disabled = true;
    };
        


    
});