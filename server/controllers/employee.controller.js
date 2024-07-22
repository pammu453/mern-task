import Employee from "../models/employee.model.js";

// Create a new employee
export const createEmployee = async (req, res) => {
    const { userId, f_Name, f_Email, f_Mobile, f_Image, f_Designation, f_gender, f_Course } = req.body;

    try {
        const oldEmployee = await Employee.findOne({ f_Email })
        if (oldEmployee) {
            return res.json({ success: false, message: 'Employee exists with this email address' });
        }

        const newEmployee = new Employee({
            userId,
            f_Image,
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_gender,
            f_Course,
        });

        await newEmployee.save();

        res.status(201).json({ success: true, message: 'Employee created successfully', employee: newEmployee });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ success: false, message: 'Error creating employee' });
    }
};

// Get employee information by userId
export const getEmployees = async (req, res) => {
    const { userId } = req.body
    try {
        const employees = await Employee.find({ userId })
        res.json({ success: true, employees });
    } catch (error) {
        console.error('Error getting employees:', error);
        res.status(500).json({ success: false, message: 'Error getting employees' });
    }
}

// Delete a employee
export const deleteEmployee = async (req, res) => {
    const { id } = req.params
    try {
        await Employee.findByIdAndDelete(id)
        res.json({ success: true, message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting employee' });
    }
}

// Get employee information by id
export const getEmployee = async (req, res) => {
    const { id } = req.params
    try {
        const employee = await Employee.findById(id)
        res.json({ success: true, employee });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error getting employee' });
    }
}


// Update a employee's information
export const updateEmployee = async (req, res) => {
    const { id } = req.params
    const { f_Name, f_Email, f_Mobile, f_Image, f_Designation, f_gender, f_Course } = req.body
    try {
        const employee = await Employee.findByIdAndUpdate(id, { f_Name, f_Email, f_Mobile, f_Image, f_Designation, f_gender, f_Course }, { new: true })
        res.json({ success: true, message: 'Employee updated successfully', employee });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating employee' });
    }
}