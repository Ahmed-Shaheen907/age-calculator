const submitButton = document.getElementById('submitBtn');
const userBirthDay = document.getElementById('BirthDate');
const userBirthMonth = document.getElementById('BirthMonth');
const userBirthYear = document.getElementById('BirthYear');
const userAgeYears = document.getElementById('userYears');
const userAgeMonths = document.getElementById('userMonths');
const userAgeDays = document.getElementById('userDays');
const birthDateLabel = document.getElementById('BirthDateLabel');
const birthMonthLabel = document.getElementById('BirthMonthLabel');
const birthYearLabel = document.getElementById('BirthYearLabel');
const wrongPday = document.getElementById('wrongPday');
const wrongPmonth = document.getElementById('wrongPmonth');
const wrongPyear = document.getElementById('wrongPyear');

let currentUserBirthDate;
let currentUserBirthMonth;
let currentUserBirthYear;

let todayDate;
let todayDay;
let todayMonth;
let todayYear;

let daysInAge;
let monthsInAge;
let yearsInAge;
let fractionYearLeft;
let userFullBirthDate;

let leapYear = false;


submitButton.addEventListener('click', () => {

    currentUserBirthDate = userBirthDay.value; //13
    currentUserBirthMonth = userBirthMonth.value - 1; //8
    currentUserBirthYear = userBirthYear.value; //2002

    todayDate = new Date();
    todayDay = todayDate.getDate();
    todayMonth = todayDate.getMonth() + 1;
    todayYear = todayDate.getFullYear();


    createBirthDayOfUser(currentUserBirthDate, currentUserBirthMonth, currentUserBirthYear);
})

function clearInput() {
    userBirthDay.value = '';
    userBirthMonth.value = '';
    userBirthYear.value = '';
}

function createBirthDayOfUser(currentUserBirthDate, currentUserBirthMonth, currentUserBirthYear) {

    userFullBirthDate = new Date(currentUserBirthYear, currentUserBirthMonth, currentUserBirthDate);

    isBirthDateCorrect(userFullBirthDate);

}

function addingErrorClassToInputLabels() {
    birthDateLabel.classList.add('labelColorError');
    birthMonthLabel.classList.add('labelColorError');
    birthYearLabel.classList.add('labelColorError');

    userBirthDay.classList.add('inputError');
    userBirthMonth.classList.add('inputError');
    userBirthYear.classList.add('inputError');

    wrongPday.classList.add('visible');
    wrongPmonth.classList.add('visible');
    wrongPyear.classList.add('visible');
}

function removingErrorClassToInputLabels() {
    birthDateLabel.classList.remove('labelColorError');
    birthMonthLabel.classList.remove('labelColorError');
    birthYearLabel.classList.remove('labelColorError');

    userBirthDay.classList.remove('inputError');
    userBirthMonth.classList.remove('inputError');
    userBirthYear.classList.remove('inputError');

    wrongPday.classList.remove('visible');
    wrongPmonth.classList.remove('visible');
    wrongPyear.classList.remove('visible');
}

function emptyDateError() {
    wrongPday.innerHTML = 'empty field';
    wrongPmonth.innerHTML = 'empty field';
    wrongPyear.innerHTML = 'empty field';
}

function wrongDateError() {
    wrongPday.innerHTML = 'wrong format';
    wrongPmonth.innerHTML = 'wrong format';
    wrongPyear.innerHTML = 'wrong format';
}

function isBirthDateCorrect(userFullBirthDate) {

    if (currentUserBirthDate.trim() === '' || currentUserBirthMonth < 0 || currentUserBirthYear.trim() === '') {
        clearInput();
        addingErrorClassToInputLabels();
        emptyDateError()
        return;
    }

    if (!(userFullBirthDate.getDate() === parseInt(currentUserBirthDate)) || userFullBirthDate.getFullYear() > todayYear || userFullBirthDate == 'Invalid Date' || todayDate < userFullBirthDate || currentUserBirthYear.length < 4 || currentUserBirthYear.length > 4 || currentUserBirthMonth > 12) {
        clearInput();
        addingErrorClassToInputLabels();
        wrongDateError();
        return;
    }

    removingErrorClassToInputLabels();
    computeDiffrenceInDays(userFullBirthDate);
    computeDiffrenceInMonths(userFullBirthDate);
    computeDiffrenceInyears(userFullBirthDate);

    clearInput();

}

function computeDiffrenceInDays(userFullBirthDate) {

    daysInAge = todayDay - userFullBirthDate.getDate();

}

function computeDiffrenceInMonths(userFullBirthDate) {

    monthsInAge = (todayMonth - userFullBirthDate.getMonth()) - 1;

}

function computeDiffrenceInyears(userFullBirthDate) {

    yearsInAge = todayYear - userFullBirthDate.getFullYear();

    ageCalculator();

}

function ageCalculator() {

    isItALeapYear(currentUserBirthYear);

    if (monthsInAge < 0) {
        yearsInAge--;
        monthsInAge = (monthsInAge + 12);
    }

    if (daysInAge < 0) {

        if (monthsInAge !== 0) {
            monthsInAge--;
        } else { //change
            yearsInAge--;
            monthsInAge = 11;  //equivalent to rolling back to December of the previous year
        }

        if (leapYear && currentUserBirthMonth == 1) {
            daysInAge--;
        }

        let daysInThisMonth = new Date(0, currentUserBirthMonth + 1, 0);//getting the days in the input month
        if (daysInThisMonth.getDate() === 30) {//if its 30 days, -1 to the days
            daysInAge--;
        }

        let previousMonthDate = new Date(todayYear, todayMonth, 0);
        let previousMonthDays = previousMonthDate.getDate();
        daysInAge = daysInAge + previousMonthDays;

    }

    setCalculatedAge();

    leapYear = false; //reseting the flag

}

function isItALeapYear(currentUserBirthYear) {

    if (currentUserBirthYear % 4 === 0) {

        if (currentUserBirthYear % 100 === 0) {
            if (currentUserBirthYear % 400 === 0) {
                leapYear = true;
            }
        } else {
            leapYear = true;
        }

    }

}

function setCalculatedAge() {

    userAgeYears.innerHTML = yearsInAge;
    userAgeMonths.innerHTML = monthsInAge;
    userAgeDays.innerHTML = daysInAge;

}