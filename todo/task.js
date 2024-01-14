const form = document.getElementById("tasks__form")
const inputfield = document.getElementById("task__input")
const taskList = document.getElementById("tasks__list")
const clearButton = document.getElementById("clear_storage")

console.log(localStorage)

let nextId = 0;


function createTaskDiv(inputValue) {
    const id = nextId++;
    const task = {
        id: id,
        title: inputValue
    };


    let tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    tasks[id] = task;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const taskHTML = document.createElement("div");
    taskHTML.className = "task";
    taskHTML.innerHTML = `
    <div class="task__title">
      ${inputValue}
    </div>
    <a href="#" class="task__remove">&times;</a>
  `;

    const removeButton = taskHTML.querySelector(".task__remove");
    removeButton.addEventListener("click", function () {
        delete tasks[id];
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskHTML.remove();
    });

    taskList.appendChild(taskHTML);
    inputfield.value = "";

    return taskHTML;
}



function renderTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || {};
    Object.values(tasks).forEach(task => {
        createTaskDiv(task.title);
    });
}



clearButton.addEventListener("click", function () {
    localStorage.removeItem('tasks');
})

form.addEventListener("submit", function (e) {
    e.preventDefault();
    createTaskDiv(inputfield.value);
})

renderTasks()