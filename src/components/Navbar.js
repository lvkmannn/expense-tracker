import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <nav className="navbar">
            <h1>Expense Tracker</h1>
            <Hamburger toggled={isOpen} toggle={setOpen} />

            {isOpen && (
                <div className="links">
                    <Link to="/">Home</Link>
                    <Link to='/AddExpensePage'>New Expense</Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
