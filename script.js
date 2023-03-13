const input = document.querySelector(".text-input")
const btn = document.querySelector(".add-btn")
const ul = document.querySelector(".list")
const h4 = document.querySelector("h4")



btn.addEventListener("click", () => {
    task()
})

input.addEventListener("keydown", () => {

})



function task() {
    if (input.value === "") {
        h4.innerHTML = "404"
    } else {
        ul.innerHTML += `<li class="list-group-item d-flex align-items-center justify-content-between">
<span>
<input type="checkbox" class="check">${input.value}
</span>
<button class="del-btn btn btn-danger">Delete</button>
</li>`
        input.value = ""
        h4.innerHTML = ""
    }
}
ul.addEventListener("click", (e) => {
    if (e.target.classList.contains("del-btn")) {
        e.target.parentNode.remove()
    }
    if (e.target.classList.contains("check")) {
        if (e.target.parentNode.classList.contains("line")) {
            e.target.parentNode.classList.remove("line")
        } else {
            e.target.parentNode.classList.add("line")
        }
    }
})
input.addEventListener("keydown", (e) => {
    console.log(e.key)
    if (e.key === "Enter") {
        task()
    }
})





// localStorage - местное хранилище
// setItem(key, value) - сохранить пару ключ/значениею
// getItem(key) - получить данные по ключн key.
// removeItem(key) - удалить данные с ключом key.
// clear() - удалить все.
// key(index) - получить ключ на заданной позиции.
// length - количество элементов в хранилище.

// JSON.stringify() - любой маалыматты строка катары жуктоп берет
// JSON.parse() - биринчи калыбына келтирет

// localStorage.setItem("tasks", JSON.stringify([{title:"Bob", id:"2"}, {title:"Sam", id:"1"}]) )
// const tasks = JSON.parse(localStorage.getItem("tasks"))
// tasks.map((el) => {
//     ul.innerHTML += `<li class="list-group-item">${el.id}</li>`
// })



function view() {
    ul.innerHTML = ""
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []
    tasks.map((el) => {
        ul.innerHTML += `<li class="list-group-item d-flex align-items-center justify-content-between">
<span class="${el.isDone ? "line" : ""}">
<input type="checkbox" ${el.isDone ? "checked" : ""} class="check">
${el.title}
</span>
<button class="del-btn btn btn-danger">delete</button>
</li>`
    })
    deleteBtn()
    checkBox()
}
view()

btn.addEventListener("click", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []
    const newTask = {
        id: tasks.length ? tasks[tasks.length -1].id +1 : 1,
        title: input.value,
        isDone: false
    }
        const result = [...tasks, newTask]
    localStorage.setItem("tasks", JSON.stringify(result))
    input.value = ""
    view()
})

function deleteBtn() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    const buttons = document.querySelectorAll(".del-btn")
    buttons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
           tasks = tasks.filter((el, idx) => {
                return idx !== index
            })
            localStorage.setItem("tasks", JSON.stringify("tasks"))
            view()
        })
    })
}

function checkBox() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || []
    const checkBoxes = document.querySelectorAll(".check")
    checkBoxes.forEach((check, index) => {
        check.addEventListener("click", () => {
           tasks = tasks.map((el, idx) => {
                if (idx === index) {
                    return {...el, isDone: el.isDone}
                } else {
                    return  el
                }
            })
            localStorage.setItem("tasks", JSON.stringify(tasks))
            view()
        })
    })
}
checkBox()
