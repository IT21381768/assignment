const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


app.use(bodyParser.json());
app.use(cors());


app.use(cors());
mongoose.set('strictQuery', true);
const port = 8000;
// const url = 'mongodb+srv://KameshChandima:kamesh123@employee.amrd0p2.mongodb.net/'
const url = 'mongodb+srv://minsandi:minsandi123@mernapp.cnpzawc.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Database not connected', err));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



//employee
const employeeRoutes = require('./routes/employee');
app.use('/AddEmployee', employeeRoutes);
app.use('/EditEmployee', employeeRoutes);
app.use('/EmployeeList', employeeRoutes);
app.use('/EmployeePreview', employeeRoutes);
app.use('/EmpLoginPage', employeeRoutes);
app.use('/EmpWelcome', employeeRoutes);

