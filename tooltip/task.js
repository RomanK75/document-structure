const aTags = document.getElementsByClassName("has-tooltip")
let isAnyTooltipShowed = false

for (tag of aTags) {
    tag.addEventListener("click", function(event) {
        event.preventDefault()
        //  Удаляет прошлый див если подсказка уже была вызвана
        if (isAnyTooltipShowed) {
             const activeTooltip = document.getElementsByClassName("tooltip_active")[0]
             activeTooltip.remove()
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