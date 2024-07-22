import { Button, Checkbox, Label, TextInput, Radio, FileInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { ImageUpload } from "../imageUpload";
import { useNavigate, useParams } from 'react-router-dom';

const CreateEmployee = () => {
  const [empData, setEmpData] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: [],
    file: null
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setEmpData({ ...empData, [e.target.id]: e.target.value });
  };

  const handleDesignationChange = (e) => {
    setEmpData({ ...empData, f_Designation: e.target.value });
  };

  const handleGenderChange = (e) => {
    setEmpData({ ...empData, f_gender: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setEmpData((prevData) => ({ ...prevData, f_Course: [...prevData.f_Course, id] }));
    } else {
      setEmpData((prevData) => ({
        ...prevData,
        f_Course: prevData.f_Course.filter((course) => course !== id),
      }));
    }
  };

  const handleFileChange = (e) => {
    setEmpData({ ...empData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!empData.f_gender) return toast.error("Please select a gender");
    if (!empData.f_Course.length) return toast.error("Please select at least one course");

    let Image_URL = empData.f_Image;
    if (empData.file) {
      const data = new FormData();
      data.append("file", empData.file);
      data.append("upload_preset", "weit7blw");
      data.append("cloud_name", "dloylpool");

      setLoading(true);

      Image_URL = await ImageUpload(data);
    }

    const res = await axios.put(`http://localhost:5000/api/employee/updateEmployee/${id}`, {
      userId: JSON.parse(localStorage.getItem('user')).fs_no,
      f_Name: empData.f_Name,
      f_Email: empData.f_Email,
      f_Mobile: empData.f_Mobile,
      f_Designation: empData.f_Designation,
      f_gender: empData.f_gender,
      f_Course: empData.f_Course,
      f_Image: Image_URL,
    });

    console.log(res);
    if (res.data.success) {
      toast.success(res.data.message);
      navigate("/employee-list");
      setLoading(false);
    } else {
      console.log(res);
      toast.error(res.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/api/employee/getEmployee/${id}`);
      console.log(res.data.employee);
      const employee = res.data.employee;
      setEmpData({
        f_Name: employee.f_Name,
        f_Email: employee.f_Email,
        f_Mobile: employee.f_Mobile,
        f_Designation: employee.f_Designation,
        f_gender: employee.f_gender,
        f_Course: employee.f_Course,
        file: null,
        f_Image: employee.f_Image || null
      });
    }
    fetchData();
  }, [id]);

  return (
    <div>
      <h1 className="m-4">Edit Employee</h1>
      <form onSubmit={handleSubmit} className="flex max-w-md mx-auto flex-col gap-4 mt-10">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Employee name" />
          </div>
          <TextInput value={empData.f_Name} onChange={handleInputChange} id="f_Name" type="text" placeholder="Employee name" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Employee email" />
          </div>
          <TextInput value={empData.f_Email} onChange={handleInputChange} id="f_Email" type="email" placeholder="jhondoe@gmail.com" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Employee phone" />
          </div>
          <TextInput value={empData.f_Mobile} onChange={handleInputChange} id="f_Mobile" type="text" placeholder="Employee Phone" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="designation" value="Employee designation" />
          </div>
          <select value={empData.f_Designation} onChange={handleDesignationChange} id="designation" className="rounded-md">
            <option value="">Select designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <Radio id="male" value="male" checked={empData.f_gender === "male"} onChange={handleGenderChange} />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio id="female" value="female" checked={empData.f_gender === "female"} onChange={handleGenderChange} />
            <Label htmlFor="female">Female</Label>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <Checkbox id="MCA" onChange={handleCheckboxChange} checked={empData.f_Course.includes("MCA")} />
            <Label htmlFor="MCA">MCA</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="BCA" onChange={handleCheckboxChange} checked={empData.f_Course.includes("BCA")} />
            <Label htmlFor="BCA">BCA</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="BSC" onChange={handleCheckboxChange} checked={empData.f_Course.includes("BSC")} />
            <Label htmlFor="BSC">BSC</Label>
          </div>
        </div>
        <div>
          <div>
            <Label htmlFor="file-upload-helper-text" value="Upload file" />
          </div>
          <FileInput accept=".png,.jpg" id="file-upload-helper-text" onChange={handleFileChange} helperText="Only PNG/JPG" />
        </div>
        <Button type="submit">{loading ? "Updating.." : "Edit"}</Button>
      </form>
    </div>
  );
};

export default CreateEmployee;
