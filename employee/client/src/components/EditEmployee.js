import React, { Component } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import "../css/form.css";
import Swal from "sweetalert2";


function withParams(Component) {
  return (props) => <Component params={useParams()} />;
}

class EditEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.params.id,
      employee: [],
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      contactNo: "",
    };
  }

  componentDidMount() {
    console.log(this.state.id);
    const id = this.state.id;
    axios.get(`/EmployeeList/post/${id}`).then((res) => {
      console.log(res.data.post);
      if (res.data.success) {
        this.setState({
          employee: res.data.post,
        });
        console.log(this.state.employee);
      }
    });
  }

  //edit
  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const id = this.state.id;

    const { firstName, lastName, email, gender, contactNo } = this.state;

    let data = this.state.employee;
    data = {
      firstName: firstName.length != 0 ? firstName : data.firstName,
      lastName: lastName.length != 0 ? lastName : data.lastName,
      email: email.length != 0 ? email : data.email,
      gender: gender.length != 0 ? gender : data.gender,
      contactNo: contactNo.length != 0 ? contactNo : data.contactNo,
    };

    axios
      .put(`/EditEmployee/post/${id}`, data)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            title: "Updated Successfully!",
            text: "Your changes have been saved.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
          }).then(() => {
            this.setState({
              firstName: "",
              lastName: "",
              email: "",
              gender: "",
              contactNo: "",
            });
            window.location.href = `/employee/list`;
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "An error occurred while updating the post. Please try again later.",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });
      });
  };

  onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      axios.delete(`/contact/post/${id}`).then((res) => {
        alert("Delete Successfully");
        this.retrievePosts();
      });
    }
  };

  onDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      axios.delete(`/EmployeeList/post/${id}`).then((res) => {
        alert("Delete Successfully");
        this.retrievePosts();
      });
    }
  };

  render() {
    const { _id, firstName, lastName, email, gender, contactNo } =
      this.state.employee;
    return (
      <div className="container1">
        <form className="update" onSubmit={this.onSubmit}>
          <h3>Update Employee</h3>

          <label>firstName: </label>
          <input
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            placeholder={firstName}
            minlength="6"
            maxlength="10"
          />

          <label>lastName: </label>
          <input
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            placeholder={lastName}
            minlength="6"
            maxlength="10"
          />

          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder={email}
          />

          <label>Gender: </label>
          <select
            name="gender"
            value={this.state.gender}
            onChange={this.handleChange}
            placeholder={gender}
          >
            <option value="">--Select Gender--</option>
            <option value="Male">M</option>
            <option value="Female">F</option>
          </select>

          <label>Phone: </label>
          <input
            type="tel"
            name="contactNo"
            value={this.state.contactNo}
            onChange={this.handleChange}
            maxlength="12"
            pattern="\+94\d{9}"
            placeholder={contactNo}
          />

          <center>
            <button className="btn" type="submit">
              Update Employee
            </button>
          </center>
        </form>
      </div>
    );
  }
}

export default withParams(EditEmployee);
