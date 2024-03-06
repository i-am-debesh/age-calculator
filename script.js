const dateInp = document.querySelector('.date');
const monthInp = document.querySelector('.month');
const yearInp = document.querySelector('.year');
const calBtn = document.querySelector('.js-cal-btn');
const result = document.querySelector('.js-result');
const logButton = document.querySelector('.js-log-btn');
const logData = document.querySelector('.data');
const clearLogBtn = document.querySelector('.js-clear-log-btn');
let permission = false;

function isSpecialDate(day,month,year) {
    if(day == 6 && month == 5 && year == 2003) {
        return true;
    }return false;
}

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

    const currentLog = `${day}-${month}-${year} -> ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()} -> Age- ${ageYears}`;
    
    storeData(currentLog);
    return { years: ageYears, months: ageMonths, days: ageDays };

}

// Example usage
// const day = 21;
// const month = 6;
// const year = 2002;

// const age = calculateAge(day, month, year);
// console.log("Age:", age.years, "years", age.months, "months", age.days, "days");

function storeData(currentLog) {
    const i = localStorage.length;
    localStorage.setItem(`${i}`,`${currentLog}`);
}
function returnResult(day, month, year, permission) {
    if(permission === true) {
        let age = calculateAge(day, month , year);
        result.innerHTML = `Your Age is : ${age.years} Year, ${age.months} Month, ${age.days} Days.`;

    }
}
function checkInputs(day, month, year) {
    if(day > 31 || day < 1) {
        permission = false;
        alert('Enter valid Date!');
        dateInp.innerHTML = "";
        
    }
    if(month > 12 || month < 1) {
        permission = false;
        alert('Enter valid Month!');
        
    }
    if(year.length > 4 || year.length < 4) {
        permission = false;
        alert('Enter valid Year!');

    }
    else {
        permission = true;
    }
}
calBtn.addEventListener('click', ()=>{
    const day = dateInp.value;
    const month = monthInp.value;
    const year = yearInp.value;
    checkInputs(day, month, year);
    if(isSpecialDate(day,month,year)) {
        alert(`It's GULUGULU's Birth Date ♥ !`);
    }
    returnResult(day,month,year,permission);
    //console.log(localStorage);
});
const admin_password = "69";
function isAdmin(pass) {
    return pass === admin_password?true:false;

}
clearLogBtn.addEventListener('click', ()=>{
    const pass = prompt("Enter Admin Password:");
    if(isAdmin(pass)) {
        localStorage.clear();
        logData.innerHTML = '';
    }
    else {
        alert('Invalid password!');
    }
});
logButton.addEventListener('click', ()=>{
    const pass = prompt("Enter Admin Password:");
    if(isAdmin(pass)) {
        if(localStorage.length > 0) {
            for(let i = 0; i< localStorage.length; i++) {
                const p = document.createElement('p');
                p.innerHTML = `${localStorage.getItem(i)}`;
                logData.appendChild(p);
            }
        }else {
            logData.innerHTML = 'No data found.';
        }
        
    }else {
        alert('Invalid password!');
    }

    
});