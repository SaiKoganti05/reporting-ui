import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactTable from "react-table";

const LeaveStatus = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employees, setEmployees] = useState([]);
  const [leaveDetails, setLeaveDetails] = useState();

  const columns = [
    { Header: "Leave Type", accessor: "leaveType" },
    { Header: "Entitled", accessor: "entitled" },
    { Header: "Applied", accessor: "applied" },
    { Header: "Granted", accessor: "granted" },
    { Header: "Balance", accessor: "balance" },
  ];

  const fetchLeaveStatus = (empId) => {
    return axios
      .get("http://localhost:8080/getLeavestatusDetails/" + empId)
      .then((res) => setLeaveDetails(res.data));
  };

  useEffect(() => {
    axios.get("http://localhost:8080/getEmployees").then((response) => {
      setEmployees(response.data);
    });
  }, []);

  const handleSelectedEmployee = (e) => {
    if ("Select an employee" === e.target.value) {
      setSelectedEmployee("");
      setLeaveDetails([]);
    } else {
      const employeeSelected = employees.find(
        (emp) => emp.name === e.target.value
      );
      setSelectedEmployee(employeeSelected);
      let emp_Id = employeeSelected.emp_id;
      fetchLeaveStatus(emp_Id);
    }
  };

  return (
    <>
      <div
        style={{
          border: "2px solid black",
          marginTop: "50px",
          marginLeft: "100px",
          marginRight: "100px",
        }}
      >
        <center>
          <h1 style={{ textDecorationLine: "underline" }}>
            Leave Status Module
          </h1>
          <div
            style={{ padding: "20px", textAlign: "left", marginLeft: "300px" }}
          >
            <label>Employee Name: </label>
            <select onChange={handleSelectedEmployee}>
              <option value="Select an employee">Select an employee</option>
              {employees.map((employee, index) => (
                <option key={index} value={employee.name}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
          <div style={{ textAlign: "left", marginLeft: "320px" }}>
            <label>Designation:</label>{" "}
            <label style={{ fontWeight: "bold" }}>
              {leaveDetails && leaveDetails.designation}
            </label>
            <br />
            <label>Email: </label>
            <label style={{ fontWeight: "bold" }}>
              {leaveDetails && leaveDetails.email}
            </label>
            <br />
            <label>Mobile: </label>
            <label style={{ fontWeight: "bold" }}>
              {leaveDetails && leaveDetails.mobileNumber}
            </label>
            <br />
            <label>Band: </label>
            <label style={{ fontWeight: "bold" }}>
              {leaveDetails && leaveDetails.band}
            </label>
            <div
              style={{
                border: "2px solid",
                width: "500px",
                height: "200px",
                marginBottom: "40px",
                marginTop: "20px",
              }}
            >
              <table>
                <tr>
                  <th>Leave Type</th>
                  <th>Entitled</th>
                  <th>Applied</th>
                  <th>Granted</th>
                  <th>Balance</th>
                </tr>
                {console.log(
                  "Leave details are ...." + leaveDetails?.leaveData
                )}
                {leaveDetails?.leaveData?.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val.leaveType}</td>
                      <td>{val.entitled}</td>
                      <td>{val.applied}</td>
                      <td>{val.granted}</td>
                      <td>{val.balance}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        </center>
      </div>
    </>
  );
};

export default LeaveStatus;
