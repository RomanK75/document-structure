const aTags = document.getElementsByClassName("has-tooltip")
let isAnyTooltipShowed = false

// Обработчик клика на body
document.getElementsByTagName("body")[0].addEventListener("click", function(event) {
    if (!event.target.classList.contains("has-tooltip")) {
        if (isAnyTooltipShowed) {
            const activeToolTip = document.querySelector(".tooltip_active")
            activeToolTip.remove()
            isAnyTooltipShowed = false
        }
    }
})

// Обработчик клика на подсказки
for (tag of aTags) {
    tag.addEventListener("click", function(event) {
        event.preventDefault()
        //  Удаляет прошлый див если подсказка уже была вызвана
        if (isAnyTooltipShowed) {
            if (event.target.nextElementSibling.classList.contains("tooltip")) { // Если клик произошол на активной подсказке
                event.target.nextElementSibling.remove()
                isAnyTooltipShowed = false
                return false // Выходим из обработчика
            } else { // Клик по неактивной подсказке, но с имеющейся активной на другом tooltip
                 const activeToolTip = document.querySelector(".tooltip_active")
                 activeToolTip.remove()

            }
             
        }
        // Создаем подсказку
        const createTooltip = document.createElement("div")
        isAnyTooltipShowed = true
        createTooltip.className = "tooltip"
        createTooltip.textContent = String(event.target.title)
        // Получаем положение таргета и устанавливаем позицию для подсказки 
        const rect = event.target.getBoundingClientRect() 
        createTooltip.style.left = rect.left + "px"
        createTooltip.style.top = (rect.top + rect.height) + "px"
        event.target.insertAdjacentElement("afterend", createTooltip)
        // Делаем видимой
        createTooltip.classList.toggle("tooltip_active")
    })
}
