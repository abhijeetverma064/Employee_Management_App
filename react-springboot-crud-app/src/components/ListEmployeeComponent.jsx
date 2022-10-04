import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';


const ListEmployeeComponent = () => {

const [employees,setEmployees]=useState([])

useEffect(()=>{
  getEmployees();
},[])
  
  const getEmployees=()=>{
    EmployeeService.getEmployees().then((response)=>{
      setEmployees(response.data);
      console.log(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }
  const deleteEmployee=(employeeId)=>{
    console.log(employeeId);
    EmployeeService.deleteEmployee(employeeId).then((response)=>{
      getEmployees();
    }).catch(error=>{
      console.log(error);
    });
  }
  return (
       <div className='container'>
        <h2 className='text-center'>Employee List</h2>
        <Link to="/add-employee" className='btn btn-primary mb-2'>Add Employee</Link>
        <div className='row'>
            <table className='table table-striped table-bordered'>
              <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee first name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Actions</th>
                </tr>
              </thead>
              <tbody>
               {
                 employees.map(
                    employee=>
                    <tr key={employee.id}>
                         <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.emailId}</td>
                        <td>
                          <Link to={`/edit-employee/${employee.id}`} className='btn btn-info'>Update</Link>
                          <button className='btn btn-danger' onClick={()=>deleteEmployee(employee.id)} style={{marginLeft:"10px"}}>Delete</button>
                        </td>
                    </tr>
                 )
               } 
              </tbody>
            </table>
        </div>
      </div>
  )
}


export default ListEmployeeComponent
