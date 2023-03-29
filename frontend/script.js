console.log("hello world");

fetch('http://localhost:3000/todos')
.then(res => res.json())
.then(data => {
    console.log(data);
})