const today = new Date();
today.year = today.getFullYear().toString().slice(-2);

const form = document.querySelector('#form');
const thankYou = document.querySelector('.completed');

const nameInput = document.querySelector('#name');
nameInput.display = document.querySelector('#name-display');
nameInput.validationType = "name";
nameInput.requiredLength = undefined;
nameInput.errorDisplay = document.querySelector('#name-error-display');

const numberInput = document.querySelector('#number');
numberInput.display = document.querySelector('#card-number-display');
numberInput.validationType = "number";
numberInput.requiredLength = 16 + 3;
numberInput.errorDisplay = document.querySelector('#number-error-display');

const monthInput = document.querySelector('#month');
monthInput.display = document.querySelector('#month-display');
monthInput.validationType = "month";
monthInput.requiredLength = 2;
monthInput.errorDisplay = document.querySelector('#month-error-display');

const yearInput = document.querySelector('#year');
yearInput.display = document.querySelector('#year-display');
yearInput.validationType = "year";
yearInput.requiredLength = 2;
yearInput.errorDisplay = document.querySelector('#year-error-display');

const cvcInput = document.querySelector('#cvc');
cvcInput.display = document.querySelector('#cvc-display');
cvcInput.validationType = "cvc";
cvcInput.requiredLength = 3;
cvcInput.errorDisplay = document.querySelector('#cvc-error-display');

const submitBtn = document.querySelector('#submit');
const continueBtn = document.querySelector('#continue-btn');

const nameRegEx = /^[A-Za-z ]+$/; //spaces allowed
const cardNumRegEx = /^[0-9 ]+$/; //spaces allowed
const numRegEx = /^[0-9]+$/; //no spaces allowed

function handleValidateInput(inputEl) {
    inputEl.errorType = "valid";
    if(inputEl.value.length == 0) {
        inputEl.errorType = "empty";
        console.log('input cannot be empty');
        return false;
    }
    if(inputEl.requiredLength && inputEl.value.length != inputEl.requiredLength) {
        inputEl.errorType = "length";
        console.log('incorrect length');
        return false;
    }
    if(inputEl.validationType == "name") {
        if(!nameRegEx.test(inputEl.value)) {
            inputEl.errorType = "regex";
            console.log('only letters allowed');
            return false;
        };
    } else if(inputEl.validationType == "number") {
        if(!cardNumRegEx.test(inputEl.value)) {
            inputEl.errorType = "regex";
            console.log('only numbers allowed');
            return false;
        };
    } else {
        if(!numRegEx.test(inputEl.value)) {
            inputEl.errorType = "regex";
            console.log('only numbers allowed');
            return false;
        }
        if(inputEl.validationType == "month") {
            if(parseInt(inputEl.value) < 1 || parseInt(inputEl.value) > 12) {
                inputEl.errorType = "month";
                console.log('not valid month');
                return false;
            }
        }
        if(inputEl.validationType == "year") {
            if(parseInt(inputEl.value) < parseInt(today.year)) {
                inputEl.errorType = "year";
                console.log('year must be in future');
                return false;
            }
        }
    }
    return true;
}


function handleDisplayInput(e) {
    e.target.display.textContent = e.target.value;
    if(!handleValidateInput(e.target)) {
        e.target.classList.add('invalid');
        e.target.errorDisplay.setAttribute('style', 'opacity: 1');
    } else {
        e.target.classList.remove('invalid');
        e.target.errorDisplay.setAttribute('style', 'opacity: 0');
    };
};

nameInput.addEventListener('input', handleDisplayInput);
numberInput.addEventListener('input', handleDisplayInput);
monthInput.addEventListener('input', handleDisplayInput);
yearInput.addEventListener('input', handleDisplayInput);
cvcInput.addEventListener('input', handleDisplayInput);

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(
        handleValidateInput(nameInput) &&
        handleValidateInput(numberInput) &&
        handleValidateInput(monthInput) &&
        handleValidateInput(yearInput) &&
        handleValidateInput(cvcInput)
        ) {
            form.setAttribute('style', 'display:none');
            thankYou.setAttribute('style', 'display:flex');
            continueBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                thankYou.setAttribute('style', 'display:none');
                form.setAttribute('style', 'display:flex');

                nameInput.value = '';
                nameInput.display.textContent = 'Jane Appleseed';

                numberInput.value = '';
                numberInput.display.textContent = '0000 0000 0000 0000';

                monthInput.value = '';
                monthInput.display.textContent = '00';

                yearInput.value = '';
                yearInput.display.textContent = '00';

                cvcInput.value = '';
                cvcInput.display.textContent = '000';
            })
            console.log('submitted');
        } else {
            nameInput.classList.add('invalid');
            numberInput.classList.add('invalid');
            monthInput.classList.add('invalid');
            yearInput.classList.add('invalid');
            cvcInput.classList.add('invalid');
        };
})