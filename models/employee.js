const mongoose = require('mongoose')

const schema = mongoose.Schema;

const Employee_Detail = new schema({
    name: String,
    location: String,
    position: String,
    salary: Number
});

const employeeData = mongoose.model('employe', Employee_Detail)
module.exports = employeeData