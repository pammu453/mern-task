import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import NavbarComponent from './components/NavbarComponent.jsx'
import Login from './pages/Login.jsx'
import WelcomePage from './pages/WelcomePage.jsx'
import CreateEmployee from './pages/CreateEmployee.jsx'
import EmployeeList from './pages/EmployeeList.jsx'
import EmployeeNavbar from './components/EmployeeNavbar.jsx'
import EditEmployee from './pages/EditEmployee.jsx'
import PrivateRoute from "./components/PrivateRoute.jsx"

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      <NavbarComponent />
      {user && <EmployeeNavbar setUser={setUser} />}
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route element={<PrivateRoute />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="/employee-list" element={<EmployeeList />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
