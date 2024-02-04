const dateInp = document.querySelector('.date');
const monthInp = document.querySelector('.month');
const yearInp = document.querySelector('.year');
const calBtn = document.querySelector('.js-cal-btn');
const result = document.querySelector('.js-result');

function calculateAge(day, month, year) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        ageYears--;
    }

    let ageMonths = (today.getMonth() + 12) - birthDate.getMonth();
    if (dayDiff < 0) {
        ageMonths--;
    }

    let ageDays = today.getDate() - birthDate.getDate();
    if (ageDays < 0) {
        const tempDate = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDays = tempDate.getDate() - birthDate.getDate() + today.getDate();
    }

    return { years: ageYears, months: ageMonths, days: ageDays };
}

// Example usage
// const day = 21;
// const month = 6;
// const year = 2002;

// const age = calculateAge(day, month, year);
// console.log("Age:", age.years, "years", age.months, "months", age.days, "days");


function returnResult(day, month, year) {
    let age = calculateAge(day, month , year);
    result.innerHTML = `Your Age is : ${age.years} Year, ${age.months} Month, ${age.days} Days.`;
}
function checkInputs(day, month, year) {
    if(day > 31 || day < 1) {
        alert('Enter valid Date!');
        dateInp.innerHTML = "";
    }
    if(month > 12 || month < 1) {
        alert('Enter valid Month!');
    }
    if(year.length > 4 || year.length < 4) {
        alert('Enter valid Year!');
    }
}
calBtn.addEventListener('click', ()=>{
    const day = dateInp.value;
    const month = monthInp.value;
    const year = yearInp.value;
    checkInputs(day, month, year);
    
    returnResult(day,month,year);
});