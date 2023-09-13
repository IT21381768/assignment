const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        
    },
    lastName: {
        type: String,
        
    },
    email: {
        type: String,
       
    },
    gender: {
        type: String,
       
    },
    contactNo: {
        type: Number,
       
    },
    salary:{
        type: Number,
    }

    
});



module.exports = mongoose.model('Emp', EmployeeSchema);