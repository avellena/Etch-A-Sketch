const calendar = document.querySelector(".calendar");
const weekdays = ['mon', 'tue', 'wed', 'thur', 'fri'];
const timeBar = document.querySelector(".time-bar");
const weekdayBar = document.querySelector(".weekday-bar");
let mouseDown = 0;

calendar.onmousedown = () => {
    ++mouseDown;
    if (mouseDown) {
        console.log('mouse button down')
    }
}
calendar.onmouseup = () => {
    --mouseDown;
    if (mouseDown) {
        console.log('mouse button down')
    }
}

for (let i = 0; i < 5; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.setAttribute("data-weekday", weekdays[i]);
    for (let i = 0; i < 25; i++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.setAttribute("data-time", getTime(i));
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
    block.setAttribute("data-time", getTime(i));
    timeBar.appendChild(block);
}


for (let i = 0; i < 5; i++) {
    const weekday = document.createElement("div");
    weekday.textContent = capitalize(weekdays[i]);
    weekdayBar.appendChild(weekday);
}

function getTimeAttr(element) {
    return element.getAttribute("data-time");
}

const blocks = Array.from(document.querySelectorAll(".block"));

let lastBlockVisited;
blocks.forEach(block => {
    block.addEventListener("mouseenter", e => {
        const block = e.target;
        const timeBlock = document.querySelector(`.time-bar > [data-time="${getTimeAttr(block)}"]`)
        timeBlock.classList.add("hovering");
        if (mouseDown) {
            if (block.classList.contains("selecting")) {
                lastBlockVisited.classList.remove("selecting");
                lastTimeBlockVisited.classList.remove("hovering");
            } else block.classList.add("selecting");
        }
        block.classList.add("hovering");   
    });
});


blocks.forEach(block => {
    block.addEventListener("mouseout", e => {
        const block = e.target;
        block.classList.remove("hovering");
        
        const timeBlock = document.querySelector(`.time-bar > [data-time="${getTimeAttr(block)}"]`)

        if (mouseDown) {
            lastBlockVisited = block;
            lastTimeBlockVisited = timeBlock;
            return;
        }
        timeBlock.classList.remove("hovering");
    });
});

blocks.forEach(block => {
    block.addEventListener("mousedown", e => {
        let leftClick = (e.which === 1);
        if (leftClick) e.target.classList.toggle("selecting");
    });
});

calendar.addEventListener("mouseup", e => {
    let timeBlocks = Array.from(timeBar.childNodes);
    timeBlocks.forEach(timeBlock => timeBlock.classList.remove("hovering"));
});