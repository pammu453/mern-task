import { Button, Checkbox, Label, TextInput, Radio, FileInput } from "flowbite-react";
import { useState } from "react";
import { toast } from 'react-toastify'
import axios from 'axios'
import { ImageUpload } from "../imageUpload";
import { useNavigate } from 'react-router-dom'

const CreateEmployee = () => {
  const [empData, setEmpData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    gender: "",
    courses: [],
    file: null
  });
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  

  const handleInputChange = (e) => {
    setEmpData({ ...empData, [e.target.id]: e.target.value });
  };

  const handleDesignationChange = (e) => {
    setEmpData({ ...empData, designation: e.target.value });
  };

  const handleGenderChange = (e) => {
    setEmpData({ ...empData, gender: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setEmpData((prevData) => ({ ...prevData, courses: [...prevData.courses, id] }));
    } else {
      setEmpData((prevData) => ({
        ...prevData,
        courses: prevData.courses.filter((course) => course !== id),
      }));
    }
  };

  const handleFileChange = (e) => {
    setEmpData({ ...empData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!empData.gender) return toast.error("Please select a gender")
    if (!empData.courses.length) return toast.error("Please select at least one course")
    const data = new FormData()
    data.append("file", empData.file)
    data.append("upload_preset", "weit7blw")
    data.append("cloud_name", "dloylpool")

    setLoading(true)

    const Image_URL = await ImageUpload(data)

    const res = await axios.post("http://localhost:5000/api/employee/createEmployee", {
      userId: JSON.parse(localStorage.getItem('user')).fs_no,
      f_Name: empData.name,
      f_Email: empData.email,
      f_Mobile: empData.phone,
      f_Designation: empData.designation,
      f_gender: empData.gender,
      f_Course: empData.courses,
      f_Image: Image_URL,
    })
    console.log(res)
    if (res.data.success) {
      toast.success(res.data.message)
      navigate("/employee-list")
      setLoading(false)
    } else {
      console.log(res)
      toast.error(res.data.message)
      setLoading(false)
    }
  };

  return (
    <div>
      <h1 className="m-4">Create Employee</h1>
      <form onSubmit={handleSubmit} className="flex max-w-md mx-auto flex-col gap-4 mt-10">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Employee name" />
          </div>
          <TextInput onChange={handleInputChange} id="name" type="text" placeholder="Employee name" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Employee email" />
          </div>
          <TextInput onChange={handleInputChange} id="email" type="email" placeholder="jhondoe@gmail.com" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Employee phone" />
          </div>
          <TextInput onChange={handleInputChange} id="phone" type="text" placeholder="Employee Phone" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="designation" value="Employee designation" />
          </div>
          <select value={empData.designation} onChange={handleDesignationChange} id="designation" className="rounded-md">
            <option value="">Select designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <Radio id="male" value="male" checked={empData.gender === "male"} onChange={handleGenderChange} />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="female" value="female" checked={empData.gender === "female"} onChange={handleGenderChange} />
            <Label htmlFor="female">Female</Label>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <Checkbox id="MCA" onChange={handleCheckboxChange} />
            <Label htmlFor="mca">MCA</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="BCA" onChange={handleCheckboxChange} />
            <Label htmlFor="bca">BCA</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="BSC" onChange={handleCheckboxChange} />
            <Label htmlFor="bsc">BSC</Label>
          </div>
        </div>
        <div>
          <div>
            <Label htmlFor="file-upload-helper-text" value="Upload file" />
          </div>
          <FileInput accept=".png,.jpg" id="file-upload-helper-text" onChange={handleFileChange} helperText="Only PNG/JPG" required />
        </div>
        <Button type="submit">{loading? "Adding..":"Submit"}</Button>
      </form>
    </div>
  );
};

export default CreateEmployee;
