document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    updateTaskCount();
});

function addTask() {
    const inputBox = document.getElementById('input-box');
    const listContainer = document.getElementById('list-container');

    if (inputBox.value === '') {
        alert('Veuillez écrire une tâche!');
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = inputBox.value;

    const span = document.createElement('span');
    span.innerHTML = '<i class="fas fa-times"></i>';
    li.appendChild(span);

    listContainer.appendChild(li);
    inputBox.value = '';

    saveData();
    updateTaskCount();
}

document.getElementById('list-container').addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked');
        saveData();
        updateTaskCount();
    } else if (e.target.tagName === 'SPAN' || e.target.tagName === 'I') {
        const listItem = e.target.tagName === 'SPAN' ? e.target.parentElement : e.target.parentElement.parentElement;
        listItem.remove();
        saveData();
        updateTaskCount();
    }
}, false);

function clearCompleted() {
    const completedItems = document.querySelectorAll('#list-container li.checked');
    completedItems.forEach(item => item.remove());
    saveData();
    updateTaskCount();
}

function saveData() {
    const listContainer = document.getElementById('list-container');
    localStorage.setItem('todoData', listContainer.innerHTML);
}

function loadTasks() {
    const listContainer = document.getElementById('list-container');
    const savedData = localStorage.getItem('todoData');

    if (savedData) {
        listContainer.innerHTML = savedData;
    }
}

function updateTaskCount() {
    const totalTasks = document.querySelectorAll('#list-container li:not(.checked)').length;
    document.getElementById('task-count').textContent = totalTasks;
}