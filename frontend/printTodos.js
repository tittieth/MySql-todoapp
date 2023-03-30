import todoSaveDone from "./todoSaveDone.js";
import { listDrop } from "./printLists.js";

let app = document.getElementById("app");

export default function printTodos() {
    fetch("http://localhost:3000/todos")
    .then(res => res.json())
    .then(todos => {
        console.log(todos);

        let ul = document.createElement("ul");

        todos.map(todo => {
            let li = document.createElement("li");
            li.innerText = `${todo.todoName} (${todo.listId})`;
            li.id = todo.todoId;

            li.addEventListener("click", () => {
                todoSaveDone(li.id, listDrop.value);
            })

            ul.appendChild(li);
        })

        app.innerHTML = "";
        app.appendChild(ul);
    })
}