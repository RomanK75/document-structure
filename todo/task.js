const form = document.getElementById("tasks__form")
const inputfield = document.getElementById("task__input")
const taskList = document.getElementById("tasks__list")
const myStorage = window.localStorage
const clearButton = document.getElementById("clear_storage")

/* Вопрос????? Как генерировать уникальные ключи,
    Кроме как инкрементировать ничего в голову не пришло поэтому не стал делать
    т.е создавать id при remove брать оттуда ключ, но как потом код поймет что ключ освободился?
*/


const myTaskList = myStorage
console.log(myTaskList)

// Функция добавления таски
function createTaskDiv(inputValue = "") {
    const task = document.createElement("div")
    task.className = "task"
    task.innerHTML = `<div class="task__title">
                            </div>
        <a href="#" class="task__remove">&times;</a>`;
    task.getElementsByClassName("task__title")[0].textContent = inputValue
    const removeButton = task.getElementsByClassName("task__remove")[0]
    removeButton.addEventListener("click", function() {
        task.remove()
        myStorage.removeItem(inputValue)
    })
    taskList.appendChild(task)
    inputfield.value = ""
    return task
}
// Очистка localstorage
clearButton.addEventListener("click", function() {
    myStorage.clear()
})
//  Добавляем таски из localstorage
if (myStorage.length) {
    for (task in myStorage) {
        if (!myStorage.hasOwnProperty(task)) {
            continue
          }
        createTaskDiv(myStorage.getItem(task))
    }
}

// добавляем таску через кнопку
form.addEventListener("submit", function(event) {
    event.preventDefault()
    const inputValue = inputfield.value
    if (inputValue){
        createTaskDiv(inputValue)
        myStorage.setItem(inputValue, inputValue)
    }

})