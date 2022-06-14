const calendar = document.querySelector(".calendar");
const weekdays = ['mon', 'tue', 'wed', 'thur', 'fri'];
const timeBar = document.querySelector(".time-bar");
const weekdayBar = document.querySelector(".weekday-bar");


for (let i = 0; i < 5; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.setAttribute("data-weekday", weekdays[i]);
    for (let i = 0; i < 25; i++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.setAttribute("data-time", getTime(i))
        day.appendChild(block);
    }
    calendar.appendChild(day);
}

function getTime(i) {
    let hour = Math.floor(9 + i / 2);
    if (i % 2 === 0) return hour.toString() + ":00";
    else return hour.toString() + ":30";
}

function capitalize(str) {
    let result = str.toLowerCase();
    return result.charAt(0).toUpperCase() + str.slice(1);
}

for (let i = 0; i < 25; i++) {
    const block = document.createElement("div");
    block.textContent = getTime(i);
    timeBar.appendChild(block);
}


for (let i = 0; i < 5; i++) {
    const weekday = document.createElement("div");
    weekday.textContent = capitalize(weekdays[i]);
    weekdayBar.appendChild(weekday);
}


const blocks = Array.from(document.querySelectorAll(".block"));

blocks.forEach(block => block.addEventListener("mouseenter", e => e.target.classList.add("hovering")));

blocks.forEach(block => block.addEventListener("mouseout", e => e.target.classList.remove("hovering")));

blocks.forEach(block => block.addEventListener("click", e => e.target.classList.add("selecting")));
