let listContainer = document.getElementById('list-container');
let inputBox = document.getElementById('input-box');
let dateInput = document.getElementById('date-input');
let timeInput = document.getElementById('time-input');

// Request notification permission when the page loads
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

function addTask() {
    if (inputBox.value === '' || dateInput.value === '' || timeInput.value === '') {
        alert('Please fill in all fields!');
        return;
    }

    let task = document.createElement('li');
    task.textContent = `${inputBox.value} - ${dateInput.value} ${timeInput.value}`;
    listContainer.appendChild(task);

    let span = document.createElement('span');
    span.textContent = '\u00d7';
    task.appendChild(span);

    inputBox.value = '';
    dateInput.value = '';
    timeInput.value = '';

    saveData();
    scheduleNotification(task.textContent, dateInput.value, timeInput.value);
}

function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showData() {
    listContainer.innerHTML = localStorage.getItem('tasks') || '';
}

function scheduleNotification(task, date, time) {
    let reminderDate = new Date(`${date}T${time}`);
    let currentDate = new Date();

    let timeDifference = reminderDate - currentDate;

    if (timeDifference > 0) {
        setTimeout(() => {
            showNotification(task);
        }, timeDifference);
    }
}

function showNotification(task) {
    if (Notification.permission === "granted") {
        new Notification("Reminder", {
            body: `It's time for: ${task}`,
            icon: "icon.png"
        });
    } else {
        alert(`Reminder: ${task}`);
    }
}

listContainer.addEventListener('click', (el) => {
    if (el.target.tagName == 'LI') {
        el.target.classList.toggle('checked');
        saveData();
    } else if (el.target.tagName == 'SPAN') {
        el.target.parentElement.remove();
        saveData();
    }
});

showData();
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}
