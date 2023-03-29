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

app.get('/todos', (req, res) => {

    connection.connect((err) => {
        if (err) {
            console.log('err', err);
        }

        connection.query('SELECT * FROM todos', (err, data) => {
            if (err) {
                console.log('err', err);
            }
            
            console.log('data från query', data);
            res.json(data)

        })
    })
})

module.exports = app;
