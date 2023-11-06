import React, { useEffect, useState } from "react";
import axios from 'axios'

const LeaveStatus = ()=>{

    const [selectedEmployee,setSelectedEmployee] = useState('');
    const [employees,setEmployees] = useState([]);

      useEffect(()=>{
            axios.get("http://localhost:8080/getEmployees").then((response)=>{
                setEmployees(response.data);
            });
      },[])

     const handleSelectedEmployee=(e)=>{ 
        employees.map((emp)=>{
            if (emp.name === e.target.value) {
                setSelectedEmployee(emp)
                console.log("selected employee is"+JSON.stringify(selectedEmployee))
            }
        })
      }
    

    return (<>
    
    <div style={{border:'2px solid black', marginTop:'50px', marginLeft:'50px', marginRight:'50px'}}>
        <center>
    <h1 style={{textDecorationLine:'underline'}}>Leave Status Module</h1>
    <div style={{padding:'20px', textAlign:'left',marginLeft:'490px'}}>
    <label>Employee Name: </label>
    <select value={selectedEmployee&&selectedEmployee.name} onChange={handleSelectedEmployee}>
    <option value="">Select an employee</option>
        {employees.map((employee,index) => (
          <option key= {index} value={employee.name}>{employee.name}</option>
       ))}
    </select>   
    </div>
    <div style={{textAlign:'left',marginLeft:'510px'}}>
    <label>Designation:</label> <label style={{fontWeight:'bold'}}>{selectedEmployee && selectedEmployee.designation}</label> 
    <br/>
    <label>Email: </label><label style={{fontWeight:'bold'}}>{selectedEmployee && selectedEmployee.email}</label> 
    <br/>
    <label>Mobile: </label><label style={{fontWeight:'bold'}}>{selectedEmployee && selectedEmployee.mobile_no}</label> 
    <br/>
    <label>Band: </label><label style={{fontWeight:'bold'}}>{selectedEmployee && selectedEmployee.band_Id}</label>    
    </div>
    </center>
    </div>
    
    </>)

}

export default LeaveStatus;