import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import EditExpenseForm from "./EditExpenseForm";
import Button from "../components/button/Button.tsx";

const ExpenseDetails = () => {
    const { id } = useParams();
    const { data: expense, error, isLoading } = useFetch('http://localhost:8000/expenses/' + id);
    const navigate = useNavigate();

    const [isEditMode, setIsEditMode] = useState(false); 

    // Toggle edit mode
    const handleUpdate = () => {
        setIsEditMode(true);
    };

    // Handle saving the edited data
    const handleSave = (updatedData) => {
        fetch('http://localhost:8000/expenses/' + expense.id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        }).then(() => {
            setIsEditMode(false);
            navigate('/'); // Redirect to home or reload page to see updated details
        });
    };

    // Handle delete
    const handleDelete = () => {
        fetch('http://localhost:8000/expenses/' + expense.id, {
            method: 'DELETE'
        }).then(() => {
            navigate('/');
        });
    };

    return (
        <div className="expense-details">
            { isLoading && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            { expense && (
                <article>
                    
                    <h2>{ expense.title }</h2>
                    <p>Category: { expense.category }</p>
                    <p>Date: { expense.date }</p>
                    <p>Amount: RM{ expense.amount }</p>
                    <p>Notes: { expense.notes }</p>
                    <div className="btn">
                        <Button
                            text="Edit"
                            onClick={handleUpdate}
                            color="#007BFF"
                        ></Button>
                        <Button
                            text="Delete"
                            onClick={handleDelete}
                            color="#FF4D4D"
                        ></Button>
                    </div>
                </article>
            )}

            { isEditMode && (
                <EditExpenseForm 
                    expense={expense} 
                    onSave={handleSave} 
                    onCancel={() => setIsEditMode(false)}
                />
            )}
        </div>
    );
}

export default ExpenseDetails;
