import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button.tsx";

const AddExpensePage = () => {
    const [title, setTitle] = useState(''); // New state for title
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Others');
    const [notes, setNotes] = useState('');

    // For loading
    const [isLoading, setIsLoading] = useState(false);

    // To redirect the user to a specific page
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        // Prevent the page from refreshing when the button is clicked
        e.preventDefault();

        // Object to store the form input
        const expense = { title, date, amount, category, notes }; // Include title in the expense object

        setIsLoading(true);

        fetch('http://localhost:8000/expenses', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(expense)
        }).then(() => {
            console.log('New Expense Added');
            setIsLoading(false);

            // Redirect to the HomePage
            navigate('/');
        });
    };

    return (
        <div className="create">
            <h2>Add a New Expense</h2>
            <form onSubmit={handleSubmit}>
                <div class="formfield">
                    <label>Title: </label>
                    <input
                        type="text"
                        placeholder="Enter Title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div class="formfield">
                    <label>Date: </label>
                    <input 
                        type="date" 
                        required 
                        value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                    />
                </div>

                <div className="formfield">
                    <label>Amount: </label>
                    <input 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        placeholder="Enter Amount" 
                        onChange={(e) => setAmount(e.target.value)} 
                    />
                </div>

                <div className="formfield">
                    <label>Category: </label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Needs">Needs</option>
                        <option value="Wants">Wants</option>
                        <option value="Others">Others</option>
                    </select> 
                </div>

                <div className="formfield">
                    <label>Notes: </label>
                    <textarea 
                        required 
                        value={notes} 
                        onChange={(e) => setNotes(e.target.value)} 
                    ></textarea>
                </div>


                {!isLoading && <div class="btn">
                    <Button
                        text="Add Expense"
                    ></Button>
                </div>}
                {isLoading && 
                    <Button
                        text="Add Expense"
                        disabled
                    ></Button>
                }
            </form>
        </div>
    );
};

export default AddExpensePage;
