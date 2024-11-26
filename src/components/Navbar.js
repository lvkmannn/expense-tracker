import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Expense Tracker</h1>
                <div className="links">
                    <Link to="/">Home</Link>
                    <Link to='/AddExpensePage'>Add Expense</Link>
                </div>
        </nav>
    );
}

export default Navbar;
