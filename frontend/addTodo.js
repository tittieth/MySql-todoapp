import printTodos from "./printTodos.js";

let saveTodoName = document.getElementById("saveTodoName");
let saveTodoBtn = document.getElementById("saveTodoBtn");

saveTodoBtn.addEventListener("click", addTodo)

export default function addTodo () {
    console.log("click", saveTodoName.value);

    fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({newTodoName: saveTodoName.value, newTodoList: 1})
    })
    .then(res => res.json())
    .then(todos => {
        console.log("skapa todos", todos);
        printTodos();
    })
}