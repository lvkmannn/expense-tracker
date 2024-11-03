import React, { useState, useEffect } from "react";

const EditExpenseForm = ({ expense, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        date: '',
        amount: '',
        category: '',
        notes: ''
    });

    // Initialize form with existing expense data
    useEffect(() => {
        if (expense) {
            setFormData({
                date: expense.date,
                amount: expense.amount,
                category: expense.category,
                notes: expense.notes
            });
        }
    }, [expense]);

    // Handle form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Save changes and call onSave
    const handleSave = () => {
        onSave(formData);
    };

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Edit Expense</h2>
                <form>
                    <label>Date:</label>
                    <input 
                        type="date" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange} 
                    />
                    
                    <label>Amount:</label>
                    <input 
                        type="number" 
                        name="amount" 
                        value={formData.amount} 
                        onChange={handleChange} 
                    />
                    
                    <label>Category:</label>
                    <select 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange}>
                        <option value="Needs">Needs</option>
                        <option value="Wants">Wants</option>
                        <option value="Others">Others</option>
                    </select>
                    
                    <label>Notes:</label>
                    <textarea 
                        name="notes" 
                        value={formData.notes} 
                        onChange={handleChange} 
                    ></textarea>
                </form>
                <button onClick={handleSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default EditExpenseForm;