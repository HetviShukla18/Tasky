let listContainer = document.getElementById('list-container');
let inputBox = document.getElementById('input-box');
let dateInput = document.getElementById('date-input');
let timeInput = document.getElementById('time-input');
let reminderContainer = document.getElementById('reminder-container');

// Add task with reminder
function addTask() {
    if (inputBox.value === '' || dateInput.value === '' || timeInput.value === '') {
        alert('Please enter a task, date, and time for the reminder.');
        return;
    }

    // Create task item
    let task = document.createElement('li');
    task.textContent = `${inputBox.value} (Reminder: ${dateInput.value} ${timeInput.value})`;
    listContainer.appendChild(task);

    // Add delete button
    let span = document.createElement('span');
    span.textContent = '×';  // Unicode for '×'
    task.appendChild(span);

    // Schedule reminder
    scheduleReminder(inputBox.value, dateInput.value, timeInput.value);

    // Clear input fields
    inputBox.value = '';
    dateInput.value = '';
    timeInput.value = '';
}

// Handle task click (mark as checked or remove)
listContainer.addEventListener('click', (el) => {
    if (el.target.tagName === 'LI') {
        el.target.classList.toggle('checked');
    } else if (el.target.tagName === 'SPAN') {
        el.target.parentElement.remove();
    }
});

// Schedule a reminder message for the task
function scheduleReminder(task, date, time) {
    const reminderDate = new Date(`${date}T${time}`);
    const now = new Date();
    const timeDifference = reminderDate.getTime() - now.getTime();

    if (timeDifference > 0) {
        setTimeout(() => {
            displayReminder(task);
        }, timeDifference);
    } else {
        alert('Reminder time has already passed!');
    }
}

// Display the reminder message below the To-Do list
function displayReminder(task) {
    let reminderMessage = document.createElement('div');
    reminderMessage.className = 'reminder-message';
    reminderMessage.innerHTML = `🔔 Beep! It's time for: <strong>${task}</strong>`;

    reminderContainer.appendChild(reminderMessage);

    // Remove the reminder message after 10 seconds
    setTimeout(() => {
        reminderMessage.remove();
    }, 10000);
}
