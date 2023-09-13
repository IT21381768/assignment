import React, { useState, Component } from "react";
import "../css/form.css";
import axios from "axios";

export default class AddEmployee extends Component {


  constructor(props) {  
    super(props);
    this.state = {
      employee: [],
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      contactNo: "",
      salary: "",

    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, gender, contactNo, salary } = this.state;

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
      contactNo: contactNo,
      salary: salary,
    };

    console.log(data);

    axios.post("/AddEmployee/post", data).then((res) => {
      if (res.data.success) {
        console.log(res.data.success._id);
        var id = res.data.success._id;
        window.location.href = `/employee/list`;

        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          gender: "",
          contactNo: "",
          salary: "",
        });
      }
    });
  };

  render() {
    return (
      <div className="container1">

        <form className="create" onSubmit={this.onSubmit}>
          <h3>Add New Employee</h3>

          <label>FirstName: </label>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            required
          />

          <label>LastName: </label>
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            required
          />

          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <label>Gender: </label>
          <select
            name="gender"
            value={this.state.gender}
            onChange={this.handleChange}
            required
          >
            <option value="">--Select Gender--</option>
            <option value="Male">M</option>
            <option value="Female">F</option>
          </select>

          <label>Phone: </label>
          {/* <input
            type="number"
            name="contactNo"
            value={this.state.contactNo}
            onChange={this.handleChange}
            maxlength="10"
            required
            pattern="\0\d{9}"
          /> */}

          <input
            type="tel"
            name="contactNo"
            value={this.state.contactNo}
            onChange={this.handleChange}
            maxLength="10"
            required
            pattern="0\d{9}"
          />


          <label>Salary: </label>
          <input
            type="number"
            name="salary"
            value={this.state.salary}
            onChange={this.handleChange}
            required></input>

          <center>
            <button className="btn" type="submit">
              Submit
            </button>
          </center>
        </form>
      </div>
    );
  }
}
