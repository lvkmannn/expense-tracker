import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddExpensePage = () => {
    /* 
        "date": "2024-10-27",
        "amount": 4.99,
        "category": "Wants",
        "Notes": "I buy a toy.",
        "id": "1"
    */

    const[date, setDate] = useState('');
    const[amount, setAmount] = useState('');
    const[category, setCategory] = useState('Others');
    const[notes, setNotes] = useState('');


    // For loading
    const [isLoading, setIsLoading] = useState(false);

    // To redirect the user to specific page
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        // To prevent the page to refrech when you click the button
        e.preventDefault();

        // Object to store the form input
        const expense = {date, amount, category, notes};

        setIsLoading(true);

        fetch('http://localhost:8000/expenses', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(expense)
        }).then(() => {
            console.log('New Expense Added');
            setIsLoading(false);

            // To go to the HomePage
            navigate('/');
        })
    }

    /* 
        "date": "2024-10-27",
        "amount": 4.99,
        "category": "Wants",
        "Notes": "I buy a toy.",
        "id": "1"
    */

    return(
        <div className="create">
            <h2>Add a New Expense</h2>
            <form onSubmit={handleSubmit}>
                <label>Date: </label>
                <input type="date" required value={date} onChange={(e) => setDate(e.target.value)}></input>
                <label>Amount: </label>
                <input type="number" step="0.01" min="0" placeholder="Enter Amount" onChange={(e) => setAmount(e.target.value)}></input>
                <label>Select Category: </label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Needs">Needs</option>
                    <option value="Wants">Wants</option>
                    <option value="Others">Others</option>
                </select>
                <label>Notes: </label>
                <textarea required value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
                {!isLoading && <button>Add Expense</button>}
                {isLoading && <button disabled>Adding Expense...</button>}
            </form>
        </div>
    )
}

export default AddExpensePage;