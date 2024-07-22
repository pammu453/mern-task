import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { IoIosMan } from "react-icons/io";

const NavbarComponent = () => {
    return (
        <div>
            <Navbar fluid rounded>
                <Link to="/" className="flex items-center font-bold text-xl">
                    <IoIosMan />
                    <span>My Employees</span>
                </Link>
            </Navbar>
            <hr />
        </div>
    )
}

export default NavbarComponent
