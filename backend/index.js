const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Login');

app.post('/register', (req, res) => {
    // To post / insert data into database
    const { email, password } = req.body;
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already registered")
            } else {
                FormDataModel.create(req.body)
                    .then(log_reg_form => res.json(log_reg_form))
                    .catch(err => res.json(err))
            }
        });
});

app.post('/login', (req, res) => {
    // To find record from the database
    const { email, password } = req.body;
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                // If user found then these 2 cases
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Wrong password");
                }
            }
            // If user not found then 
            else {
                res.json("No records found! ");
            }
        });
});

app.post('/contact-us', (req, res) => {
    // To handle contact form submissions
    const { name, email, message } = req.body;
    FormDataModel.create({ name, email, message })
        .then(contactData => res.json(contactData))
        .catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log("Server listening on http://127.0.0.1:3001");
});
