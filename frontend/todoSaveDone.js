import printTodos from "./printTodos.js";

export default function todoSaveDone(id) {
    console.log("spara todo som klar");
    fetch("http://localhost:3000/done/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({todoId: id})
    })
    .then(res => res.json())
    .then(todos => {
        console.log("sparad som klar", todos);
        printTodos();
    })
}