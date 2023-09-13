import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav class="nav">
        <ul type="none">
          <li>
            <a href="/employee/list" class="logo">
              <img src="../images/logo.png" />
            </a>
          </li>
          <li>
            <a href="/employee/list" class="navL">
              <i class="fas fa-users"></i>
              <span class="nav-item">Employee list</span>
            </a>
          </li>
          <li>
            <a href="/employee/add" class="navL">
              <i class="fas fa-users"></i>
              <span class="nav-item">Add Employee</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
