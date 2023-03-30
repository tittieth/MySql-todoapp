const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const connection = require('./conn')

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 
// Todos
//

app.get('/todos', (req, res) => {

    connection.connect((err) => {
        if (err) {
            console.log('err', err);
        }

        connection.query('SELECT * FROM todos WHERE done = 0', (err, data) => {
            if (err) {
                console.log('err', err);
            }
            
            console.log('data från query', data);
            res.json(data)

        })
    })
})

app.post('/todos', (req, res) => {
    let newTodo = req.body;

    connection.connect((err) => {
        if (err) {
            console.log('err', err);
        }
      
        let sql = `INSERT INTO todos (todoName, listId) VALUES ("${newTodo.newTodoName}", ${newTodo.newTodoList})`;

        connection.query(sql, (err, data) => {
            if (err) {
                console.log('err', err);
            }
            
            console.log('sparad', data);
            res.json(data)

        })
    })
})

app.post('/done', (req, res) => {
    let todoDone = req.body.todoId;

    connection.connect((err) => {
        if (err) {
            console.log('err', err);
        }
      
        let sql = "UPDATE todos SET done = 1 WHERE todoID = " + todoDone;

        connection.query(sql, (err, data) => {
            if (err) {
                console.log('err', err);
            }
            
            console.log('sparad', data);
            res.json(data)

        })
    })
})

//
// Lists
//

app.get('/lists', (req, res) => {

    connection.connect((err) => {
        if (err) {
            console.log('err', err);
        }

        connection.query('SELECT * FROM lists', (err, data) => {
            if (err) {
                console.log('err', err);
            }
            
            console.log('listor', data);
            res.json(data)

        })
    })
})


module.exports = app;
