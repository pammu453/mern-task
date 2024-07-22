import axios from "axios";
import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button, Label, Table, TextInput } from "flowbite-react"

const EmployeeList = () => {
    const [employees, setEmployees] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [employeesPerPage] = useState(5)
    const [sortConfig, setSortConfig] = useState({ key: 'f_Name', direction: 'ascending' })

    const navigate = useNavigate()

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await axios.post('http://localhost:5000/api/employee/getEmployees', {
                userId: JSON.parse(localStorage.getItem('user')).fs_no
            })
            setEmployees(response.data.employees)
        }
        fetchEmployees()
    }, [])

    const deleteHandler = async (id) => {
        if (!window.confirm("Are you sure to delete this employee?")) return;
        const response = await axios.delete(`http://localhost:5000/api/employee/deleteEmployee/${id}`)
        if (response.data.success) {
            setEmployees(employees.filter(emp => emp._id !== id))
            toast.success(response.data.message)
        }
    }

    const requestSort = (key) => {
        let direction = 'ascending'
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending'
        }
        setSortConfig({ key, direction })
    }

    const sortedEmployees = [...employees].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
    })

    const filteredEmployees = sortedEmployees.filter(employee => employee.f_Name?.toLowerCase().includes(searchTerm.toLowerCase()))

    const indexOfLastEmployee = currentPage * employeesPerPage
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    if (employees.length === 0) return <p className="flex justify-center items-center gap-3 mt-9 font-bold">
        No employee found. Please create one.
        <Link to="/create-employee">
            <Button>Create Employee</Button>
        </Link>
    </p>

    return (
        <>
            <h1 className="m-4">Employee List</h1>
            <div className='flex m-4 flex-row-reverse items-center gap-4'>
                <Link to="/create-employee">
                    <Button>Create Employee</Button>
                </Link>
                <p>Total Count : {employees && employees.length}</p>
            </div>
            <div className='flex flex-row-reverse items-center gap-4' >
                <TextInput onChange={(e) => setSearchTerm(e.target.value)} id="search" type="text" placeholder="Search" required />
                <div className="mb-2 block">
                    <Label htmlFor="search" value="Search" />
                </div>
            </div>
            <div className="overflow-x-auto">
                <Table striped>
                    <Table.Head>
                        <Table.HeadCell className='text-blue-400 hover:cursor-pointer' onClick={() => requestSort('f_id')}>Uniq ID</Table.HeadCell>
                        <Table.HeadCell>Image</Table.HeadCell>
                        <Table.HeadCell className='text-blue-400 hover:cursor-pointer' onClick={() => requestSort('f_Name')}>Name</Table.HeadCell>
                        <Table.HeadCell className='text-blue-400 hover:cursor-pointer' onClick={() => requestSort('f_Email')}>Email</Table.HeadCell>
                        <Table.HeadCell>Mobile No.</Table.HeadCell>
                        <Table.HeadCell>Designation</Table.HeadCell>
                        <Table.HeadCell>Gender</Table.HeadCell>
                        <Table.HeadCell>Course</Table.HeadCell>
                        <Table.HeadCell className='text-blue-400 hover:cursor-pointer' onClick={() => requestSort('f_Createdate')}>Create Date</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            currentEmployees.map(employee => {
                                return (
                                    <Table.Row key={employee._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell>{employee._id}</Table.Cell>
                                        <Table.Cell>
                                            <img src={employee.f_Image} alt={employee.f_Name} />
                                        </Table.Cell>
                                        <Table.Cell>{employee.f_Name}</Table.Cell>
                                        <Table.Cell>{employee.f_Email}</Table.Cell>
                                        <Table.Cell>{employee.f_Mobile}</Table.Cell>
                                        <Table.Cell>{employee.f_Designation}</Table.Cell>
                                        <Table.Cell>{employee.f_gender}</Table.Cell>
                                        <Table.Cell>{employee.f_Course.join(', ')}</Table.Cell>
                                        <Table.Cell>{employee.f_Createdate.slice(0, 10)}</Table.Cell>
                                        <Table.Cell className='flex gap-1'>
                                            <Button onClick={() => navigate(`/edit-employee/${employee._id}`)}>Edit</Button>
                                            <Button onClick={() => deleteHandler(employee._id)}>Delete</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                        }
                    </Table.Body>
                </Table>
            </div>
            <div className='flex justify-center mt-4'>
                <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </Button>
                {[...Array(Math.ceil(filteredEmployees.length / employeesPerPage)).keys()].map(number => (
                    <Button key={number + 1} onClick={() => paginate(number + 1)} className='mx-1'>
                        {number + 1}
                    </Button>
                ))}
                <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredEmployees.length / employeesPerPage)}>
                    Next
                </Button>
            </div>
        </>
    )
}

export default EmployeeList
